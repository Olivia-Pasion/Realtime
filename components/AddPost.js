export default function createAddPost(form, { handleAddPost }) {

    form.addEventListener('submit', async e => {
        e.preventDefault();

        const formData = new FormData(form);
        await handleAddPost(
            formData.get('input-text'),
            formData.get('input-image')
        );
        form.reset();
    });

    return () => {};
}
