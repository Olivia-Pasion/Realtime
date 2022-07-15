

export default function createProfile(form, { handleUpdateProfile }) {
    const usernameInput = form.querySelector('input[name=input-username]');
    const avatarInput = form.querySelector('input[name=input-avatar]');
    const avatarDisplay = form.querySelector('img');

    let uploadPreview = null;

    avatarInput.addEventListener('change', () => {
        if (uploadPreview) {
            URL.revokeObjectURL(uploadPreview);
        }

        const [file] = avatarInput.files;
        uploadPreview = URL.createObjectURL(file);

        avatarDisplay.src = uploadPreview;
    });

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        handleUpdateProfile(
            formData.get('input-username'),
            formData.get('input-avatar')
        );
        form.reset();
    });

    return ({ user, profile }) => {
        if (profile) {
            const { username, avatar_url } = profile;
            if (username) usernameInput.value = username;
            if (avatar_url) avatarDisplay.src = avatar_url;
            if (uploadPreview) avatarDisplay.src = uploadPreview;
        }
        else {
            usernameInput.value = user?.email.split('@')[0];
        }
    };
}
