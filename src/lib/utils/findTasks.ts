import type { Task } from '../stores/types';

export type TaskFilters = {
    searchQuery: string;
    filterCompletion: boolean;
    filterHigh: boolean;
    filterMedium: boolean;
    filterLow: boolean;
    filterVeryLow: boolean;
    sortOption: string;
};

export function findTasks(tasks: Task[], filters: TaskFilters): Task[] {
    const { 
        searchQuery, 
        filterCompletion, filterHigh, 
        filterMedium, filterLow, 
        filterVeryLow, sortOption } = filters;

    // Search
    let result = tasks.filter(task =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.id.includes(searchQuery)
    );

    // Filter
    result = result.filter(task => {
    const completionCheck = !filterCompletion || task.isComplete;
    const priorityCheck =
        (!filterHigh || task.priority === 'High') &&
        (!filterMedium || task.priority === 'Medium') &&
        (!filterLow || task.priority === 'Low') &&
        (!filterVeryLow || task.priority === 'VeryLow');
    return completionCheck && priorityCheck;
    });

    // Sort
    switch (sortOption) {
    case 'Time': {
        result = result.sort((a, b) => {
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        });
        break;
    }
    case 'Name A-Z': {
        result = result.sort((a, b) => a.title.localeCompare(b.title));
        break;
    }
    case 'Name Z-A': {
        result = result.sort((a, b) => b.title.localeCompare(a.title));
        break;
    }
    case 'Priority High-VeryLow': {
        const priorityOrder = ['High', 'Medium', 'Low', 'VeryLow'];
        result = result.sort((a, b) => priorityOrder.indexOf(a.priority) - priorityOrder.indexOf(b.priority));
        break;
    }
    case 'Priority VeryLow-High': {
        const revPriority = ['VeryLow', 'Low', 'Medium', 'High'];
        result = result.sort((a, b) => revPriority.indexOf(a.priority) - revPriority.indexOf(b.priority));
        break;
    }
    }

  return result;
}
