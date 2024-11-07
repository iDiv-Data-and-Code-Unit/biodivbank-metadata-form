import { writable } from 'svelte/store';

export let host = 'window.location.origin';
export let username = '';
export let password = '';
export let auth = '';

const hostStore = writable(''); //writable(window.location.origin);
const usernameStore = writable('');
const passwordStore = writable('');
const authStore = writable('');

hostStore.subscribe((value) => {
	host = value;
});

usernameStore.subscribe((value) => {
	username = value;
});

passwordStore.subscribe((value) => {
	password = value;
});

authStore.subscribe((value) => {
	auth = value;
});


export function setApiConfig(_host: string, _user: string, _pw: string,	_auth: string) {
	console.log('overwrite api settings');

	hostStore.update((h) => (h = _host));
	if(_user!=''&& _user!=null)
	{
		usernameStore.update((u) => (u = _user));
	}
	if(_pw!=''&& _pw!=null)
	{
		passwordStore.update((p) => (p = _pw));
	}
	
	authStore.update((a) => (a = _auth));
	console.log('overwrite host',_host);
}

