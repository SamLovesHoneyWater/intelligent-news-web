import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: AuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    session: { strategy: "jwt" },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async signIn({ account, profile }) {
            if (account?.provider === "google" && profile?.email_verified) {
                return true;
            } else {
            return false;
            }
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.email = token.email;
            }
            return session;
        },
        async jwt({ token, account, profile }) {
            if (account && profile) {
                token.accessToken = account.access_token;
                token.id = profile.id;
            }
            return token;
        }
    },
    pages: {
        signIn: '/auth/signin',
        error: '/auth/error',
    }
};
