"use client";

import { useState } from 'react';
import type { Task } from '@/lib/types';
import useLocalStorage from '@/hooks/useLocalStorage';
import { Button } from '@/components/ui/button';
import { PlusCircle, CalendarDays, ListFilter } from 'lucide-react';
import { TaskForm } from '@/components/tasks/TaskForm';
import { TaskList } from '@/components/tasks/TaskList';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function TasksPage() {
  const [tasks, setTasks] = useLocalStorage<Task[]>('tasks', []);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  const handleOpenForm = (task?: Task) => {
    setEditingTask(task || null);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setEditingTask(null);
    setIsFormOpen(false);
  };

  const handleSaveTask = (task: Task) => {
    if (editingTask) {
      setTasks(tasks.map((t) => (t.id === task.id ? task : t)));
    } else {
      setTasks([...tasks, task]);
    }
    handleCloseForm();
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks(tasks.filter((t) => t.id !== taskId));
  };

  const handleToggleComplete = (taskId: string) => {
    setTasks(
      tasks.map((t) =>
        t.id === taskId ? { ...t, completed: !t.completed } : t
      )
    );
  };
  
  const tasksForSelectedDate = tasks.filter(task => 
    task.deadline && selectedDate &&
    new Date(task.deadline).toDateString() === selectedDate.toDateString()
  );

return (
    <div className="flex flex-1 flex-col gap-6 min-h-0 w-full min-w-0">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 w-full min-w-0">
        <h2 className="text-2xl sm:text-3xl font-headline font-semibold text-primary">Manage Your Tasks</h2>
        <Button onClick={() => handleOpenForm()} className="bg-primary hover:bg-primary/80 text-primary-foreground w-full sm:w-auto shrink-0">
          <PlusCircle className="mr-2 h-5 w-5" /> <span className="sm:sr-only">Add New Task</span>
        </Button>
      </div>

      <TaskForm
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        onSave={handleSaveTask}
        task={editingTask}
      />
      
      <Tabs defaultValue="list" className="w-full min-w-0 flex-1 flex flex-col min-h-0">
        <TabsList className="grid w-full grid-cols-2 h-auto p-1 gap-1">
          <TabsTrigger value="list" className="gap-2"><ListFilter className="h-4 w-4" /> <span className="hidden sm:inline">Task List</span></TabsTrigger>
          <TabsTrigger value="calendar" className="gap-2"><CalendarDays className="h-4 w-4" /> <span className="hidden sm:inline">Calendar View</span></TabsTrigger>
        </TabsList>
        <TabsContent value="list" className="flex-1 min-h-0 w-full min-w-0 overflow-y-auto mt-4 data-[state=inactive]:hidden">
          <Card className="h-full w-full min-w-0 shadow-lg">
            <CardHeader className="px-4 sm:px-6">
              <CardTitle className="text-lg sm:text-xl font-headline">All Tasks</CardTitle>
            </CardHeader>
            <CardContent className="px-4 sm:px-6">
              <TaskList
                tasks={tasks}
                onEdit={handleOpenForm}
                onDelete={handleDeleteTask}
                onToggleComplete={handleToggleComplete}
              />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="calendar" className="flex-1 min-h-0 w-full min-w-0 mt-4 data-[state=inactive]:hidden">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6 h-full w-full min-w-0">
            <Card className="lg:col-span-1 w-full min-w-0 shadow-lg">
              <CardHeader className="px-4 sm:px-6">
                <CardTitle className="text-lg sm:text-xl font-headline">Select Date</CardTitle>
              </CardHeader>
              <CardContent className="flex justify-center px-4 sm:px-6">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border shadow-sm"
                  disabled={(date) => date < new Date(new Date().setDate(new Date().getDate()-1))}
                />
              </CardContent>
            </Card>
            <Card className="lg:col-span-2 w-full min-w-0 shadow-lg">
              <CardHeader className="px-4 sm:px-6">
                <CardTitle className="text-lg sm:text-xl font-headline">
                  {selectedDate ? `Tasks for ${selectedDate.toLocaleDateString()}` : 'Select a Date'}
                </CardTitle>
              </CardHeader>
              <CardContent className="px-4 sm:px-6">
                {selectedDate && tasksForSelectedDate.length > 0 ? (
                   <TaskList
                    tasks={tasksForSelectedDate}
                    onEdit={handleOpenForm}
                    onDelete={handleDeleteTask}
                    onToggleComplete={handleToggleComplete}
                  />
                ) : (
                  <p className="text-muted-foreground text-center py-4">No tasks for this date. Add some!</p>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
