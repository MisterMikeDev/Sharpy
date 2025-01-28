import { SlashCommandStructure } from "../../Interfaces";
import {
    ApplicationCommandOptionType,
    CommandInteractionOptionResolver
} from "discord.js";
import { AddUserBlacklistCommand } from "./AddUser.cmd";
import { RemoveUserBlacklistCommand } from "./RemoveUser.cmd";
import { GetUserListBlacklistCommand } from "./GetUserList.cmd";
const { Subcommand } = ApplicationCommandOptionType;
export default new SlashCommandStructure({
    name: "dev",
    description: "Sub SlashCommands del Dev.",
    usage: "/dev <subcommand>",
    options: [
        {
            name: "add-blacklist",
            description: "Añade un usuario a la blacklist.",
            type: Subcommand,
            options: [
                {
                    name: "user-id",
                    description: "Usuario a añadir.",
                    type: ApplicationCommandOptionType.String,
                    required: true
                },
                {
                    name: "reason",
                    description: "Razón del por qué se añade.",
                    type: ApplicationCommandOptionType.String
                }
            ]
        },
        {
            name: "remove-blacklist",
            description: "Elimina un usuario de la blacklist.",
            type: Subcommand,
            options: [
                {
                    name: "user-id",
                    description: "Usuario a eliminar.",
                    type: ApplicationCommandOptionType.String,
                    required: true
                }
            ]
        },
        {
            name: "get-blacklist",
            description: "Obtiene la lista negra de usuarios.",
            type: Subcommand
        }
    ],
    run: async ({ Sharpy, interaction }) => {
        await interaction.deferReply();
        if (!interaction.guild) return;
        if (interaction.user.id !== "437308398845952001") return;
        const Int = interaction.options as CommandInteractionOptionResolver;
        const subCommand = Int.getSubcommand();
        const IntMap = {
            "add-blacklist": async () => {
                const userId = Int.getString("user-id")!;
                const reason = Int.getString("reason") || "No especificado.";
                await AddUserBlacklistCommand({
                    Sharpy,
                    interaction,
                    userId,
                    reason
                });
            },
            "remove-blacklist": async () => {
                const userId = Int.getString("user-id")!;
                await RemoveUserBlacklistCommand({
                    Sharpy,
                    interaction,
                    userId
                });
            },
            "get-blacklist": async () =>
                GetUserListBlacklistCommand({ Sharpy, interaction })
        };

        const CommandToExecute = IntMap[subCommand as keyof typeof IntMap];
        if (CommandToExecute) await CommandToExecute();
        else await interaction.followUp("No se ha encontrado el subcomando.");
    }
});
