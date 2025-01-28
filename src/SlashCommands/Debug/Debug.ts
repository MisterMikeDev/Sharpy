import { SlashCommandStructure, UserData } from "../../Interfaces";
import { generateXpCard, generateTournamentImage } from "../../Lib";
import {
    ApplicationCommandOptionType,
    CommandInteractionOptionResolver
} from "discord.js";
const { Subcommand } = ApplicationCommandOptionType;
export default new SlashCommandStructure({
    name: "debug",
    description: "Sub SlashCommands del debug.",
    usage: "/debug <subcommand>",
    options: [
        {
            name: "debug-xp-card",
            description: "Manda un mensaje con la tarjeta de experiencia.",
            type: Subcommand
        },
        {
            name: "tournament",
            description: "Comando para probar un torneo.",
            type: Subcommand
        },
        {
            name: "get-roles",
            description: "Obtiene los roles del servidor.",
            type: Subcommand
        },
        {
            name: "get-emojis",
            description: "Obtiene los emojis del servidor.",
            type: Subcommand
        }
    ],
    run: async ({ Sharpy, interaction }) => {
        await interaction.deferReply();
        const Int = interaction.options as CommandInteractionOptionResolver;
        const subCommand = Int.getSubcommand();
        const IntMap = {
            "debug-xp-card": async () => {
                try {
                    const user = Sharpy.guilds.cache
                        .get("1307747744768856110")!
                        .members.cache.random()!.user!;

                    const userData = await fetch(
                        `https://japi.rest/discord/v1/user/${user.id}`
                    );

                    const { data } = await userData.json();
                    const { bannerURL, avatarURL, defaultAvatarURL } = data as UserData;

                    const cardBuffer = await generateXpCard({
                        avatarUrl: avatarURL ?? defaultAvatarURL,
                        username: user.username,
                        backgroundUrl:
                            bannerURL ??
                            "https://cdn.discordapp.com/attachments/1313715864511709184/1313988906299035728/Echoes_of_talent.png?ex=677b0187&is=6779b007&hm=396b39d764a68e0dcfaef320f0b710609363b65be280f8ec344f340f166d6c13&",
                        level: Math.floor(Math.random() * 99) + 1,
                        currentXp: Math.floor(Math.random() * 3500),
                        requiredXp: Math.floor(Math.random() * 3500) + 3500,
                        mainColor: "#550000"
                    });

                    await interaction.followUp({
                        files: [{ attachment: cardBuffer, name: "xp-card.png" }]
                    });
                } catch (error) {
                    console.error(error);
                    await interaction.followUp({
                        content: "Ocurrió un error al enviar la tarjeta de experiencia.",
                        ephemeral: true
                    });
                }
            },
            tournament: async () => {
                function getUser(id: string) {
                    return (
                        Sharpy.users.cache.get(id) ??
                        Sharpy.users.cache.find((user) => user.username === id) ??
                        Sharpy.user!
                    );
                }

                const mrmikedev = getUser("437308398845952001");
                const nolan = getUser("895819071726161941");
                const mary = getUser("1300883123533381733");
                const sebas = getUser("1069799361913028639");

                const buffer = await generateTournamentImage({
                    preliminary: {
                        duel1: {
                            participant1: mrmikedev,
                            participant2: nolan,
                            winner: 1
                        },
                        duel2: { participant1: mary, participant2: sebas, winner: 1 },
                        duel3: { participant1: mrmikedev, participant2: mary, winner: 2 },
                        duel4: { participant1: nolan, participant2: sebas, winner: 2 }
                    },
                    semifinal: {
                        duel1: {
                            participant1: mrmikedev,
                            participant2: sebas,
                            winner: 1
                        },
                        duel2: {
                            participant1: nolan,
                            participant2: mary,
                            winner: 2
                        }
                    },
                    final: {
                        duel1: {
                            participant1: mrmikedev,
                            participant2: mary,
                            winner: 1
                        }
                    },
                    winner: [mrmikedev]
                });

                await interaction.followUp({
                    content: "Torneo",
                    files: [{ attachment: buffer, name: "tournament.png" }]
                });
            },
            "get-roles": async () => {
                const guild = interaction.guild!;
                guild.roles.cache.map((role) => {
                    const r = {
                        id: role.id,
                        name: role.name
                    };

                    console.log(r);

                    return r;
                });

                await interaction.followUp({
                    content: "Roles enviados al log."
                });
            },
            "get-emojis": async () => {
                const guild = interaction.guild!;
                guild.emojis.cache.map((emoji) => {
                    const e = {
                        id: emoji.id,
                        name: emoji.name,
                        animated: emoji.animated
                    };

                    console.log(e);

                    return e;
                });

                await interaction.followUp({
                    content: "Emojis enviados al log."
                });
            }
        };

        const CommandToExecute = IntMap[subCommand as keyof typeof IntMap];
        if (CommandToExecute) await CommandToExecute();
        else await interaction.followUp("No se ha encontrado el subcomando.");
    }
});
