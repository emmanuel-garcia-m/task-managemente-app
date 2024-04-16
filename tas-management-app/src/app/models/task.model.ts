export interface Task {
    title: string;
    description: string;
    dueDate: Date;
    completed: boolean;
    stateHistory: { state: string, date: Date }[];
    notes: string[] ;
  }