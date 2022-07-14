

export default function createProfile(form, { handleUpdateProfile }) {
    const usernameInput = form.querySelector('input[name=input-username]');
    const avatarInput = form.querySelector('input[name=input-avatar]');
    const preview = form.querySelector('img');

    avatarInput.addEventListener('change', () => {
        const [file] = avatarInput.files;
        preview.src = URL.createObjectURL(file);
    });

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        handleUpdateProfile(
            formData.get('input-username'),
            formData.get('input-avatar')
        );
    });

    return ({ user, profile }) => {
        if (profile) {
            const { username, avatar } = profile;
            if (username) usernameInput.value = username;
            if (avatar) preview.src = avatar;
        }
        else {
            usernameInput.value = user?.email.split('@')[0];
        }
    };
}
