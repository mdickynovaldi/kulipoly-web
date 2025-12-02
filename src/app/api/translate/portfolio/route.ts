import { NextRequest, NextResponse } from "next/server";
import {
  translateToEnglish,
  translateArrayToEnglish,
  translateTestimonial,
} from "@/lib/services/translation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      id,
      title,
      description,
      role,
      challenge,
      solution,
      results,
      testimonial,
    } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Portfolio ID is required" },
        { status: 400 }
      );
    }

    // Translate all fields in parallel
    const [
      titleResult,
      descriptionResult,
      roleResult,
      challengeResult,
      solutionResult,
      resultsTranslated,
      testimonialTranslated,
    ] = await Promise.all([
      translateToEnglish(title),
      translateToEnglish(description),
      translateToEnglish(role),
      translateToEnglish(challenge),
      translateToEnglish(solution),
      translateArrayToEnglish(results || []),
      translateTestimonial(testimonial),
    ]);

    const translatedData = {
      title: titleResult.text,
      description: descriptionResult.text,
      role: roleResult.text,
      challenge: challengeResult.text,
      solution: solutionResult.text,
      results: resultsTranslated,
      testimonial: testimonialTranslated,
    };

    // Save translations to database (optional - for caching)
    try {
      const supabase = await createSupabaseServerClient();
      await supabase
        .from("portfolios")
        .update({
          title_en: translatedData.title,
          description_en: translatedData.description,
          role_en: translatedData.role,
          challenge_en: translatedData.challenge,
          solution_en: translatedData.solution,
          results_en: translatedData.results,
          testimonial_en: translatedData.testimonial,
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
