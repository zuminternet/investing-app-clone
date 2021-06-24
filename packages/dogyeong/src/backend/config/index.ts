export const authConfig = {
  googleGrantCodeHeader: 'inv_google_auth',
  accessTokenCookie: '_inv_access_token_',
  cookieOptions: {
    httpOnly: true,
    maxAge: 24 * 3600 * 1000, // 1 day
    sameSite: 'lax',
  },
} as const;

export const jwtConfig = {
  secret: 'jwtsecretyeah',
};

export const mongoConfig = {
  uri: 'mongodb://127.0.0.1:27017/investing',
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    user: 'zum',
    pass: 'zumdev',
    authSource: 'admin',
  },
};
