import { TypographyH2 } from "@/components/typography/typography-h2"
import { books } from "../../constants/texts/data"
import { Text } from "@/components/text"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { ReadingProvider } from "../reading-context";
import { HomeButton } from "@/components/home-button"

interface PageProps {
  params: {
    id: string;
  };
}

export default function Page({ params }: PageProps) {
  const bookId = parseInt(params.id, 10);
  const book = books.find((b) => b.id === bookId);

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
        <SidebarProvider defaultOpen={false}>
          <div className="flex flex-col w-full">
            <header className="flex h-16 items-center border-b px-4">
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
