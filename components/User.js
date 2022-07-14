import { getAuthRedirect } from '../utils.js';

export default function createUser(root, contextLink, { handleSignOut }) {
    const { href: linkHref, text: linkText } = contextLink;

    return ({ user, profile, showContextLink }) => {
        showContextLink = showContextLink ?? true;

        root.innerHTML = '';

        if (user) {
            const avatarDisplay = document.createElement('img');
            avatarDisplay.src = profile.avatar_url;
            avatarDisplay.alt = `${profile.username}'s avatar image`;
            avatarDisplay.classList.add('avatar-image');
            
            const textContainer = document.createElement('div');
            textContainer.classList.add('stacked');

            const nameDisplay = document.createElement('span');
            nameDisplay.textContent = profile.username;
            textContainer.append(nameDisplay);

            const signOutLink = document.createElement('a');
            signOutLink.textContent = 'Sign out';
            signOutLink.href = '';
            signOutLink.addEventListener('click', () => {
                handleSignOut();
            });
            textContainer.append(signOutLink);
            
            if (showContextLink) {
                const contextLink = document.createElement('a');
                contextLink.textContent = linkText;
                contextLink.href = linkHref;
                textContainer.append(contextLink);
            }
            
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
