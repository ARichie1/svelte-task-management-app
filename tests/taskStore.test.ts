import { describe, it, expect, beforeEach, vi } from 'vitest';
import { get } from 'svelte/store';

// --- MOCK SVELTEKIT & LIB MODULES ---
vi.mock('$app/environment', () => ({ browser: false }));

vi.mock('$lib/utils/storage', () => ({
  loadFromLocalStorage: vi.fn(() => []),
  saveToLocalStorage: vi.fn(() => {}),
}));

vi.mock('$lib/utils/debounce', () => ({
  debounce: (fn: any) => fn,  // no-op debounce
}));

vi.mock('$lib/utils/sampleData', () => ({
  sampleTasks: [],
}));

// --- IMPORT THE STORE AFTER MOCKING ---
import { tasks, taskStore } from '../src/lib/stores/taskStores';
import type { Task } from '../src/lib/stores/types';
import { v4 as uuid } from 'uuid';


describe('taskStore', () => {
  const mockTask1: Task = {
    id: uuid(),
    title: 'Finish Project Proposal',
    description: 'Complete the proposal draft for the new client.',
    isComplete: false,
    dueDate: new Date().toISOString(),
    priority: 'High',
    category: 'Work',
    isUrgent: true,
    isImportant: true,
    quadrant: "urgent_important",
    quadrant_title: "Urgent And Important"
  };

  const mockTask2: Task = {
    id: uuid(),
    title: 'Read Investment Article',
    description: 'Read the latest article on cryptocurrency trends.',
    isComplete: true,
    dueDate: new Date().toISOString(),
    priority: 'Low',
    category: 'Finance',
    isUrgent: true,
    isImportant: false,
    quadrant: "notUrgent_important",
    quadrant_title: "Not Urgent And Important"
  };

  beforeEach(() => {
    taskStore.resetTasks(); // reset store before each test
  });

  it('add a new task', () => {
    taskStore.addTask(mockTask1);
    const value = get(tasks);
    expect(value).toHaveLength(1);
    expect(value[0].title).toBe('Finish Project Proposal');
  });

  it('remove a task by id', () => {
    taskStore.addTask(mockTask1);
    taskStore.addTask(mockTask2);
    taskStore.deleteTask(mockTask1.id);
    const value = get(tasks);
    expect(value).toHaveLength(1);
    expect(value[0].id).toBe(mockTask2.id);
  });

  it('toggle task completion status', () => {
    taskStore.addTask(mockTask1);
    taskStore.toggleCompletionOptimistic(mockTask1.id);
    const value = get(tasks);
    expect(value[0].isComplete).toBe(true);
  });

  it('edit and update a task', () => {
    taskStore.addTask(mockTask1);
    const updated = { ...mockTask1, title: 'Updated Task Title' };
    taskStore.editTask(mockTask1.id, updated);
    const value = get(tasks);
    expect(value[0].title).toBe('Updated Task Title');
  });

  it('reset all tasks', () => {
    taskStore.addTask(mockTask1);
    taskStore.addTask(mockTask2);
    taskStore.resetTasks();
    const value = get(tasks);
    expect(value).toHaveLength(0);
  });
});
