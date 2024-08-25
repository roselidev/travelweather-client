import { writable } from 'svelte/store';
import '@fortawesome/fontawesome-free/css/all.min.css';

export const start_month = writable<string | null>(null);
export const end_month = writable<string | null>(null);
export const country = writable<string | null>(null);
export const city = writable<string | null>(null);
