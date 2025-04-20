"use client"

import { use, useEffect, createRef, useMemo } from "react"
import { TypographyH2 } from "@/components/typography/typography-h2"
import { books } from "../../constants/texts/data"
import { Text } from "@/components/text"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { ReadingProvider } from "../reading-context";
import { HomeButton } from "@/components/home-button"
import { PageProps } from "@/types/index"
import { assignments } from "@/app/constants/assignments/data";

export default function Page({ params }: PageProps) {
  const bookId = parseInt(use(params).id, 10);
  const book = books.find((b) => b.id === bookId);

  useEffect(() => {
    const assignmentData = assignments.find((a) => a.text_id === bookId);
    if (assignmentData) {
      assignmentData.tasks.forEach((t) => {
        console.log(`Removing localStorage for task ${t.id}`);
        localStorage.removeItem(`timestamp_question_${bookId}_${t.id}`);
        localStorage.removeItem(`timestamp_explanation_${bookId}_${t.id}`);
      });
    }
  }, [bookId]);

  const paragraphs = useMemo(
    () => (book ? book.text.split(/\n\n/) : []),
    [book]
  );

  const paragraphRefs = useMemo(
    () => paragraphs.map(() => createRef<HTMLDivElement>()),
    [paragraphs]
  );

  useEffect(() => {
    localStorage.setItem(`timestamp_reading_${bookId}`, Date.now().toString());
    fetch("http://localhost:8765/recording/capture")
      .then((res) => res.json())
      .catch((e) => console.error("Capture failed on mount:", e));
  }, [bookId]);

  if (!book) {
    return (
      <main className="flex items-center justify-center h-full">
        <TypographyH2 className="text-center">Text not found</TypographyH2>
      </main>
    );
  }

  return (
    <main className="h-full">
      <ReadingProvider paragraphRefs={paragraphRefs}>
        <SidebarProvider defaultOpen={true}>
          <div className="flex flex-col">
            <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b px-4 bg-secondary-background">
              <HomeButton />
              <TypographyH2>{book.title}</TypographyH2>
              <SidebarTrigger />
            </header>
            <article className="container mx-auto p-8">
              <Text text={book.text} />
            </article>
          </div>
          <AppSidebar textId={book.id} />
        </SidebarProvider>
      </ReadingProvider>
    </main>
  )
}
