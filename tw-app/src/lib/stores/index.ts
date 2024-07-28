import { writable } from 'svelte/store';

export const selectedDate = writable<string | null>(null);
export const selectedLocation = writable<{ country: string; place: string }>({ country: '', place: '' });
