"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { books } from "@/app/constants/texts/data";
import { TypographyH2 } from "@/components/typography/typography-h2";
import { TypographyH3 } from "@/components/typography/typography-h3";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Alert,
  AlertTitle,
  AlertDescription,
} from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export default function Home() {
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const checkStatus = async () => {
    setError(null);
    try {
      const res = await fetch("http://localhost:8765/tobii_pro/status");
      const data = (await res.json()) as { is_connected: boolean };

      setIsConnected(data.is_connected);
    } catch (e: unknown) {
      console.error("Error fetching status:", e);
      setError("Failed to fetch connection status.");
      setIsConnected(false);
    }
  };

  useEffect(() => {
    checkStatus();
  }, []);

  const handleToggle = async (checked: boolean) => {
    setError(null);
    const url = `http://localhost:8765/tobii_pro/${checked ? "connect" : "disconnect"}`;

    try {
      const res = await fetch(url);
      const data = await res.json() as { response: string };

      if (data.response === "succeeded") {
        setIsConnected(checked);
      } else {
        throw new Error(data.response);
      }
    } catch (e: unknown) {
      console.error("Error connecting to gaze server:", e);
      const message = e instanceof Error ? e.message : String(e);
      setError(`Connection Error: ${message}`);
      setIsConnected(false);
    } finally {
      checkStatus();
    }
  };

  const startRecording = async (id: number) => {
    setError(null);
    if (!isConnected) {
      setError("Eye Tracking server is not connected.");
      return;
    }
    try {
      // const res = await fetch("http://localhost:8765/recording/start");
      // const data = await res.json() as { response: string };

      // if (data.response !== "succeeded") {
      //   throw new Error(data.response);
      // }
      router.push(`/reading/${id}`);
    } catch (e: unknown) {
      console.error("Failed to start recording:", e);
      const message = e instanceof Error ? e.message : String(e);
      setError(`Recording Error: ${message}`);
    }
  };

  return (
    <main className="container h-full mx-auto p-8 space-y-8">
      <div className="flex items-center justify-between space-x-8">
        <div className="flex-1">
          {error && (
            <Alert variant="destructive" className="flex items-center space-x-2 bg-secondary-background border-destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </div>

        <div className="flex items-center space-x-4">
          <Label htmlFor="eye-tracker-switch" className="text-base font-medium">
            Eye Tracking Server: {isConnected ? "Connected" : "Disconnected"}
          </Label>
          <Switch
            id="eye-tracker-switch"
            checked={isConnected}
            onCheckedChange={async (checked) => {
              await handleToggle(checked);
            }}
          />
        </div>
      </div>


      <div className="space-y-8">
        <TypographyH2 className="text-center">
          読む文章を選択してください
        </TypographyH2>
        <ul className="space-y-4">
          {books.map((book) => (
            <li key={book.id}>
              <Link
                href={`/reading/${book.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  startRecording(book.id);
                }}
                className="block p-4 border rounded-2xl hover:bg-border transition-colors"
              >
                <TypographyH3>{book.title}</TypographyH3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {book.text.substring(0, 100)}...
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
