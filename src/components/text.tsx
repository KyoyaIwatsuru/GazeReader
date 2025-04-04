import { TypographyH3 } from "./typography/typography-h3";
import { TypographyP } from "./typography/typography-p";

export function Text({ text }: { text: string }) {
  return (
    <>
      {text.split(/\n\n/).map((paragraph, index) => {
        const isHeader = paragraph.includes('\n');
        return (
          <div key={index}>
            {isHeader ? (
              <TypographyH3 className="mt-8">{paragraph.trim()}</TypographyH3>
            ) : (
              <TypographyP>{paragraph.trim()}</TypographyP>
            )}
          </div>
        );
      })}
    </>
  )
}
