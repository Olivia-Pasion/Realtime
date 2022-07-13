// import services and utilities
import { getUser, signIn, signUp } from '../services/auth-service.js';

// component creators
import createAuthForm from '../components/AuthForm.js';

let errorMessage = '';
let isSignUp = false;
let redirectUrl = '../';

// handler functions
async function handlePageLoad() {
    const user = getUser();
    if (user) {
        location.replace('../');
        return;
    }

    const params = new URLSearchParams(location.search);
    redirectUrl = params.get('redirectUrl') || '../';

    display();
}

async function handleAuth(email, password) {
    const authMethod = isSignUp ? signUp : signIn;

    const { error } = await authMethod(email, password);

    if (error) {
        // eslint-disable-next-line no-console
        console.log(error);
        errorMessage = error.message;
        display();
    }
    else {
        location.replace(redirectUrl);
    }
}

function handleChangeType() {
    isSignUp = !isSignUp;
    display();
}

// Create each component: 
const AuthForm = createAuthForm(
    document.querySelector('#auth-form'),
    { handleAuth, handleChangeType }
);

function display() {
    AuthForm({ isSignUp, errorMessage });
}

// Call handle page load
handlePageLoad();
