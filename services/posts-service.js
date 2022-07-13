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

export async function addPost(post, profile) {
    // If there's an image, hold off on inserting it into database
    const image = post.image;
    if (image && image.size) delete post.image;

    // Associate user w/ post
    post.user_id = profile.id;

    let response = await client
        .from(POST_TABLE)
        .insert(post)
        .single();

    const newPost = checkResponse(response);
    
    // If we have an image, upload it and use the post id as a unique
    // identifier for naming.
    if (image && image.size) {
        const imageUrl = await uploadPhoto(image, profile, newPost.id);

        response = await client
            .from(POST_TABLE)
            .update({
                image: imageUrl
            })
            .match({
                id: newPost.id
            })
            .single();

        return checkResponse(response);
    }

    return newPost;
}

async function uploadPhoto(photo, profile, postId) {
    const ext = photo.type.split('/')[1];
    let imageName = `/${profile.id}/${postId}.${ext}`;

    let response = await client.storage
        .from('images')
        .upload(imageName, photo, {
            cacheControl: '3600',
            upsert: true
        });

    if (!checkResponse(response)) return null;

    response = client.storage
        .from('images')
        .getPublicUrl(imageName);

    if (!checkResponse(response)) return null;

    return response.publicURL;
}
