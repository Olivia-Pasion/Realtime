
export default function createAuthForm(form, { handleAuth, handleChangeType }) {
    const h2 = form.querySelector('h2');
    const button = form.querySelector('button');
    const changeType = form.querySelector('.change-type');
    const error = form.querySelector('.error');

    changeType.addEventListener('click', () => {
        handleChangeType();
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        handleAuth(
            formData.get('email'),
            formData.get('password')
        );
    });

    return ({ isSignUp, errorMessage }) => {
        const type = isSignUp ? signUpType : signInType;

        h2.textContent = type.header;
        button.textContent = type.button;
        changeType.textContent = type.prompt;

        error.textContent = errorMessage;
    };
}

const signUpType = {
    header: 'Create a new account',
    button: 'Sign Up',
    prompt: 'Already have an account?'
};

const signInType = {
    header: 'Sign in to your account',
    button: 'Sign In',
    prompt: 'Need to create an account?'
};