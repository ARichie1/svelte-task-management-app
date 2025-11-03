export const isBrowser = () => {
	return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
}

export const loadFromLocalStorage = <T>(key: string, fallback: T): T => {
	if (!isBrowser()) return fallback;
	try {
		const value = localStorage.getItem(key);
		return value ? JSON.parse(value) : fallback;
	} catch (err) {
		console.error('Failed to load from localStorage:', err);
		return fallback;
	}
}

export const saveToLocalStorage = <T>(key: string, value: T): void => {
	if (!isBrowser()) return;
	try {
		localStorage.setItem(key, JSON.stringify(value));
	} catch (err) {
		console.error('Failed to save to localStorage:', err);
	}
}
