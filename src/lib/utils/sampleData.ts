// src/lib/utils/sampleData.ts
import type { Task } from '$lib/stores/types';
import { v4 as uuid } from 'uuid';

export const sampleTasks: Task[] = [
    {
        id: uuid(),
        title: 'Finish Project Proposal',
        description: 'Complete the proposal draft for the new client.',
        isComplete: false,
        dueDate: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(), // 2 hours from now
        priority: 'High',
        category: 'Work',
        isUrgent: true,
        isImportant: true,
        quadrant: "urgent_important",
        quadrant_title: "Urgent And Important"
    },
    {
        id: uuid(),
        title: 'Buy Groceries',
        description: 'Milk, Eggs, Bread, and Vegetables.',
        isComplete: false,
        dueDate: new Date(Date.now() + 72 * 60 * 60 * 1000).toISOString(), // 3 days from now
        priority: 'Medium',
        category: 'Personal',
        isUrgent: false,
        isImportant: false,
        quadrant: "urgent_notImportant",
        quadrant_title: "Urgent And Not Important"
    },
    {
        id: uuid(),
        title: 'Read Investment Article',
        description: 'Read the latest article on cryptocurrency trends.',
        isComplete: true,
        dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 1 day from now
        priority: 'Low',
        category: 'Finance',
        isUrgent: true,
        isImportant: false,
        quadrant: "notUrgent_important",
        quadrant_title: "Not Urgent And Important"
    },
    {
        id: uuid(),
        title: 'Weekly Team Meeting',
        description: 'Discuss progress and blockers with the team.',
        isComplete: false,
        dueDate: new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString(), // 6 hours from now
        priority: 'High',
        category: 'Work',
        isUrgent: true,
        isImportant: true,
        quadrant: "urgent_important",
        quadrant_title: "Urgent And Important"
    },
    {
        id: uuid(),
        title: 'Exercise',
        description: 'Go for a 30-minute run.',
        isComplete: false,
        dueDate: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString(), // 2 days from now
        priority: 'Medium',
        category: 'Personal',
        isUrgent: false,
        isImportant: true,
        quadrant: "urgent_notImportant",
        quadrant_title: "Urgent And Not Important"
    },
    {
        id: uuid(),
        title: 'Pay Electricity Bill',
        description: 'Pay the monthly electricity bill online.',
        isComplete: false,
        dueDate: new Date(Date.now() + 12 * 60 * 60 * 1000).toISOString(), // 12 hours from now
        priority: 'High',
        category: 'Finance',
        isUrgent: true,
        isImportant: true,
        quadrant: "urgent_important",
        quadrant_title: "Urgent And Important"
    },
    {
        id: uuid(),
        title: 'Call Grandma',
        description: 'Check in and have a chat.',
        isComplete: true,
        dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days from now
        priority: 'Low',
        category: 'Personal',
        isUrgent: false,
        isImportant: true,
        quadrant: "notUrgent_important",
        quadrant_title: "Not Urgent And Important"
    },
    {
        id: uuid(),
        title: 'Call Grandma',
        description: 'Check in and have a chat.',
        isComplete: true,
        dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days from now
        priority: 'Very Low',
        category: 'Personal',
        isUrgent: false,
        isImportant: true,
        quadrant: "notUrgent_notImportant",
        quadrant_title: "Not Urgent And Not Important"
    },
    {
        id: uuid(),
        title: 'Call Grandma',
        description: 'Check in and have a chat.',
        isComplete: true,
        dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days from now
        priority: 'Low',
        category: 'Personal',
        isUrgent: false,
        isImportant: true,
        quadrant: "notUrgent_important",
        quadrant_title: "Not Urgent And Important"
    },
    {
        id: uuid(),
        title: 'Call Grandma',
        description: 'Check in and have a chat.',
        isComplete: true,
        dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days from now
        priority: 'Very Low',
        category: 'Personal',
        isUrgent: false,
        isImportant: true,
        quadrant: "notUrgent_notImportant",
        quadrant_title: "Not Urgent And Not Important"
    }
];
