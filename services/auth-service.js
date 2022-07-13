import { client, checkResponse } from './client.js';

export function getUser() {
    return client.auth.user();
}

export async function signUp(email, password) {
    return await client.auth.signUp({ email, password });
}

export async function signIn(email, password) {
    return await client.auth.signIn({ email, password });
}

export async function signOut() {
    return await client.auth.signOut();
}

export async function getProfile() {
    const user = getUser();

    const response = await client
        .from('profiles')
        .select()
        .eq('id', user.id);

    const rows = checkResponse(response);
    return rows[0] || null;
}
