import {
    ApplicationCommandOptionType,
    CommandInteractionOptionResolver
} from "discord.js";
import { SlashCommandStructure } from "../../Interfaces";
import { StartKaraokeCommand } from "./StartQueue.cmd";
import { ShowKaraokeCommand } from "./ShowQueue.cmd";
import { StartDuelCommand } from "./StartDuel.cmd";
import { ShowDuelCommand } from "./ShowDuel.cmd";
import { StartReplicCommand } from "./StartReplic.cmd";
import { ShowReplicCommand } from "./ShowReplic.cmd";

export default new SlashCommandStructure({
    name: "karaoke",
    description: "Sub SlashCommands del Karaoke.",
    usage: "/Karaoke <subcommand>",
    options: [
        {
            name: "start-queue",
            description: "Inicia una lista de Karaoke.",
            type: ApplicationCommandOptionType.Subcommand
        },
        {
            name: "show-queue",
            description: "Muestra la lista de Karaoke.",
            type: ApplicationCommandOptionType.Subcommand
        },
        {
            name: "start-duel",
            description: "Inicia un duelo de Karaoke.",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: "rival",
                    description: "Menciona al rival con el que quieres competir.",
                    type: ApplicationCommandOptionType.User,
                    required: true
                }
            ]
        },
        {
            name: "show-duel",
            description: "Muestra el estado del duelo de Karaoke.",
            type: ApplicationCommandOptionType.Subcommand
        },
        {
            name: "start-replic",
            description: "Inicia una réplica de Karaoke.",
            type: ApplicationCommandOptionType.Subcommand
        },
        {
            name: "show-replic",
            description: "Muestra el estado de la réplica de Karaoke.",
            type: ApplicationCommandOptionType.Subcommand
        }
    ],
    run: async ({ Sharpy, interaction }) => {
        await interaction.deferReply();
        const Int = interaction.options as CommandInteractionOptionResolver;
        const subCommand = Int.getSubcommand();
        const IntMap = {
            "start-queue": () => StartKaraokeCommand({ Sharpy, interaction }),
            "show-queue": () => ShowKaraokeCommand({ Sharpy, interaction }),
            "start-duel": () => StartDuelCommand({ Sharpy, interaction }),
            "show-duel": () => ShowDuelCommand({ Sharpy, interaction }),
            "start-replic": () => StartReplicCommand({ Sharpy, interaction }),
            "show-replic": () => ShowReplicCommand({ Sharpy, interaction })
        };

        const CommandToExecute = IntMap[subCommand as keyof typeof IntMap];
        if (CommandToExecute) await CommandToExecute();
        else await interaction.followUp("No se ha encontrado el subcomando.");
    }
});
