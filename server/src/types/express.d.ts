declare module 'express' {
  interface Request {
    user: AuthUser;
    headers: {
      authorization?: string;
    };
  }
}

interface AuthUser {
  id: string;
  role: string;
}
