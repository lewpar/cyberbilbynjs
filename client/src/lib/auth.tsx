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
    constructor(public role: string, public isLoggedIn: boolean) {}

    canAccessProtectedRoute(route: string): boolean {
        if(!this.isLoggedIn) {
            return false;
        }

        // If the path is /author/ then remove the trailing slash.
        if(route.endsWith('/')) {
            route = route.slice(0, route.length - 1);
        }

        let result = protectedRoutes.some(pr => pr.route === route && pr.roles.includes(this.role.toLowerCase()));
        if(!result) {
            return false;
        }
    
        return true;
    }
}

export function getUserAccess(): UserAccess {
    let cookie = getCookie("jwt");
    if(!cookie) {
        return new UserAccess("", false);
    }

    let parts = cookie.split('.');
    if(parts.length < 3) {
        console.error("Failed to parse JWT session.");
        return new UserAccess("", false);
    }
    
    let payload = JSON.parse(atob(decodeURIComponent(parts[1])));

    if(!payload.role) {
        return new UserAccess("", false);
    }

    return new UserAccess(payload.role, true);
}

export function clearSession() {
    if(!getCookie("jwt")) {
        return;
    }

    clearCookie("jwt");
}

// Courtesy of https://stackoverflow.com/questions/51109559/get-cookie-with-react
function getCookie(key: string): string | undefined {
    let b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");

    return b ? b.pop() : "";
}

function clearCookie(name: string) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
}