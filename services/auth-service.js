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

export async function updateProfile(profile, avatar) {
    if (avatar && avatar.size > 0) {
        const publicUrl = await uploadAvatar(profile, avatar);
        profile.avatar_url = publicUrl;
    }

    const response = await client
        .from('profiles')
        .upsert(profile)
        .eq('id', profile.id)
        .single();

    return checkResponse(response);
}

async function uploadAvatar(profile, imageFile) {
    if (imageFile.size === 0) return null;

    // Super hacky way to get a *probably* unique filename.
    // Can't call it the same thing without running into cache issues.
    const name = Math.floor(Math.random() * 1000000);

    // Construct filename. Profile id is unique to bucket.
    const ext = imageFile.type.split('/')[1];
    let filename = `/${profile.id}/${name}.${ext}`;

    // Upload image to bucket
    let response = await client.storage
        .from('avatars')
        .upload(filename, imageFile, {
            cacheControl: '3600',
            upsert: true
        });

    if (!checkResponse(response)) return null;

    response = client.storage
        .from('avatars')
        .getPublicUrl(filename);

    if (!checkResponse(response)) return null;

    return response.publicURL;
}
