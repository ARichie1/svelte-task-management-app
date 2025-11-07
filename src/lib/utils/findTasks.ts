import type { Task } from '../stores/types';
import { writable } from 'svelte/store';

export type TaskFilters = {
    searchQuery: string;
    filterCompletion: boolean;
    filterHigh: boolean;
    filterMedium: boolean;
    filterLow: boolean;
    filterVeryLow: boolean;
    sortOption: string;
    // Dynamic Category Filters
    selectedCategories: string[]; 
};

// Make Each User Input Its Own Store
export const searchQuery = writable('');
export const filterCompletion = writable(false);
export const filterHigh = writable(false);
export const filterMedium = writable(false);
export const filterLow = writable(false);
export const filterVeryLow = writable(false);
export const sortOption = writable('Time');
export const selectedCategories = writable<string[]>([]);

export function findTasks(tasks: Task[], filters: TaskFilters): Task[] {
    const { 
        searchQuery, 
        filterCompletion, filterHigh, 
        filterMedium, filterLow, 
        filterVeryLow, sortOption, selectedCategories  } = filters;

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

        const categoryCheck =
            selectedCategories.length === 0 ||
            selectedCategories.includes(task.category);

        return completionCheck && priorityCheck && categoryCheck
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
