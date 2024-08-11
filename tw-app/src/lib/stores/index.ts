import { writable } from 'svelte/store';

export const start_date = writable<string | null>(null);
export const end_date = writable<string | null>(null);
export const country = writable<string | null>(null);
export const city = writable<string | null>(null);
