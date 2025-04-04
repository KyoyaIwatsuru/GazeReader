import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reading",
  description: "Reading page",
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
    </>
  );
}
