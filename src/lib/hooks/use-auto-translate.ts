"use client";

import { useState, useEffect, useCallback } from "react";
import { useLanguage } from "@/lib/i18n";
import type { Portfolio, LocalizedPortfolio } from "@/lib/types/portfolio";
import type { BlogPost, LocalizedBlogPost } from "@/lib/types/blog";
import { getLocalizedPortfolio } from "@/lib/types/portfolio";
import { getLocalizedBlogPost } from "@/lib/types/blog";

type TranslationStatus = "idle" | "translating" | "done" | "error";

/**
 * Hook for auto-translating portfolio content
 * Returns localized content based on current language
 * Auto-translates if English version is not available
 */
export function useLocalizedPortfolio(portfolio: Portfolio) {
  const { language } = useLanguage();
  const [localizedData, setLocalizedData] = useState<LocalizedPortfolio>(() =>
    getLocalizedPortfolio(portfolio, language)
  );
  const [status, setStatus] = useState<TranslationStatus>("idle");

  const translateContent = useCallback(async () => {
    if (language !== "en") {
      // For Indonesian, use original content
      setLocalizedData(getLocalizedPortfolio(portfolio, "id"));
      setStatus("done");
      return;
    }

    // Check if English translations exist
    const hasEnglishContent =
      portfolio.titleEn ||
      portfolio.descriptionEn ||
      portfolio.challengeEn ||
      portfolio.solutionEn;

    if (hasEnglishContent) {
      // Use existing translations
      setLocalizedData(getLocalizedPortfolio(portfolio, "en"));
      setStatus("done");
      return;
    }

    // Auto-translate if no English content exists
    setStatus("translating");

    try {
      const response = await fetch("/api/translate/portfolio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: portfolio.id,
          title: portfolio.title,
          description: portfolio.description,
          role: portfolio.role,
          challenge: portfolio.challenge,
          solution: portfolio.solution,
          results: portfolio.results,
          testimonial: portfolio.testimonial,
        }),
      });

      if (!response.ok) {
        throw new Error("Translation API failed");
      }

      const translated = await response.json();

      setLocalizedData({
        ...getLocalizedPortfolio(portfolio, "id"),
        title: translated.title || portfolio.title,
        description: translated.description || portfolio.description,
        role: translated.role || portfolio.role,
        challenge: translated.challenge || portfolio.challenge,
        solution: translated.solution || portfolio.solution,
        results: translated.results || portfolio.results,
        testimonial: translated.testimonial || portfolio.testimonial,
      });

      setStatus("done");
    } catch (error) {
      console.error("Auto-translation failed:", error);
      // Fallback to original content
      setLocalizedData(getLocalizedPortfolio(portfolio, "id"));
      setStatus("error");
    }
  }, [portfolio, language]);

  useEffect(() => {
    translateContent();
  }, [translateContent]);

  return {
    data: localizedData,
    status,
    isTranslating: status === "translating",
  };
}

/**
 * Hook for auto-translating blog post content
 * Returns localized content based on current language
 * Auto-translates if English version is not available
 */
export function useLocalizedBlogPost(post: BlogPost) {
  const { language } = useLanguage();
  const [localizedData, setLocalizedData] = useState<LocalizedBlogPost>(() =>
    getLocalizedBlogPost(post, language)
  );
  const [status, setStatus] = useState<TranslationStatus>("idle");

  const translateContent = useCallback(async () => {
    if (language !== "en") {
      // For Indonesian, use original content
      setLocalizedData(getLocalizedBlogPost(post, "id"));
      setStatus("done");
      return;
    }

    // Check if English translations exist
    const hasEnglishContent =
      post.titleEn || post.subtitleEn || post.contentEn;

    if (hasEnglishContent) {
      // Use existing translations
      setLocalizedData(getLocalizedBlogPost(post, "en"));
      setStatus("done");
      return;
    }

    // Auto-translate if no English content exists
    setStatus("translating");

    try {
      const response = await fetch("/api/translate/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: post.id,
          title: post.title,
          subtitle: post.subtitle,
          content: post.content,
        }),
      });

      if (!response.ok) {
        throw new Error("Translation API failed");
      }

      const translated = await response.json();

      setLocalizedData({
        ...getLocalizedBlogPost(post, "id"),
        title: translated.title || post.title,
        subtitle: translated.subtitle || post.subtitle,
        content: translated.content || post.content,
      });

      setStatus("done");
    } catch (error) {
      console.error("Auto-translation failed:", error);
      // Fallback to original content
      setLocalizedData(getLocalizedBlogPost(post, "id"));
      setStatus("error");
    }
  }, [post, language]);

  useEffect(() => {
    translateContent();
  }, [translateContent]);

  return {
    data: localizedData,
    status,
    isTranslating: status === "translating",
  };
}

