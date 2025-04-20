import { TypographyH2 } from "@/components/typography/typography-h2";
import { HomeButton } from "@/components/home-button";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Evaluation",
  description: "Evaluation page",
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="sticky top-0 z-10 flex h-16 items-center border-b px-4 bg-secondary-background">
        <HomeButton />
        <TypographyH2 className="absolute left-1/2 transform -translate-x-1/2">
          穴埋め問題
        </TypographyH2>
      </header>
      {children}
    </>
  );
}
