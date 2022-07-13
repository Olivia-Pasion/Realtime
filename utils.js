
export async function protectPage(user) {
    if (!user) {
        location.replace(`/auth/?redirectUrl=${getRedirect()}`);
    }
}

export async function enforceProfile(profile) {
    if (!profile) {
        location.replace(`/profile/?redirectUrl=${getRedirect()}`);
    }
}

export function getRedirect() {
    const redirectUrl = encodeURIComponent(location.href);
    return `?redirectUrl=${redirectUrl.toString()}`;
}

export function getAuthRedirect() {
    const redirectUrl = encodeURIComponent(location.href);
    return `/auth/?redirectUrl=${redirectUrl.toString()}`;
}
