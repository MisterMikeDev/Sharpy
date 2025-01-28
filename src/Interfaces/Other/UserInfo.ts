export interface GuildInfo {
    id: string;
    name: string;
    icon: string | null;
    owner: boolean;
    permissions: number;
    permissions_new: string;
    features: string[];
}

export interface UserInfo {
    id: string;
    username: string;
    global_name: string;
    avatar: string | null;
    banner: string | null;
    banner_color: string | null;
    locale: string;
    mfa_enabled: boolean;
    premium_type: number;
    email: string;
    guilds: GuildInfo[];
    fetchedAt: string;
}

export interface Session {
    session: UserInfo;
    token: string;
}

export interface RawUserRequest {
    user: RawUser;
}

export interface RawUser {
    profile: RawProfile;
    accessToken: string;
}

export interface RawProfile {
    id: string;
    username: string;
    avatar: string;
    discriminator: string;
    public_flags: number;
    premium_type: number;
    flags: number;
    banner: any;
    accent_color: number;
    global_name: string;
    avatar_decoration_data: any;
    banner_color: string;
    mfa_enabled: boolean;
    locale: string;
    email: string;
    verified: boolean;
    provider: string;
    accessToken: string;
    guilds: RawGuild[];
    fetchedAt: string;
}

export interface RawGuild {
    id: string;
    name: string;
    icon: string;
    owner: boolean;
    permissions: number;
    permissions_new: string;
    features: string[];
}
