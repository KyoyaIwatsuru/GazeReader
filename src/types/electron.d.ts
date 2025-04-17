export {};

declare global {
  interface Window {
    electronAPI: {
      /**
       * @param filename
       * @param rows
       * @return
       */
      saveCsv(
        filename: string,
        rows: string[][]
      ): Promise<{ success: true; filePath: string } | { success: false; error: string }>;
    };
  }
}
