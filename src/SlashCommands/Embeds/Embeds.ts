import {
    ApplicationCommandOptionType,
    CommandInteractionOptionResolver,
    GuildMemberRoleManager,
    PermissionFlagsBits,
    PermissionsBitField
} from "discord.js";
import { SlashCommandStructure } from "../../Interfaces";
import { Emojis } from "../../Data/Emojis";
import { Config } from "../../Data/Config";
import { RulesCommand } from "./Rules.cmd";
import { StaffRulesCommand } from "./StaffRules.cmd";
import { InfoRulesCommand } from "./InfoBoosters.cmd";
import { SendLaggingBoostEmbedsCommand } from "./SendLaggingBoostEmbeds.cmd";
import { TicketsCreatedCommand } from "./TicketCreatorEmbed.cmd";
import { SendTagCommand } from "./SendTag.cmd";
import { SendPartnerEmbedCommand } from "./PartnerEmbed.cmd";
import { InfoBeMusicArtistEmbedCommand } from "./InfoMusicArtist.cmd";
import { InfoGraphicArtistEmbedCommand } from "./InfoGraphicArtist.cmd";
import { ApplicationCriteriaCommand } from "./ApplicationCriteria.cmd";
import { HierarchiesCommand } from "./Hierarchies.cmd";
import { DesignerRulesCommand } from "./DesignerRules.cmd";
import { StaffEventRulesCommand } from "./StaffEventRules.cmd";
import { InfoStaffRulesCommand } from "./InfoStaffRulesCommand.cmd";
import { InfoEventCreatorEmbedCommand } from "./InfoEventCreatorCommand.cmd";
import { InfoDesignerEmbedCommand } from "./InfoDesignerCommand.cmd";
import { InfoStaffEmbedCommand } from "./InfoStaffCommand.cmd";
import { InfoPartnerEmbedCommand } from "./InfoPartnerEmbedCommand.cmd";
import { InfoGraphicDesignerEmbedCommand } from "./InfoGraphicDesignerCommand.cmd";
import { InfoMusicArtistEmbedCommand } from "./InfoMusicArtistCommand.cmd";
import { ManualJuradoEmbedCommand } from "./ManualJuradoEmbed.cmd";
import { ManualEventEmbedCommand } from "./ManualEventsCommand.cmd";
import { InfoRockolaEmbedCommand } from "./InfoRockola.cmd";
import { AutorolesCommand } from "./Autoroles.cmd";
import { SharpyInfoCommand } from "./SharpyInfo.cmd";
import { InfoKaraokeCommand } from "./InfoKaraoke.cmd";
import { InfoApealCommand } from "./InfoApeal.cmd";
import { ApealCreatorCommand } from "./ApealCreator.cmd";
const { Subcommand, String, User } = ApplicationCommandOptionType;

export default new SlashCommandStructure({
    name: "embeds",
    description: "Sub SlashCommands de Embeds.",
    usage: "/embeds <subcommand>",
    options: [
        {
            name: "send-embed-1",
            description: "Envía un embed de la primera página.",
            type: Subcommand,
            options: [
                {
                    name: "embed",
                    description: "Nombre del embed a enviar.",
                    type: String,
                    required: true,
                    choices: [
                        {
                            name: "Autoroles",
                            value: "autoroles"
                        },
                        {
                            name: "Criterios de Aplicación",
                            value: "info-criteria-application"
                        },
                        {
                            name: "Reglas",
                            value: "rules"
                        },
                        {
                            name: "Reglas del Staff",
                            value: "staff-rules"
                        },
                        {
                            name: "Información de Boosters",
                            value: "info-boosters"
                        },
                        {
                            name: "Ticket Creador",
                            value: "tickets-created"
                        },
                        {
                            name: "Información de Partner",
                            value: "info-partner"
                        },
                        {
                            name: "Información de Jerarquías",
                            value: "info-hierarchies"
                        },
                        {
                            name: "Información de Artista Musical",
                            value: "info-music-artist"
                        },
                        {
                            name: "Información de Diseñador Gráfico",
                            value: "info-graphic-artist"
                        },
                        {
                            name: "Reglas de Diseñadores",
                            value: "info-designers-rules"
                        },
                        {
                            name: "Reglas de Eventos del Staff",
                            value: "staff-event-rules"
                        },
                        {
                            name: "Reglas del Staff",
                            value: "info-staff-rules"
                        },
                        {
                            name: "Postulación de Partner",
                            value: "posutlation-partner"
                        },
                        {
                            name: "Postulación de Artista Musical",
                            value: "posutlation-music-artist"
                        },
                        {
                            name: "Postulación de Artista Gráfico",
                            value: "posutlation-graphic-artist"
                        },
                        {
                            name: "Postulación de Creador de Eventos",
                            value: "posutlation-event-creator"
                        },
                        {
                            name: "Postulación de Diseñador",
                            value: "posutlation-designer"
                        },
                        {
                            name: "Postulación de Staff",
                            value: "posutlation-staff"
                        },
                        {
                            name: "Manual de Jurado",
                            value: "manual-jurado"
                        },
                        {
                            name: "Manual de Eventos",
                            value: "manual-event"
                        },
                        {
                            name: "Información de Rockola",
                            value: "info-rockola"
                        },
                        {
                            name: "Información de Sharpy",
                            value: "info-sharpy"
                        },
                        {
                            name: "Información de Karaoke",
                            value: "info-karaoke"
                        },
                        {
                            name: "Información de Apelaciones",
                            value: "info-apeal"
                        }
                    ].sort((a, b) => a.name.localeCompare(b.name))
                }
            ]
        },
        {
            name: "send-embed-2",
            description: "Envía un embed de la segunda página.",
            type: Subcommand,
            options: [
                {
                    name: "embed",
                    description: "Nombre del embed a enviar.",
                    type: String,
                    required: true,
                    choices: [
                        {
                            name: "Creador de Apelaciones",
                            value: "creator-apeal"
                        }
                    ].sort((a, b) => a.name.localeCompare(b.name))
                }
            ]
        },
        {
            name: "send-tag",
            description: "Envía un embed tag.",
            type: Subcommand,
            options: [
                {
                    name: "message",
                    description: "Mensaje a enviar.",
                    type: String,
                    required: true
                },
                {
                    name: "type",
                    description: "Tipo de la tag.",
                    type: String,
                    required: true,
                    choices: [
                        {
                            name: "Info",
                            value: "info"
                        },
                        {
                            name: "Success",
                            value: "success"
                        },
                        {
                            name: "Error",
                            value: "error"
                        },
                        {
                            name: "Warning",
                            value: "warning"
                        },
                        {
                            name: "Normal",
                            value: "normal"
                        }
                    ]
                }
            ]
        },
        {
            name: "send-lagging-boost-embeds",
            description: "Envía los embeds de boost atrasados.",
            type: Subcommand,
            options: [
                {
                    name: "type",
                    description: "Tipo de envío.",
                    type: String,
                    required: true,
                    choices: [
                        {
                            name: "Último",
                            value: "last"
                        },
                        {
                            name: "Usuario",
                            value: "user"
                        },
                        {
                            name: "Todos",
                            value: "all"
                        }
                    ]
                },
                {
                    name: "user",
                    description: "Usuario a enviar.",
                    type: User
                }
            ]
        }
    ],
    run: async ({ Sharpy, interaction }) => {
        await interaction.deferReply({ ephemeral: true });

        if (!interaction.guildId)
            return await interaction.followUp(
                `${Emojis.Util.No} | No se ha encontrado el servidor.`
            );

        const memberPermissions = interaction.member?.permissions;
        const requiredPermissions = [PermissionFlagsBits.Administrator];
        const requiredRoles = [
            Config.DiscordBot.EchosOfTalent.roles.PoderesMisticos,
            Config.DiscordBot.EchosOfTalent.roles.Founder,
            Config.DiscordBot.EchosOfTalent.roles.Director,
            Config.DiscordBot.EchosOfTalent.roles.Programador,
            Config.DiscordBot.EchosOfTalent.roles.Admin,
            Config.DiscordBot.EchosOfTalent.roles.Supervisor,
            Config.DiscordBot.EchosOfTalent.roles.Moderator
        ];

        const permissions =
            memberPermissions instanceof PermissionsBitField
                ? memberPermissions
                : new PermissionsBitField(BigInt(memberPermissions as string));
        const hasRequiredPermissions = requiredPermissions.some((permission) =>
            permissions?.has(permission)
        );

        let hasRequiredRoles = false;
        if (interaction.member?.roles instanceof GuildMemberRoleManager) {
            hasRequiredRoles = interaction.member.roles.cache.some((role) =>
                requiredRoles.includes(role.id)
            );
        } else if (Array.isArray(interaction.member?.roles)) {
            hasRequiredRoles = interaction.member.roles.some((roleId) =>
                requiredRoles.includes(roleId)
            );
        }

        if (!hasRequiredPermissions && !hasRequiredRoles) {
            return await interaction.followUp({
                content: `${Emojis.Util.No} | No tienes permisos para ejecutar este comando.`
            });
        }

        const Int = interaction.options as CommandInteractionOptionResolver;
        const subCommand = Int.getSubcommand();
        const IntMap = {
            "send-embed": async () => {
                const embed = Int.getString("embed");
                const CommandToExecute = {
                    autoroles: async () =>
                        await AutorolesCommand({ Sharpy, interaction }),
                    rules: async () => await RulesCommand({ Sharpy, interaction }),
                    "staff-rules": async () => StaffRulesCommand({ Sharpy, interaction }),
                    "info-boosters": async () =>
                        await InfoRulesCommand({ Sharpy, interaction }),
                    "tickets-created": async () =>
                        await TicketsCreatedCommand({ Sharpy, interaction }),
                    "info-partner": async () =>
                        await SendPartnerEmbedCommand({ Sharpy, interaction }),
                    "info-criteria-application": async () =>
                        await ApplicationCriteriaCommand({ Sharpy, interaction }),
                    "info-hierarchies": async () =>
                        await HierarchiesCommand({ Sharpy, interaction }),
                    "info-designers-rules": async () =>
                        await DesignerRulesCommand({ Sharpy, interaction }),
                    "info-music-artist": async () =>
                        await InfoBeMusicArtistEmbedCommand({ Sharpy, interaction }),
                    "info-graphic-artist": async () =>
                        await InfoGraphicArtistEmbedCommand({ Sharpy, interaction }),
                    "staff-event-rules": async () =>
                        await StaffEventRulesCommand({ Sharpy, interaction }),
                    "info-staff-rules": async () =>
                        await InfoStaffRulesCommand({ Sharpy, interaction }),
                    "posutlation-partner": async () =>
                        await InfoPartnerEmbedCommand({ Sharpy, interaction }),
                    "posutlation-music-artist": async () =>
                        await InfoMusicArtistEmbedCommand({ Sharpy, interaction }),
                    "posutlation-graphic-artist": async () =>
                        await InfoGraphicDesignerEmbedCommand({ Sharpy, interaction }),
                    "posutlation-event-creator": async () =>
                        await InfoEventCreatorEmbedCommand({ Sharpy, interaction }),
                    "posutlation-designer": async () =>
                        await InfoDesignerEmbedCommand({ Sharpy, interaction }),
                    "posutlation-staff": async () =>
                        await InfoStaffEmbedCommand({ Sharpy, interaction }),
                    "manual-jurado": async () =>
                        await ManualJuradoEmbedCommand({ Sharpy, interaction }),
                    "manual-event": async () =>
                        await ManualEventEmbedCommand({ Sharpy, interaction }),
                    "info-rockola": async () =>
                        await InfoRockolaEmbedCommand({ Sharpy, interaction }),
                    "info-sharpy": async () =>
                        await SharpyInfoCommand({ Sharpy, interaction }),
                    "info-karaoke": async () =>
                        await InfoKaraokeCommand({ Sharpy, interaction }),
                    "info-apeal": async () =>
                        await InfoApealCommand({ Sharpy, interaction })
                }[embed as keyof typeof CommandToExecute];
                if (CommandToExecute) await CommandToExecute();
                else await interaction.followUp("No se ha encontrado el embed.");
            },
            "send-embed-2": async () => {
                const embed = Int.getString("embed");
                const CommandToExecute = {
                    "creator-apeal": async () =>
                        await ApealCreatorCommand({ Sharpy, interaction })
                }[embed as keyof typeof CommandToExecute];
                if (CommandToExecute) await CommandToExecute();
                else await interaction.followUp("No se ha encontrado el embed.");
            },
            "send-tag": async () => {
                const message = Int.getString("message") ?? "...";
                const choice =
                    (Int.getString("type") as
                        | "info"
                        | "success"
                        | "error"
                        | "warning"
                        | "normal") ?? "normal";
                await SendTagCommand({ Sharpy, interaction, message, choice });
            },
            "send-lagging-boost-embeds": async () =>
                SendLaggingBoostEmbedsCommand({ Sharpy, interaction, options: Int })
        };

        const CommandToExecute = IntMap[subCommand as keyof typeof IntMap];
        if (CommandToExecute) await CommandToExecute();
        else await interaction.followUp("No se ha encontrado el subcomando.");
    }
});
