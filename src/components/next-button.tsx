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
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { AppSidebarProps } from "@/types/index";

interface NextButtonProps extends AppSidebarProps {
  disabled: boolean;
}

export default function NextButton({ textId, disabled }: NextButtonProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button disabled={disabled} className={disabled ? 'opacity-50 cursor-not-allowed' : ''}>
          Next
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>次のステップに進みますか？</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription>
          タスクがすべて完了している場合のみ進めます。
        </AlertDialogDescription>
        <AlertDialogFooter>
          <AlertDialogCancel>No</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Link href={`/evaluation/${textId}`}>
              Yes
            </Link>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export function LastButton() {
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
      setStopError(`Stop Error: ${message}`);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size="lg">Next</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>ホームに戻りますか？</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription>
          すべてのタスクが完了している場合のみ進めます。
        </AlertDialogDescription>
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
  );
}
