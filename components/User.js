import { getAuthRedirect } from '../utils.js';

export default function createUser(root, { handleSignOut }) {
    return ({ user, profile }) => {
        root.innerHTML = '';

        if (user) {
            const avatarDisplay = document.createElement('img');
            avatarDisplay.src = profile.avatar_url;
            avatarDisplay.alt = `${profile.username}'s avatar image`;
            avatarDisplay.classList.add('avatar-image');

            const nameDisplay = document.createElement('span');
            nameDisplay.textContent = profile.username;

            const signOutLink = document.createElement('a');
            signOutLink.textContent = 'Sign out';
            signOutLink.href = '';
            signOutLink.addEventListener('click', () => {
                handleSignOut();
            });

            const editProfileLink = document.createElement('a');
            editProfileLink.textContent = 'Edit Profile';
            editProfileLink.href = './Profile';

            const textContainer = document.createElement('div');
            textContainer.classList.add('stacked');

            textContainer.append(nameDisplay, signOutLink, editProfileLink);
            root.append(avatarDisplay, textContainer);
        }
        else {
            const signInLink = document.createElement('a');
            signInLink.textContent = 'Sign in';
            signInLink.href = getAuthRedirect();

            root.append(signInLink);
        }
    };
}
