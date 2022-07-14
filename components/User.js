import { getAuthRedirect } from '../utils.js';
export default function createUser(root, { handleSignOut }) {

    return ({ user, profile }) => {
        root.innerHTML = '';

        if (user) {
            const nameDisplay = document.createElement('span');
            nameDisplay.textContent = profile.username;

            const signOutLink = document.createElement('a');
            signOutLink.textContent = 'Sign out';
            signOutLink.href = '';
            signOutLink.addEventListener('click', () => {
                handleSignOut();
            });

            root.append(nameDisplay, signOutLink);
        }
        else {
            const signInLink = document.createElement('a');
            signInLink.textContent = 'Sign in';
            signInLink.href = getAuthRedirect();

            root.append(signInLink);
        }
    };
}
