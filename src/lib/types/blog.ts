export type BlogCategory = "Insight" | "Case Study" | "Update" | "Guide";

export type BlogContentKind = "text" | "image" | "video" | "file";

function randomId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return Math.random().toString(36).slice(2);
}

export type BlogContentBlock =
  | {
      id: string;
      kind: "text";
      text: string;
    }
  | {
      id: string;
      kind: "image";
      url: string;
      caption?: string;
      alt?: string;
    }
  | {
      id: string;
      kind: "video";
      url: string;
      caption?: string;
    }
  | {
      id: string;
      kind: "file";
      url: string;
      label: string;
      description?: string;
    };

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  date: string;
  category: BlogCategory;
  thumbnail: string;
  readingTime: string;
  content: BlogContentBlock[];
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
  // English translations
  titleEn: string | null;
  subtitleEn: string | null;
  contentEn: BlogContentBlock[] | null;
};

export type BlogRow = {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  date: string;
  category: BlogCategory;
  thumbnail: string;
  reading_time: string;
  content: unknown;
  is_published: boolean;
  created_at: string;
  updated_at: string;
  // English translations
  title_en: string | null;
  subtitle_en: string | null;
  content_en: unknown | null;
};

export type BlogInput = {
  slug: string;
  title: string;
  subtitle: string;
  date: string;
  category: BlogCategory;
  thumbnail: string;
  readingTime: string;
  content: BlogContentBlock[];
  isPublished: boolean;
  // Optional English translations (for manual override)
  titleEn?: string | null;
  subtitleEn?: string | null;
  contentEn?: BlogContentBlock[] | null;
};

// Helper type for localized blog post
export type LocalizedBlogPost = {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  date: string;
  category: BlogCategory;
  thumbnail: string;
  readingTime: string;
  content: BlogContentBlock[];
};

function parseContentItem(item: unknown): BlogContentBlock | null {
  if (!item) return null;

  // Jika item adalah string, coba parse sebagai JSON terlebih dahulu
  if (typeof item === "string") {
    try {
      const parsed = JSON.parse(item);
      return parseContentItem(parsed);
    } catch {
      // Bukan JSON, kembalikan sebagai text block
      return { id: randomId(), kind: "text" as const, text: item };
    }
  }

  if (typeof item !== "object") return null;

  const baseId =
    typeof (item as { id?: string }).id === "string"
      ? (item as { id: string }).id
      : randomId();

  switch ((item as { kind?: string }).kind) {
    case "text":
      return {
        id: baseId,
        kind: "text" as const,
        text:
          typeof (item as { text?: string }).text === "string"
            ? (item as { text: string }).text
            : "",
      };
    case "image":
      return {
        id: baseId,
        kind: "image" as const,
        url:
          typeof (item as { url?: string }).url === "string"
            ? (item as { url: string }).url
            : "",
        caption:
          typeof (item as { caption?: string }).caption === "string"
            ? (item as { caption: string }).caption
            : undefined,
        alt:
          typeof (item as { alt?: string }).alt === "string"
            ? (item as { alt: string }).alt
            : undefined,
      };
    case "video":
      return {
        id: baseId,
        kind: "video" as const,
        url:
          typeof (item as { url?: string }).url === "string"
            ? (item as { url: string }).url
            : "",
        caption:
          typeof (item as { caption?: string }).caption === "string"
            ? (item as { caption: string }).caption
            : undefined,
      };
    case "file":
      return {
        id: baseId,
        kind: "file" as const,
        url:
          typeof (item as { url?: string }).url === "string"
            ? (item as { url: string }).url
            : "",
        label:
          typeof (item as { label?: string }).label === "string"
            ? (item as { label: string }).label
            : "Download",
        description:
          typeof (item as { description?: string }).description === "string"
            ? (item as { description: string }).description
            : undefined,
      };
    default:
      return null;
  }
}

function parseContent(content: unknown): BlogContentBlock[] {
  // Jika content adalah string, coba parse sebagai JSON
  if (typeof content === "string") {
    try {
      const parsed = JSON.parse(content);
      return parseContent(parsed);
    } catch {
      // Bukan JSON array, kembalikan sebagai single text block
      return [{ id: randomId(), kind: "text" as const, text: content }];
    }
  }

  if (!Array.isArray(content)) return [];

  return content
    .map((item) => parseContentItem(item))
    .filter(Boolean) as BlogContentBlock[];
}

export function transformBlogPost(row: BlogRow): BlogPost {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    subtitle: row.subtitle,
    date: row.date,
    category: row.category,
    thumbnail: row.thumbnail,
    readingTime: row.reading_time,
    content: parseContent(row.content),
    isPublished: row.is_published,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    // Translations
    titleEn: row.title_en,
    subtitleEn: row.subtitle_en,
    contentEn: row.content_en ? parseContent(row.content_en) : null,
  };
}

export function transformBlogInputToDb(input: BlogInput) {
  return {
    slug: input.slug,
    title: input.title,
    subtitle: input.subtitle,
    date: input.date,
    category: input.category,
    thumbnail: input.thumbnail,
    reading_time: input.readingTime,
    content: input.content,
    is_published: input.isPublished,
    // Translations
    title_en: input.titleEn ?? null,
    subtitle_en: input.subtitleEn ?? null,
    content_en: input.contentEn ?? null,
  };
}

// Get localized blog post content based on language
export function getLocalizedBlogPost(
  post: BlogPost,
  language: "id" | "en"
): LocalizedBlogPost {
  if (language === "en") {
    return {
      id: post.id,
      slug: post.slug,
      // Use English version if available, fallback to Indonesian
      title: post.titleEn || post.title,
      subtitle: post.subtitleEn || post.subtitle,
      date: post.date,
      category: post.category,
      thumbnail: post.thumbnail,
      readingTime: post.readingTime,
      content: post.contentEn || post.content,
    };
  }

  // Return Indonesian (original) content
  return {
    id: post.id,
    slug: post.slug,
    title: post.title,
    subtitle: post.subtitle,
    date: post.date,
    category: post.category,
    thumbnail: post.thumbnail,
    readingTime: post.readingTime,
    content: post.content,
  };
}
