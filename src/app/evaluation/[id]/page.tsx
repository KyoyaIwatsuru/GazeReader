"use client";

import { use, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { assignments } from "@/app/constants/assignments/data";
import { evaluations } from "@/app/constants/evaluations/data";
import { TypographyH2 } from "@/components/typography/typography-h2";
import { TypographyP } from "@/components/typography/typography-p";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { LastButton } from "@/components/next-button";
import { PageProps } from "@/types/index";

const evaluationSchema = z.object({
  blank1: z.string().nonempty("選択してください。"),
  blank2: z.string().nonempty("選択してください。"),
  blank3: z.string().nonempty("選択してください。"),
  blank4: z.string().nonempty("選択してください。"),
  blank5: z.string().nonempty("選択してください。"),
  blank6: z.string().nonempty("選択してください。"),
});

type EvaluationFormValues = z.infer<typeof evaluationSchema>;

export default function EvaluationPage({ params }: PageProps) {
  const textId = parseInt(use(params).id, 10);
  const assignmentData = assignments.find((a) => a.text_id === textId)!;
  const evaluationData = evaluations.find((e) => e.text_id === textId)!;
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<EvaluationFormValues>({
    resolver: zodResolver(evaluationSchema),
    defaultValues: {
      blank1: "",
      blank2: "",
      blank3: "",
      blank4: "",
      blank5: "",
      blank6: "",
    },
  });

  if (!evaluationData) {
    return (
      <main className="container mx-auto p-8">
        <TypographyH2 className="text-center">Text not found</TypographyH2>
      </main>
    );
  }

  const onSubmit = async (data: EvaluationFormValues) => {
    localStorage.setItem(`evaluation_text${textId}`, JSON.stringify(data));

    const taskHeaders = assignmentData.tasks.flatMap(t => [`task_${t.id}`, `task_answer_${t.id}`]);
    const evalHeaders = evaluationData.answers.map((_, i) => [`evaluation_${i+1}`, `evaluation_answer_${i+1}`]).flat();
    const headers = ["text_id", ...taskHeaders, ...evalHeaders];

    const stored = localStorage.getItem(`submissions_text${textId}`);
    const taskSubmissions: { [key: number]: { userAnswer: string } } = stored ? JSON.parse(stored) : {};
    const taskValues = assignmentData.tasks.map(t => {
      const ans = taskSubmissions[t.id]?.userAnswer || "";
      const ok = ans === String(t.answer) ? "TRUE" : "FALSE";
      return [ans, ok];
    }).flat();

    const evalValues = Array.from({ length: 6 }, (_, i) => {
      const ans = data[`blank${i+1}` as keyof EvaluationFormValues] as string;
      const ok = ans === String(evaluationData.answers[i]) ? "TRUE" : "FALSE";
      return [ans, ok];
    }).flat();

    const rows = [headers, [String(textId), ...taskValues, ...evalValues]];

    const result = await window.electronAPI.saveCsv("answers.csv", rows);
    if (!result.success) {
      console.error("CSV save failed:", result.error);
    }
    setSubmitted(true);
  };

  return (
    <main className="container mx-auto p-8">
      <TypographyH2 className="text-center">穴埋め問題</TypographyH2>
      <div className="p-8">
        <TypographyP className="whitespace-pre-line">
          {evaluationData.question}
        </TypographyP>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {["blank1", "blank2", "blank3", "blank4", "blank5", "blank6"].map(
            (fieldName, index) => (
              <FormField
                key={fieldName}
                control={form.control}
                name={fieldName as keyof EvaluationFormValues}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{`空欄 (${index + 1})`}</FormLabel>
                    <FormControl>
                      <select {...field} className="w-full p-2 border rounded">
                        <option value="">-- 選択してください --</option>
                        {evaluationData.choices.map((choice) => (
                          <option key={choice.id} value={String(choice.id)}>
                            {`${String.fromCharCode(64 + choice.id)}) ${
                              choice.text
                            }`}
                          </option>
                        ))}
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )
          )}
          {!submitted && (
            <div className="flex justify-center">
              <Button type="submit" size="lg">送信</Button>
            </div>
          )}
        </form>
      </Form>

      {submitted && (
        <div className="flex flex-col items-center">
          <div className="w-full my-4 p-4 border rounded bg-completed">
            <TypographyP className="text-center">送信が完了しました。</TypographyP>
          </div>
          <LastButton />
        </div>
      )}
    </main>
  );
}
