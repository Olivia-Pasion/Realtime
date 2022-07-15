// Utils
import { protectPage, enforceProfile } from './utils.js';

// Services
import { getUser, signOut, getProfile } from './services/auth-service.js';
import { addPost, getPosts, onPost } from './services/posts-service.js';

// Component constructors
import createUser from './components/User.js';
import createAddPost from './components/AddPost.js';
import createFeed from './components/Feed.js';

// State
let user = null;
let profile = null;
let posts = [];

// Post are loaded in chunks according to this size. When the last post is scrolled onto the screen,
// another chunk is loaded and displayed.
const postsChunkSize = 10;
let postOffset = 0;
let allPostsLoaded = false;

const sound = document.getElementById('chicken-sound');
sound.volume = 0.1;

// Action Handlers
async function handlePageLoad() {
    user = await getUser();
    if (protectPage(user)) return;

    profile = await getProfile();
    if (enforceProfile(profile)) return;

    posts = await getPosts(postsChunkSize) ?? [];
    postOffset += posts.length;

    onPost(realtimeAddPost, realtimeUpdatePost);

    display();
}

async function handleSignOut() {
    signOut();
}

//Realtime function

function realtimeAddPost(post) {
    posts.unshift(post);
    postOffset += 1;
    display();
}

function realtimeUpdatePost(updatedPost) {
    const index = posts.findIndex(x => x.id === updatedPost.id);

    posts.splice(index, 1, updatedPost);

    display();
}

async function handleAddPost(text, image) {
    await addPost(text, image, profile);
    sound.play();
    display();
}

async function handleLastPostVisibility(event) {
    if (event.isIntersecting && !allPostsLoaded) {
        const newPosts = await getPosts(postsChunkSize, postOffset);
        allPostsLoaded = newPosts.length < postsChunkSize;
        postOffset += newPosts.length;

        posts = posts.concat(newPosts);

        display();
    }
}

// Components
const User = createUser(document.querySelector('#user'),
    { href: '/Profile', text: 'Edit Profile' },
    { handleSignOut }
);
const AddPost = createAddPost(document.querySelector('#post-submit-form'), {
    handleAddPost
});
const Feed = createFeed(document.querySelector('#post-feed'), {
    handleLastPostVisibility
});

function display() {
    User({ user, profile });
    AddPost();
    Feed({ posts });
}

handlePageLoad();
