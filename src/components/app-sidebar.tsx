"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { assignments } from "@/app/constants/assignments/data";
import { useReading } from "@/app/reading/reading-context";
import { TaskForm, TaskSubmission } from "./task-form";

interface AppSidebarProps {
  textId: number;
}

export function AppSidebar({ textId }: AppSidebarProps) {
  const [submissions, setSubmissions] = useState<{
    [taskId: number]: TaskSubmission;
  }>({});
  const { addKeywords } = useReading();

  const assignmentData = assignments.find((a) => a.text_id === textId);

  if (!assignmentData) {
    return null;
  }

  const handleTaskSubmit = (taskId: number, submission: TaskSubmission) => {
    setSubmissions((prev) => ({
      ...prev,
      [taskId]: submission,
    }));
    console.log("Task submitted:", submissions);

    const targetTask = assignmentData?.tasks.find((t) => t.id === taskId);
    if (targetTask) {
      addKeywords(targetTask.keywords); 
      console.log("Added keywords:", targetTask.keywords);
    }
  };

  return (
    <Sidebar side="right" variant="floating">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Assignment</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {assignmentData.tasks.map((task) => (
                <Collapsible key={task.id} className="group/collapsible">
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton className="font-medium">
                        Task{task.id}
                        <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <TaskForm 
                        task={task}
                        submission={submissions[task.id]}
                        onTaskSubmit={handleTaskSubmit}
                      />
                    </CollapsibleContent>
                  </SidebarMenuItem>
                  <SidebarSeparator />
                </Collapsible>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
