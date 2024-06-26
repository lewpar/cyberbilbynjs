import NextAuth from "next-auth"
import github from "next-auth/providers/github";
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [github],
});

export async function isSessionValid(): Promise<boolean> {
    let session = await auth();

    if(!session) {
        return false;
    }

    return true;
}