"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function HomeButton() {
  const router = useRouter();
  const [stopError, setStopError] = useState<string | null>(null);

  const handleStop = async (e: React.MouseEvent) => {
    e.preventDefault();
    setStopError(null);

    try {
      await fetch("http://localhost:8765/recording/capture");
    } catch (err) {
      console.error("Capture failed before stop:", err);
    }

    try {
      const res = await fetch("http://localhost:8765/recording/stop");
      const data = (await res.json()) as { response: string };
      if (data.response !== "succeeded") {
        throw new Error(data.response);
      }
      router.push("/");
    } catch (e: unknown) {
      console.error("Failed to stop recording:", e);
      const message = e instanceof Error ? e.message : String(e);
      setStopError(`Recording stop failed: ${message}`);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button>Home</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>ホーム画面に戻りますか？</AlertDialogTitle>
          <AlertDialogDescription>
            ホーム画面に戻ると、現在の進捗が保存されません。<br />
            それでも続行しますか？
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>No</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Link
              href="/"
              onClick={handleStop}
            >
              Yes
            </Link>
          </AlertDialogAction>
        </AlertDialogFooter>
        {stopError && (
          <div className="mt-2 text-sm text-destructive">
            {stopError}
          </div>
        )}
      </AlertDialogContent>
    </AlertDialog>
  )
}
