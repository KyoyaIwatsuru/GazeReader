"use client"

import { use, useEffect } from "react"
import { TypographyH2 } from "@/components/typography/typography-h2"
import { books } from "../../constants/texts/data"
import { Text } from "@/components/text"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { ReadingProvider } from "../reading-context";
import { HomeButton } from "@/components/home-button"
import { PageProps } from "@/types/index"

export default function Page({ params }: PageProps) {
  const bookId = parseInt(use(params).id, 10);
  const book = books.find((b) => b.id === bookId);

  useEffect(() => {
    localStorage.setItem(`timestamp_reading_${bookId}`, Date.now().toString());
    fetch("http://localhost:8765/recording/capture")
      .then((res) => res.json())
      .catch((e) => console.error("Capture failed on mount:", e));
  }, [bookId]);

  if (!book) {
    return (
      <main className="container mx-auto p-8">
        <TypographyH2 className="text-center">Text not found</TypographyH2>
      </main>
    );
  }

  return (
    <main>
      <ReadingProvider>
        <SidebarProvider defaultOpen={true}>
          <div className="flex flex-col w-full">
            <header className="sticky top-0 z-10 flex h-16 items-center border-b px-4 bg-secondary-background">
              <HomeButton />
              <SidebarTrigger className="ml-auto" />
            </header>
            <article className="container mx-auto p-8">
              <TypographyH2 className="text-center mb-8">{book.title}</TypographyH2>
              <Text text={book.text} />
            </article>
          </div>
          <AppSidebar textId={book.id} />
        </SidebarProvider>
      </ReadingProvider>
    </main>
  )
}
