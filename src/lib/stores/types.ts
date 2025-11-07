export interface Task {
  id: string;
  title: string;
  description: string;
  isComplete: boolean;
  isUrgent: boolean;
  isImportant: boolean;
  dueDate: string; // full ISO string e.g. "2025-11-03T16:30:00.000Z"
  priority: 'High' | 'Medium' | 'Low' | 'Very Low' | string;
  category: 'Work' | 'Personal' | 'Finance' | string;
  quadrant: "urgent_important" | "notUrgent_important" | "urgent_notImportant" | "notUrgent_notImportant" | string;
  quadrant_title: "Urgent And Important" | "Urgent And Not Important" | "Not Urgent And Important" | "Not Urgent And Not Important" | string;
}

export interface Quadrants {
  urgent_important: Task[];
  urgent_notImportant: Task[];
  notUrgent_important: Task[];
  notUrgent_notImportant: Task[];
}

export const validQuadrants = [
  {title: "Urgent And Important", key: "urgent_important", priority: "High", id: 0},
  {title: "Urgent And Not Important", key: "urgent_notImportant", priority: "Medium", id: 1},
  {title: "Not Urgent And Important", key: "notUrgent_important", priority: "Low", id: 2},
  {title: "Not Urgent And Not Important", key: "notUrgent_notImportant", priority: "Very Low", id: 3}
]

export const checkPriority = (priority:string) => {
    let priorityConfig = {
      priority: "",
      isUrgent: false,
      isImportant: false,
      quadrant: "",
      quadrant_title: ""
    }
    if (priority === "High") {
      priorityConfig = {
        priority,
        isUrgent: true,
        isImportant: true,
        quadrant: "urgent_important",
        quadrant_title: "Urgent And Important",
      }
    }
    else if (priority === "Medium") {
      priorityConfig = { 
        priority,
        isUrgent: true,
        isImportant: false,
        quadrant: "urgent_notImportant",
        quadrant_title: "Urgent And Not Important"
      }
    }
    else if (priority === "Low") {
      priorityConfig = {
        priority,
        isUrgent: false,
        isImportant: true,
        quadrant: "notUrgent_important",
        quadrant_title: "Not Urgent And Important"
      }
    }
    else if (priority === "Very Low") {
      priorityConfig = {
        priority,
        isUrgent: false,
        isImportant: false,
        quadrant: "notUrgent_notImportant",
        quadrant_title: "Not Urgent And Not Important"
      }
    }

    return priorityConfig
}