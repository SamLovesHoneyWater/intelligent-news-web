import 'next-auth';

declare module 'next-auth' {
    interface User {
        id: string;
        username?: string;
    }
    
    interface Profile {
        id: string;
        email_verified?: boolean;
    }
}
