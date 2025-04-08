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
      <header className="flex h-16 items-center border-b px-4">
        <HomeButton />
      </header>
      {children}
    </>
  );
}
