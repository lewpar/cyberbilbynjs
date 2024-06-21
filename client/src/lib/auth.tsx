type ProtectedRoute = {
    route: string;
    roles: string[];
}

type UserAccess = {
    role: string;
    loggedIn: boolean;
}

const protectedRoutes: ProtectedRoute[] = [
    {
        route: "/test",
        roles: [ "administrator" ]
    }
];

function canRoleAccessRoute(role: string, route: string): boolean {
    let result = protectedRoutes.find(pr => pr.route === route && pr.roles.includes(role));

    if(!result) {
        return false;
    }

    return true;
}

export function canAccessProtectedRoute(route: string): boolean {
    let access = getUserAccess();
    if(!access) {
        return false;
    }

    if(!canRoleAccessRoute(access.role, route)) {
        return false;
    }

    return true;
}

export function isLoggedIn(): boolean {
    let access = getUserAccess();
    if(!access) {
        return false;
    }

    return true;
}

function getUserAccess(): UserAccess | null {
    let cookie = getCookie("cbusr");
    if(!cookie) {
        return null;
    }

    let access = JSON.parse(atob(decodeURIComponent(cookie))) as UserAccess;
    if(!access) {
        return null;
    }

    return access;
}

// Curtesy of https://stackoverflow.com/questions/51109559/get-cookie-with-react
export function getCookie(key: string): string | undefined {
    let b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");

    return b ? b.pop() : "";
}