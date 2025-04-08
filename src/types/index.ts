export interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export interface AppSidebarProps {
  textId: number;
}
