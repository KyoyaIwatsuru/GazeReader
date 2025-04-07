import Link from "next/link";
import { books } from "@/app/constants/texts/data";
import { TypographyH2 } from "@/components/typography/typography-h2";
import { TypographyH3 } from "@/components/typography/typography-h3";

export default function Home() {
  return (
    <main className="container mx-auto p-8">
      <TypographyH2 className="text-center mb-8">
        読む文章を選択してください
      </TypographyH2>
      <ul className="space-y-4">
        {books.map((book) => (
          <li key={book.id}>
            <Link
              href={`/reading/${book.id}`}
              className="block p-4 border rounded-2xl hover:bg-border transition-colors"
            >
              <TypographyH3>{book.title}</TypographyH3>
              <p className="mt-2 text-sm text-muted-foreground">
                {book.text.substring(0, 100)}...
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
