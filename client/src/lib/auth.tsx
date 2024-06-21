type ProtectedRoute = {
    route: string;
    roles: string[];
}

type UserAccess = {
    role: string;
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
    let cookie = getCookie("cbusr");
    if(!cookie) {
        return false;
    }

    let access = JSON.parse(atob(decodeURIComponent(cookie))) as UserAccess;
    if(!canRoleAccessRoute(access.role, route)) {
        return false;
    }

    return true;
}

// Curtesy of https://stackoverflow.com/questions/51109559/get-cookie-with-react
export function getCookie(key: string): string | undefined {
    let b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");

    return b ? b.pop() : "";
}