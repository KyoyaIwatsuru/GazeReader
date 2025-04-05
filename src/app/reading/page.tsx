import { TypographyH2 } from "@/components/typography/typography-h2"
import { books } from "../constants/texts/data"
import { Text } from "@/components/text"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { ReadingProvider } from "./reading-context";

export default function Page() {
  return (
    <main>
      <ReadingProvider>
        <SidebarProvider>
          <div className="relative w-full">
            <SidebarTrigger className="absolute top-4 right-2" />
            <article className="container mx-auto mt-8 p-8">
              <TypographyH2 className="text-center mb-8">{books[0].title}</TypographyH2>
              <Text text={books[0].text} />
            </article>
          </div>
          <AppSidebar />
        </SidebarProvider>
      </ReadingProvider>
    </main>
  )
}
