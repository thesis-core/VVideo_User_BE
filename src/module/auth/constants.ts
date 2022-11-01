export const jwtConstants = {
    saltRound: Number(process.env.SALT_ROUND),
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
    accessTokenExpiry: process.env.ACCESS_TOKEN_EXPIRY,
    refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
    refreshTokenExpires: process.env.REFRESH_TOKEN_EXPIRY,
};

export enum Role {
    NONE,
    SUPER_ADMIN,
    ADMIN,
}
