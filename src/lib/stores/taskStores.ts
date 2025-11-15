import { browser } from '$app/environment';
import { writable, derived } from 'svelte/store';
import type { Task, Quadrants } from './types';
import { checkPriority } from './types';
import { loadFromLocalStorage, saveToLocalStorage } from '$lib/utils/storage';
import { debounce } from '$lib/utils/debounce';
import { sampleTasks } from '$lib/utils/sampleData';

const STORAGE_KEY = 'task_manager_tasks';
const STORAGE_HOURS_KEY = 'task_manager_urgent_hours';

// LocalStorage Initialization
// Load Persisted Tasks Or Fallback To Sample Data

// For Test Mode With Data On Reload
const devInitTasks = loadFromLocalStorage<Task[]>(STORAGE_KEY, sampleTasks)
if (devInitTasks.length === 0) {
	saveToLocalStorage(STORAGE_KEY, sampleTasks);
}

// For Test Mode Without Data On Reload
const initialTasks = browser
	? loadFromLocalStorage<Task[]>(STORAGE_KEY, sampleTasks)
	: sampleTasks;
const initialDueHours = browser
	? loadFromLocalStorage<number>(STORAGE_HOURS_KEY, 48)
	: 48;

let urgentHours = loadFromLocalStorage<number>(STORAGE_HOURS_KEY, 48);

// Reactive Tasks Store Array
export const tasks = writable<Task[]>(initialTasks);
export const urgencyThreshold = writable<number>(initialDueHours);

// Derived Quadrants Logic
export const quadrants = derived(tasks, ($tasks) => {
	const q: Quadrants = {
		urgent_important: [],
		urgent_notImportant: [],
		notUrgent_important: [],
		notUrgent_notImportant: []
	};

	for (const t of $tasks) {
		if (t.isUrgent && t.isImportant) q.urgent_important.push(t);
		else if (t.isUrgent && !t.isImportant) q.urgent_notImportant.push(t);
		else if (!t.isUrgent && t.isImportant) q.notUrgent_important.push(t);
		else q.notUrgent_notImportant.push(t);
	}

	return q;
});

// Derived Completion Percentage 
export const completionPercentage = derived(tasks, ($tasks) => {
	if ($tasks.length === 0) return 0;
	const completed = $tasks.filter((t) => t.isComplete).length;
	return Math.round((completed / $tasks.length) * 100);
});

// Date Utility
const isUrgent = (dueDate: string | Date, hours = urgentHours) => {
	if (!dueDate) return false;
	const diff = new Date(dueDate).getTime() - Date.now();
	return diff / (1000 * 60 * 60) <= hours;
}

// Debounced Persistence
const debouncedSaveTasks = debounce((value: Task[]) => {
	saveToLocalStorage(STORAGE_KEY, value);
}, 500);

const debouncedSaveUrgentHours = debounce((value: number) => {
	saveToLocalStorage(STORAGE_HOURS_KEY, value);
}, 500);

// Subscribe For Persistence
tasks.subscribe(($tasks) => {
	debouncedSaveTasks($tasks);
});
urgencyThreshold.subscribe(($urgencyThreshold) => {
	debouncedSaveUrgentHours($urgencyThreshold);
});

export const taskStore = {
	subscribe: tasks.subscribe,

  // Universal update method (alias for editTask)
	update: (id: string, updates:Task) => {
		taskStore.editTask(id, updates);
	},

	// Add new task
	addTask: (task: Task) => {
		tasks.update((current) => [...current, task]);
    	console.log("adding new task");
	},

//   // Edit specific fields of a task
	// editTask: (id: string, updatedFields: Partial<Task>) => {
	// 	tasks.update((current) =>
	// 		current.map((t) => (t.id === id ? { ...t, ...updatedFields } : t))
	// 	);
    // 	console.log("edited a task");
	// },

	// editTask: (id: string, updatedTask: Task) => {
	// 	console.log("editing a task");
		
	// 	tasks.update((current) => current.filter((t) => t.id !== id));
    // 	console.log("deleted a task");

	// 	tasks.update((current) => [...current, updatedTask]);
    // 	console.log("adding new task");

    // 	console.log("edited a task");
	// },

	editTask: (id: string, newTask: Task) => {
		tasks.update((current) =>
			current.map((t) => (t.id === id ? { ...newTask } : t))
		);
		console.log("edited a task");
	},


	// Toggle completion
	toggleCompletionOptimistic: (id: string) => {
		tasks.update((current) =>
			current.map((t) =>
				t.id === id ? { ...t, isComplete: !t.isComplete } : t
			)
		);
    	console.log("toggling completion");
	},

	// Delete A Task
	deleteTask: (id: string) => {
		tasks.update((current) => current.filter((t) => t.id !== id));
    	console.log("deleted a task");
	},

	// Replace All Tasks
	setTasks: (newTasks: Task[]) => {
		tasks.set(newTasks);
    	console.log("added multiple tasks");
	},

	// Change A Task’s Category
	setCategory: (id: string, category: string) => {
		tasks.update((current) =>
			current.map((t) => (t.id === id ? { ...t, category } : t))
		);
    	console.log("just gave a task a category");
	},

  // Change The Number Of Hours That Define What “Urgent” Is
	setUrgentHours: (hours: number) => {
		urgentHours = hours;
		debouncedSaveUrgentHours(hours);

		tasks.update((current) =>
			current.map((t) => ({
				...t,
				isUrgent: t.dueDate ? isUrgent(t.dueDate, hours) : t.isUrgent
			}))
		);
	},

  // Change A Task's Quadrant
	setTaskQuadrant: (id: string, newPriority:string) => {
		const newQuadrantConfig = checkPriority(newPriority)
		console.log(id);
		console.log(newQuadrantConfig);

		tasks.update((current) =>
			current.map((t) => (t.id === id ? { ...t, ...newQuadrantConfig } : t)
			)
		);
	},

	// Clear all tasks and restore defaults
	resetTasks: () => {
		tasks.set([]);
		saveToLocalStorage(STORAGE_KEY, []);
	}
};


