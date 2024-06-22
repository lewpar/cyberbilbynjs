type ProtectedRoute = {
    route: string;
    roles: string[];
}

const protectedRoutes: ProtectedRoute[] = [
    {
        route: "/author",
        roles: [ "user", "author", "administrator" ]
    },
    {
        route: "/author/create",
        roles: [ "user", "author", "administrator" ]
    }
];

export class UserAccess {
    constructor(public role: string, public loggedIn: boolean) {}

    canAccessProtectedRoute(route: string): boolean {
        if(!this.loggedIn) {
            return false;
        }

        let result = protectedRoutes.find(pr => pr.route === route && pr.roles.includes(this.role));
        if(!result) {
            return false;
        }
    
        return true;
    }
}

export function getUserAccess(): UserAccess {
    let cookie = getCookie("cbusr");
    if(!cookie) {
        return new UserAccess("", false);
    }

    let access = JSON.parse(atob(decodeURIComponent(cookie))) as UserAccess;
    if(!access) {
        return new UserAccess("", false);
    }

    return new UserAccess(access.role, access.loggedIn);
}

export function clearUserAccess() {
    if(!getCookie("cbusr")) {
        return;
    }

    clearCookie("cbusr"); // Client session
    clearCookie("jwt"); // Server session
}

// Courtesy of https://stackoverflow.com/questions/51109559/get-cookie-with-react
function getCookie(key: string): string | undefined {
    let b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");

    return b ? b.pop() : "";
}

function clearCookie(key: string) {
    document.cookie = key + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}