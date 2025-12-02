import { NextRequest, NextResponse } from "next/server";
import {
  translateToEnglish,
  translateContentBlocks,
} from "@/lib/services/translation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { BlogContentBlock } from "@/lib/types/blog";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, title, subtitle, content } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Blog post ID is required" },
        { status: 400 }
      );
    }

    // Translate all fields in parallel
    const [titleResult, subtitleResult, contentTranslated] = await Promise.all([
      translateToEnglish(title),
      translateToEnglish(subtitle),
      translateContentBlocks(content || []),
    ]);

    const translatedData = {
      title: titleResult.text,
      subtitle: subtitleResult.text,
      content: contentTranslated as BlogContentBlock[],
    };

    // Save translations to database (optional - for caching)
    try {
      const supabase = await createSupabaseServerClient();
      await supabase
        .from("blog_posts")
        .update({
          title_en: translatedData.title,
          subtitle_en: translatedData.subtitle,
          content_en: translatedData.content,
        })
        .eq("id", id);
    } catch (dbError) {
      // Log but don't fail if DB update fails
      console.error("Failed to cache translation:", dbError);
    }

    return NextResponse.json(translatedData);
  } catch (error) {
    console.error("Translation error:", error);
    return NextResponse.json({ error: "Translation failed" }, { status: 500 });
  }
}
