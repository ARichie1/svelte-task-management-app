import { writable } from 'svelte/store';

export const sidebarWidth = writable(8);
export const pageWidth = writable(100);
export const mobileMenuState = writable(false);
export const filterPanelState = writable(false);
export const mobileTaskActionsMenuState = writable(false);