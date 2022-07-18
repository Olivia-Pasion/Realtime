import { getUser, signOut, getProfile, updateProfile } from '../services/auth-service.js';
import { protectPage } from '../utils.js';
import createUser from '../components/User.js';

//Component
import createProfile from '../components/Profile.js';

//State
let user = null;
let profile = null;

//handlers
async function handlePageLoad() {
    user = await getUser();
    if (protectPage(user)) return;

    profile = await getProfile();

    if (!profile) {
        const defaultUsername = user.email.split('@')[0];

        profile = await updateProfile({
            id: user.id,
            username: defaultUsername
        });
    }

    display();
}

async function handleSignOut() {
    signOut();
}

async function handleUpdateProfile(username, avatarFile) {
    const updatedProfile = {
        id: profile.id,
        username
    };

    profile = await updateProfile(updatedProfile, avatarFile);

    display();
}

//DOM
const User = createUser(document.querySelector('#user'),
    { href: '/', text: 'Go To Feed' },
    { handleSignOut }
);

const Profile = createProfile(document.querySelector('#profile-edit-form'), {
    handleUpdateProfile
});

//Display
function display() {
    User({ user, profile });
    Profile({ user, profile });
}

handlePageLoad();
