"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { TypographyH4 } from "./typography/typography-h4";
import { assignments } from "@/app/constants/assignments/data";

export type TaskType = typeof assignments[0]["tasks"][number];

export interface TaskSubmission {
  submitted: boolean;
  userAnswer: string;
}

interface TaskFormProps {
  task: TaskType;
  submission?: TaskSubmission;
  onTaskSubmit: (taskId: number, submission: TaskSubmission) => void;
}

const taskFormSchema = z.object({
  answer: z.string().nonempty("Select an answer."),
});

export function TaskForm({ task, submission, onTaskSubmit }: TaskFormProps) {
  useEffect(() => {
    if (submission?.submitted) {
      const timer = setTimeout(() => {
        fetch("http://localhost:8765/recording/capture")
          .then(() => {
            console.log("Capture successful");
          })
          .catch((e) => console.error("Capture failed after explanation visible:", e));
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [submission?.submitted]);

  const form = useForm({
    resolver: zodResolver(taskFormSchema),
    defaultValues: { answer: submission?.userAnswer || "" },
  });

  const onSubmit = (data: { answer: string }) => {
    onTaskSubmit(task.id, { submitted: true, userAnswer: data.answer });
    console.log(data.answer);
  };

  return (
    <div className="px-4 pb-4">
      <TypographyH4>{`<Question>`}</TypographyH4>
      <p className="mb-2 font-medium">{task.question}</p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4"
        >
          <FormField
            control={form.control}
            name="answer"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col"
                  >
                    {task.choices.map((choice) => (
                      <FormItem
                        key={choice.id}
                        className="flex items-center space-x-2"
                      >
                        <FormControl>
                          <RadioGroupItem
                            value={String(choice.id)}
                            disabled={submission?.submitted}
                          />
                        </FormControl>
                        <FormLabel className="font-medium">
                          {`${String.fromCharCode(64 + choice.id)}) ${
                            choice.text
                          }`}
                        </FormLabel>
                      </FormItem>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {submission?.submitted ? null : (
            <Button type="submit">Submit</Button>
          )}
        </form>
      </Form>
      {submission?.submitted && (
        <div>
          <TypographyH4 className="mt-4">
            {`<Answer>`}
            <span
              className={`ml-4 font-semibold ${
                submission.userAnswer === String(task.answer)
                  ? "text-correct"
                  : "text-incorrect"
              }`}
            >
              {submission.userAnswer === String(task.answer) ? "正解です!" : "不正解です..."}
            </span>
          </TypographyH4>
          <p className="font-medium">
            {String.fromCharCode(64 + task.answer)}) {task.choices[task.answer - 1].text}
          </p>
          <TypographyH4 className="mt-4">{`<Explanation>`}</TypographyH4>
          <p className="font-medium whitespace-pre-line">
            {task.explanation}
          </p>
          <TypographyH4 className="mt-4">{`<Keywords>`}</TypographyH4>
          <ul className="list-disc list-inside font-medium">
            {task.keywords.map((keyword, idx) => (
              <li key={idx}>{keyword}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
