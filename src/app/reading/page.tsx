'use client'

// import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { PanelRightOpen } from 'lucide-react'
import { TypographyH2 } from "@/components/typography/typography-h2"
import { books } from "../constants/texts/data"
import { Text } from "@/components/text"
// import SidePanel from './components/side-panel'

export default function Page() {
  // const [isPanelOpen, setIsPanelOpen] = useState(false)

  return (
    <main>
      <div className="relative">
        <Button
          variant="outline"
          size="lg"
          className="absolute top-0 right-0 [&_svg]:size-6"
          // onClick={() => setIsPanelOpen(true)}
        >
          <PanelRightOpen />
        </Button>
        <article className="container mx-auto mt-10 p-4">
          <TypographyH2 className="text-center mb-8">{books[0].title}</TypographyH2>
          <Text text={books[0].text} />
        </article>
      </div>
      {/* <SidePanel isOpen={isPanelOpen} onClose={() => setIsPanelOpen(false)} /> */}
    </main>
  )
}
