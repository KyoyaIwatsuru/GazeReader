"use client";

import { TypographyP } from "./typography/typography-p";
import { useReading } from "@/app/reading/reading-context";

function escapeRegExp(string: string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function getEnglishKeywords(keywords: string[]): string[] {
  return keywords.map((keyword) => {
    const [english] = keyword.split(" - ");
    return english.trim();
  });
}

function highlightText(text: string, keywords: string[]): React.ReactNode[] {
  const englishKeywords = getEnglishKeywords(keywords);
  if (englishKeywords.length === 0) return [text];

  const escaped = englishKeywords.map(escapeRegExp);
  const regex = new RegExp(`(${escaped.join("|")})`, "gi");

  const parts = text.split(regex);

  return parts.map((part, index) => {
    if (
      englishKeywords.some(
        (kw) => kw.toLowerCase() === part.toLowerCase()
      )
    ) {
      return (
        <mark key={index} className="bg-highlight">
          {part}
        </mark>
      );
    }
    return <span key={index}>{part}</span>;
  });
}

export function Text({ text }: { text: string }) {
  const { highlightKeywords, paragraphRefs } = useReading();
  const paragraphs = text.split(/\n\n/);

  return (
    <>
      {paragraphs.map((paragraph, index) => {
        const rendered = highlightText(paragraph.trim(), highlightKeywords);
        return (
          <div
            key={index}
            data-index={index}
            ref={paragraphRefs[index]}
          >
            <TypographyP className="leading-tight mb-8">
              {rendered}
            </TypographyP>
          </div>
        );
      })}
    </>
  );
}
