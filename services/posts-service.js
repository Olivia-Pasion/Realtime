import { client, checkResponse } from './client.js';

const POST_TABLE = 'posts';

export async function getAllPosts() {
    const response = await client
        .from(POST_TABLE)
        .select(`
            *,
            profile: profiles(*)
        `)
        .order('created_at', { ascending: false })
        .limit(100);


    return checkResponse(response);
}

export async function addPost(post) {
    const response = await client
        .from(POST_TABLE)
        .insert(post)
        .single();

    return checkResponse(response);
}
