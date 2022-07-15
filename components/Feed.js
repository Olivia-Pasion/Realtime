export default function createFeed(ul, { handleLastPostVisibility }) {
    return ({ posts }) => {
        ul.innerHTML = '';

        for (let i = 0; i < posts.length; ++i) {
            const post = posts[i];

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

            // If this is the last post, attach intersection observer to it and wire it up to the
            // provided handler.
            if (i === posts.length - 1) {
                const observer = new IntersectionObserver(entries => {
                    const entry = entries.find(x => x.target === li);
                    handleLastPostVisibility(entry);
                });
                observer.observe(li);
            }
        }
    };
}
