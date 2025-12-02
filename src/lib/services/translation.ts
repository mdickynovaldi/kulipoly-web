/**
 * Translation Service
 * Provides auto-translation using Google Translate API (free tier via web scraping)
 * Falls back gracefully if translation fails
 */

type TranslationResult = {
  text: string;
  isTranslated: boolean;
};

/**
 * Translate text from Indonesian to English using Google Translate
 * Uses the free web API endpoint
 */
export async function translateToEnglish(
  text: string
): Promise<TranslationResult> {
  if (!text || text.trim() === "") {
    return { text: "", isTranslated: false };
  }

  try {
    // Use Google Translate free API endpoint
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=id&tl=en&dt=t&q=${encodeURIComponent(text)}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
    });

    if (!response.ok) {
      throw new Error(`Translation API error: ${response.status}`);
    }

    const data = await response.json();

    // Extract translated text from response
    // Response format: [[["translated text","original text",null,null,10]],null,"id",...]
    if (data && data[0]) {
      const translatedText = data[0]
        .map((item: [string]) => item[0])
        .join("");

      return {
        text: translatedText,
        isTranslated: true,
      };
    }

    return { text, isTranslated: false };
  } catch (error) {
    console.error("Translation failed:", error);
    return { text, isTranslated: false };
  }
}

/**
 * Translate an array of strings
 */
export async function translateArrayToEnglish(
  texts: string[]
): Promise<string[]> {
  if (!texts || texts.length === 0) {
    return [];
  }

  const results = await Promise.all(
    texts.map((text) => translateToEnglish(text))
  );

  return results.map((r) => r.text);
}

/**
 * Translate blog content blocks
 * Only translates text blocks, preserves other block types
 */
export async function translateContentBlocks(
  content: ContentBlock[]
): Promise<ContentBlock[]> {
  if (!content || content.length === 0) {
    return [];
  }

  const translatedBlocks = await Promise.all(
    content.map(async (block) => {
      if (block.kind === "text") {
        const result = await translateToEnglish(block.text);
        return {
          ...block,
          text: result.text,
        };
      }

      // For image/video/file blocks, translate captions if present
      if ("caption" in block && block.caption) {
        const captionResult = await translateToEnglish(block.caption);
        return {
          ...block,
          caption: captionResult.text,
        };
      }

      // For file blocks, translate label and description
      if (block.kind === "file") {
        const [labelResult, descResult] = await Promise.all([
          translateToEnglish(block.label),
          block.description
            ? translateToEnglish(block.description)
            : Promise.resolve({ text: "", isTranslated: false }),
        ]);

        return {
          ...block,
          label: labelResult.text,
          description: descResult.text || undefined,
        };
      }

      return block;
    })
  );

  return translatedBlocks;
}

/**
 * Translate testimonial object
 */
export async function translateTestimonial(
  testimonial: Testimonial | null
): Promise<Testimonial | null> {
  if (!testimonial) return null;

  const quoteResult = await translateToEnglish(testimonial.quote);
  const positionResult = await translateToEnglish(testimonial.position);

  return {
    quote: quoteResult.text,
    author: testimonial.author, // Keep author name unchanged
    position: positionResult.text,
  };
}

// Type definitions for content blocks
type ContentBlock =
  | { id: string; kind: "text"; text: string }
  | { id: string; kind: "image"; url: string; caption?: string; alt?: string }
  | { id: string; kind: "video"; url: string; caption?: string }
  | {
      id: string;
      kind: "file";
      url: string;
      label: string;
      description?: string;
    };

type Testimonial = {
  quote: string;
  author: string;
  position: string;
};

/**
 * Batch translate multiple fields at once
 * More efficient than calling translateToEnglish multiple times
 */
export async function batchTranslate(
  texts: Record<string, string>
): Promise<Record<string, string>> {
  const entries = Object.entries(texts);
  const results = await Promise.all(
    entries.map(async ([key, value]) => {
      const result = await translateToEnglish(value);
      return [key, result.text] as const;
    })
  );

  return Object.fromEntries(results);
}

