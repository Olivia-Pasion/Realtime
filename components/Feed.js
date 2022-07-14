export default function createFeed(ul) {
    return ({ posts }) => {
        ul.innerHTML = '';

        for (const post of posts) {
            const li = document.createElement('li');
            ul.append(li);

            const usernameSpan = document.createElement('span');
            li.append(usernameSpan);
            usernameSpan.textContent = post.profile.username;

            const contentSpan = document.createElement('span');
            li.append(contentSpan);
            contentSpan.textContent = post.text;

            const image = document.createElement('img');
            li.append(image);
            image.src = post.image ?? '';

        }
    };
}
