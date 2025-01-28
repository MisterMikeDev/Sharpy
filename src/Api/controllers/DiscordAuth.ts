import { User } from "discord.js";
import passport from "passport";
import { Strategy as DiscordStrategy } from "passport-discord";
import { Config } from "../../Data/Config";

const {
    CallbackURL: callbackURL,
    ClientSecret: clientSecret,
    Client: clientID
} = Config.DiscordBot;

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user: unknown, done) {
    done(null, user as User);
});

passport.use(
    "discord",
    new DiscordStrategy(
        {
            scope: ["identify", "email", "guilds", "guilds.join"],
            clientID,
            clientSecret,
            callbackURL
        },
        function (accessToken, refreshToken, profile, done) {
            done(null, {
                profile,
                accessToken
            });
        }
    )
);
