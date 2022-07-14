// Utils
import { protectPage, enforceProfile } from './utils.js';

// Services
import { getUser, signOut, getProfile } from './services/auth-service.js';
import { addPost, getAllPosts, onPost } from './services/posts-service.js';

// Component constructors
import createUser from './components/User.js';
import createAddPost from './components/AddPost.js';
import createFeed from './components/Feed.js';

// State
let user = null;
let profile = null;
let posts = [];

// Action Handlers
async function handlePageLoad() {
    user = await getUser();
    if (protectPage(user)) return;

    profile = await getProfile();
    if (enforceProfile(profile)) return;

    posts = await getAllPosts() ?? [];

    onPost(realtimeAddPost, realtimeUpdatePost);

    display();
}

async function handleSignOut() {
    signOut();
}

//Realtime function

function realtimeAddPost(post) {
    posts.unshift(post);
    display();
}

function realtimeUpdatePost(updatedPost) {
    const index = posts.findIndex(x => x.id === updatedPost.id);

    posts.splice(index, 1, updatedPost);

    display();
}

async function handleAddPost(text, image) {
    // const newPost = 
    await addPost(text, image, profile);
    
    display();
}

// Components
const User = createUser(document.querySelector('#user'),
    { href: '/Profile', text: 'Edit Profile' },
    { handleSignOut }
);
const AddPost = createAddPost(document.querySelector('#post-submit-form'), {
    handleAddPost
});
const Feed = createFeed(document.querySelector('#post-feed'));

function display() {
    User({ user, profile });
    AddPost();
    Feed({ posts });
}

handlePageLoad();
