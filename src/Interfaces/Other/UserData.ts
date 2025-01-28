export interface UserData {
    id: string;
    username: string;
    avatar: string;
    discriminator: string;
    public_flags: number;
    flags: number;
    banner: string | null;
    accent_color: number | null;
    global_name: string | null;
    avatar_decoration_data: {
        asset: string;
        sku_id: string;
        expires_at: string | null;
    } | null;
    banner_color: string | null;
    clan: string | null;
    primary_guild: string | null;
    tag: string;
    createdAt: string;
    createdTimestamp: number;
    public_flags_array: string[];
    defaultAvatarURL: string;
    avatarURL: string | null | undefined;
    bannerURL: string | null | undefined;
}
