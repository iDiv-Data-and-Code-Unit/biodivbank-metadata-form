import { writable } from 'svelte/store';

export const params = writable({ id: '', auth: '' });
