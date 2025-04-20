"use client";

import { createContext, useContext, useState, useEffect, useRef } from "react";

interface ReadingContextValue {
  highlightKeywords: string[];
  addKeywords: (words: string[]) => void;
  paragraphRefs: React.RefObject<HTMLDivElement | null>[];
  dynamicTaskIds: number[];
  addDynamicTask: (taskId: number) => void;
  allRead: boolean;
}

const ReadingContext = createContext<ReadingContextValue>(null!);

export function ReadingProvider({
  paragraphRefs,
  children,
}: {
  paragraphRefs: React.RefObject<HTMLDivElement | null>[];
  children: React.ReactNode
}) {
  const [highlightKeywords, setHighlightKeywords] = useState<string[]>([]);
  const [dynamicTaskIds, setDynamicTaskIds] = useState<number[]>([]);
  const [allRead, setAllRead] = useState(false);

  const addKeywords = (words: string[]) => {
    setHighlightKeywords((prev) => Array.from(new Set([...prev, ...words])));
  };

  const addDynamicTask = (taskId: number) => {
    setDynamicTaskIds((prev) => (prev.includes(taskId) ? prev : [...prev, taskId]));
  };

  const durationsRef = useRef<Record<number, number>>({});

  useEffect(() => {
    const THRESHOLD = 3000;
    const socket = new WebSocket("ws://localhost:8765/tobii_pro/fixation");
    const durations: Record<number, number> = {};

    socket.onopen = () => console.log("WebSocket opened");
    socket.onerror = (ev) => console.error("WebSocket error", ev);
    socket.onclose = (ev) =>
      console.log(`WebSocket closed (code=${ev.code}, reason=${ev.reason})`);

    socket.onmessage = ({ data }) => {
      const parts = (data as string).split(",");
      if (parts[1] === '0' || parts[1] === 'nan') {
        return;
      }

      const x = parseFloat(parts[1]) - window.screenX;
      const y = parseFloat(parts[2]) - window.screenY - window.outerHeight + window.innerHeight;
      const fd = parseFloat(parts[3]);

      paragraphRefs.forEach((refObj, idx) => {
        const el = refObj.current;
        if (!el) return;
        const { top, left, right, bottom } = el.getBoundingClientRect();

        if (x >= left && x <= right && y >= top && y <= bottom) {
          durations[idx] = (durations[idx] || 0) + fd;
          if (durations[idx] >= 10_000) {
            addDynamicTask(idx + 1);
          }

          const prev = durationsRef.current[idx] || 0;
          durationsRef.current[idx] = prev + fd;

          const totalParagraphs = paragraphRefs.length;
          const readCount = Object.values(durationsRef.current)
            .filter((t) => t >= THRESHOLD).length;
          if (!allRead && readCount === totalParagraphs) {
            setAllRead(true);
          }
        }
      });
    };

    return () => socket.close();
  }, [paragraphRefs, allRead]);

  return (
    <ReadingContext.Provider
      value={{
        highlightKeywords,
        addKeywords,
        paragraphRefs,
        dynamicTaskIds,
        addDynamicTask,
        allRead,
      }}>
      {children}
    </ReadingContext.Provider>
  );
}

export function useReading() {
  return useContext(ReadingContext);
}
