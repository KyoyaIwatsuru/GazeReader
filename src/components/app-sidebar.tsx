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

export function AppSidebar() {
  const [submissions, setSubmissions] = useState<{
    [taskId: number]: TaskSubmission;
  }>({});
  const { addKeywords } = useReading();

  const handleTaskSubmit = (taskId: number, submission: TaskSubmission) => {
    setSubmissions((prev) => ({
      ...prev,
      [taskId]: submission,
    }));
    console.log("Task submitted:", submissions);

    const targetTask = assignments[0].tasks.find((t) => t.id === taskId);
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
              {assignments[0].tasks.map((task) => (
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
