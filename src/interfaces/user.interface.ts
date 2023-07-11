export interface User {
  id?: number;
  email: string;
  emailVerified: boolean;
  name: string;
  authId: string;
}

export interface AuthUser {
  email: string;
  email_verified: boolean;
  name?: string;
  user_id: string;
  identities: [
    {
      connection: string;
      user_id: string;
      provider: string;
      isSocial: boolean;
    },
  ];
}

export interface TokenUser {
  authDetails: {
    created_at: Date;
    updated_at: Date;
    email: string;
    email_verified: boolean;
    family_name?: string;
    given_name?: string;
    identities: [
      {
        connection: string;
        user_id: string;
        provider: string;
        isSocial: boolean;
      },
    ];
    name: string;
    nickname?: string;
    picture?: string;
    user_id: string;
  };
  iss: string;
  sub: string;
  aud: string[];
  scope: string;
}
