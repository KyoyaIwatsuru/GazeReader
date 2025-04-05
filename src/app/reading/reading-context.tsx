"use client";

import { createContext, useContext, useState } from "react";

interface ReadingContextValue {
  highlightKeywords: string[];
  addKeywords: (words: string[]) => void;
}

const ReadingContext = createContext<ReadingContextValue>({
  highlightKeywords: [],
  addKeywords: () => {},
});

export function ReadingProvider({ children }: { children: React.ReactNode }) {
  const [highlightKeywords, setHighlightKeywords] = useState<string[]>([]);

  const addKeywords = (words: string[]) => {
    setHighlightKeywords((prev) => Array.from(new Set([...prev, ...words])));
  };

  return (
    <ReadingContext.Provider value={{ highlightKeywords, addKeywords }}>
      {children}
    </ReadingContext.Provider>
  );
}

export function useReading() {
  return useContext(ReadingContext);
}
