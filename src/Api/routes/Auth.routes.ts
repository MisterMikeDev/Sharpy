import { Router } from "express";
import passport from "passport";
import { UserInfo } from "../../Interfaces/Other/UserInfo";

const AuthRouter = Router();

AuthRouter.get("/", passport.authenticate("discord"));

AuthRouter.get("/get", (req, res) => {
    res.json({
        user: req.user
    });
});

AuthRouter.get(
    "/callback",
    passport.authenticate("discord", {
        failureRedirect: "/"
    }),
    (req, res) => {
        const { profile, accessToken } = req.user as {
            profile: UserInfo;
            accessToken: string;
        };
        const {
            id,
            username,
            avatar,
            banner,
            banner_color,
            global_name,
            mfa_enabled,
            locale,
            premium_type,
            email,
            guilds,
            fetchedAt
        } = profile;

        const newUser = {
            id,
            username,
            avatar: avatar ? `https://cdn.discordapp.com/avatars/${id}/${avatar}` : null,
            banner: banner ? `https://cdn.discordapp.com/banners/${id}/${banner}` : null,
            displayName: global_name,
            banner_color,
            mfa_enabled,
            locale,
            premium_type,
            email,
            guilds: guilds.map((guild) => ({
                ...guild,
                icon: guild.icon
                    ? `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}`
                    : null
            })),
            fetchedAt
        };

        const data = {
            accessToken,
            user: newUser
        };

        res.json(data);
        // .send(`
        //     <script>
        //         window.opener.postMessage(${JSON.stringify(data)}, "http://localhost:4321");
        //         window.close();
        //     </script>
        // `);
    }
);

export { AuthRouter };
