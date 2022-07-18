export default function createFeed(ul) {
    return ({ posts }) => {
        ul.innerHTML = '';

        for (const post of posts) {
            const li = document.createElement('li');
            ul.append(li);

            const avatarImage = document.createElement('img');
            avatarImage.classList.add('avatar-image');
            li.append(avatarImage);
            avatarImage.src = post.profile.avatar_url;

            const usernameSpan = document.createElement('span');
            li.append(usernameSpan);
            usernameSpan.classList.add('username-span');
            usernameSpan.textContent = post.profile.username;

            const contentSpan = document.createElement('span');
            li.append(contentSpan);
            contentSpan.classList.add('text-span');
            contentSpan.textContent = post.text;

            if (post.image) {
                const image = document.createElement('img');
                image.classList.add('image-span');
                li.append(image);
                image.src = post.image ?? '';
            }
        }
    };
}
