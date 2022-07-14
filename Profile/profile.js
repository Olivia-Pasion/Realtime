import { getUser, signOut, getProfile, updateProfile } from '../services/auth-service.js';
import { protectPage } from '../utils.js';
import createUser from '../components/User.js';

//Component

import createProfile from './components/Profile.js';


//State
let user = null;
let profile = null;


//handlers
async function handlePageLoad() {
    user = await getUser();
    if (protectPage(user)) return;

    profile = await getProfile();

    display();
}


async function handleUpdateProfile() {
    // TODO: implement t
}

//DOM
const Profile = createProfile(document.querySelector('#new-profile'));



//Display
function display() {
    Profile({ user, profile });
}

handlePageLoad();
