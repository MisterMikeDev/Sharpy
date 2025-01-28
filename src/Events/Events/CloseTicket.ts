import { Db } from "../../Helpers/Db/Tickets";
import { Config } from "../../Data/Config";
import { Event } from "../../Interfaces";

export const event: Event = {
    name: "closeTicket",
    run: async (Sharpy, channel) => {
        const ticket = await Db.GetTicketByChannelId(Sharpy, channel.id);
        if (!ticket) return;

        await Db.DeleteTicketByIdWithReference(Sharpy, ticket.id);

        const guild = Sharpy.guilds.resolve(Config.DiscordBot.EchosOfTalent.id);
        if (!guild) return;

        const channelToDelete = guild.channels.cache.get(ticket.channelId);
        if (!channelToDelete) return;

        await channelToDelete.delete().catch(() => {});
    }
};
