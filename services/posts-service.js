import { client, checkResponse } from './client.js';

const POST_TABLE = 'posts';

const users = new Map();

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

export async function addPost(text, image, profile) {
    let post = {
        text: text,
        user_id: profile.id
    };

    // First insert a post w/o image.
    let response = await client
        .from(POST_TABLE)
        .insert(post)
        .single();
    post = checkResponse(response);

    if (image && image.size) {
        // If we have an image, upload it and use the new post id as the filename to ensure uniqueness.
        const imageUrl = await uploadPhoto(image, post);

        // Update the post with the imageUrl
        response = await client
            .from(POST_TABLE)
            .update({
                image: imageUrl
            })
            .eq('id', post.id)
            .single();

        // Return the updated post w/ image column filled in.
        return checkResponse(response);
    }

    // This post doesn't have an image, so return the original post.
    return post;
}

// Uploads a photo used in a post.
async function uploadPhoto(photo, post) {
    // Put each user's photos in a separate folder named after their UUID. Filenames are taken from
    // the post id to ensure uniqueness
    const ext = photo.type.split('/')[1];
    let imageName = `/${post.user_id}/${post.id}.${ext}`;

    // Upload photo
    let response = await client.storage
        .from('images')
        .upload(imageName, photo, {
            cacheControl: '3600',
            upsert: true
        });

    if (!checkResponse(response)) return null;

    // Get public url of uploaded photo
    response = client.storage
        .from('images')
        .getPublicUrl(imageName);

    if (!checkResponse(response)) return null;

    return response.publicURL;
}

export function onPost(insertCallback, updateCallback) {
    client
        .from(POST_TABLE)
        .on('INSERT', async (payload) => {
            const post = payload.new;
            const profile = await getRealtimeProfile(post.user_id);
            post.profile = profile;
            insertCallback(post);
        })
        .on('UPDATE', async (payload) => {
            const post = payload.new;
            const profile = await getRealtimeProfile(post.user_id);
            post.profile = profile;
            updateCallback(post);

        })
        .subscribe();
}

async function getRealtimeProfile(id) {
    if (users.has(id)) return users.get(id);

    const { data, error } = await client
        .from('profiles')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        console.log(error);
        return null;
    }

    users.set(id, data);

    return data;
}
