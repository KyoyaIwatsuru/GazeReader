"use client";

import { TypographyH3 } from "./typography/typography-h3";
import { TypographyP } from "./typography/typography-p";
import { useReading } from "@/app/reading/reading-context";

// 正規表現用に特殊文字をエスケープする関数
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

  // 複数キーワードを OR で結合（大文字小文字区別せず）
  const escaped = englishKeywords.map(escapeRegExp);
  const regex = new RegExp(`(${escaped.join("|")})`, "gi");

  // 正規表現で分割（キャプチャグループを含むので、マッチ部分も配列に含まれる）
  const parts = text.split(regex);

  return parts.map((part, index) => {
    // キーワードと一致するかどうか（大文字小文字を区別せず）
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
  const { highlightKeywords } = useReading();
  const paragraphs = text.split(/\n\n/);

  return (
    <>
      {paragraphs.map((paragraph, index) => {
        const rendered = highlightText(paragraph.trim(), highlightKeywords);
        const isHeader = paragraph.includes("\n");
        return (
          <div key={index}>
            {isHeader ? (
              <TypographyH3 className="mt-8">{rendered}</TypographyH3>
            ) : (
              <TypographyP>{rendered}</TypographyP>
            )}
          </div>
        );
      })}
    </>
  );
}
