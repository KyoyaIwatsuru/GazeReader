"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  useMemo,
} from "react";

interface ReadingContextValue {
  highlightKeywords: string[];
  addKeywords: (words: string[]) => void;
  paragraphRefs: React.RefObject<HTMLDivElement | null>[];
  paragraphs: string[];
  dynamicTaskIds: number[];
  addDynamicTask: (taskId: number) => void;
  allRead: boolean;
}

const ReadingContext = createContext<ReadingContextValue>(null!);

export function ReadingProvider({
  paragraphRefs,
  paragraphs,
  children,
}: {
  paragraphRefs: React.RefObject<HTMLDivElement | null>[];
  paragraphs: string[];
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
  const prevXRef = useRef<Record<number, number>>({})
  const regressionsRef = useRef<Record<number, number>>({})

  const wordCounts = useMemo(
    () => paragraphs.map(p => p.trim().split(/\s+/).length),
    [paragraphs]
  );

  const MS_PER_WORD = 240
  const TOLERANCE = 2
  const REGRESSION_RATE_THRESHOLD = 0.2

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8765/tobii_pro/fixation");

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
          durationsRef.current[idx] = (durationsRef.current[idx] || 0) + fd

          const prevX = prevXRef.current[idx] ?? x
          if (x < prevX) {
            regressionsRef.current[idx] = (regressionsRef.current[idx] || 0) + 1
          }
          prevXRef.current[idx] = x

          const threshold = wordCounts[idx] * MS_PER_WORD * TOLERANCE
          const durationExceeded = durationsRef.current[idx] >= threshold
          const regressionRate = (regressionsRef.current[idx] || 0) / wordCounts[idx]
          if (durationExceeded || regressionRate >= REGRESSION_RATE_THRESHOLD) {
            addDynamicTask(idx + 1)
          }

          const allReadNow =
            wordCounts.every((_, i) => durationsRef.current[i] >= MS_PER_WORD * TOLERANCE);
          if (allReadNow && !allRead) {
            setAllRead(true);
          }
        }
      });
    };

    return () => socket.close();
  }, [paragraphRefs, wordCounts, allRead]);

  return (
    <ReadingContext.Provider
      value={{
        highlightKeywords,
        addKeywords,
        paragraphRefs,
        paragraphs,
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
