import { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } from "discord.js";
import { Sharpy } from "../../../Client";
import { ButtonsId } from "../../Enums";
import { Db } from "../../Db/Tickets";
import { Emojis, EmojisIds } from "../../../Data/Emojis";
import { Config } from "../../../Data/Config";

export const TicketsMainEmbed = (Sharpy: Sharpy) => {
    const embed = new EmbedBuilder()
        .setAuthor({
            name: "Sistema de Tickets",
            iconURL: Sharpy.user!.displayAvatarURL()
        })
        .setColor("#e0c258")
        .setDescription(
            `# Sistema de Tickets\nEste canal está destinado a la creación y resolución de tickets de soporte.\n\n${Emojis.Echo.PrettyArrowR} **Cómo funciona:**\n${Emojis.Echo.PurpleArrow} Haz clic en el botón **"Abrir Ticket"** o usa el comando correspondiente.\n${Emojis.Echo.PurpleArrow} Describe tu problema o consulta en el canal privado generado.\n${Emojis.Echo.PurpleArrow} El equipo de soporte te responderá lo antes posible.\n${Emojis.Echo.PurpleArrow} Una vez resuelto, el ticket será cerrado y archivado.\n\n${Emojis.Echo.PrettyArrowR} **Reglas:**\n${Emojis.Echo.AnimatedArrowYellow} Usa este canal solo para consultas relevantes.\n${Emojis.Echo.AnimatedArrowYellow} Sé respetuoso y claro al describir tu problema.`
        )
        .setFooter({
            text: "Para crear un ticket presiona el botón de abajo",
            iconURL: Sharpy.user!.displayAvatarURL()
        })
        .setImage(
            "https://cdn.discordapp.com/attachments/1316222710980022314/1326724329861550090/Tickets.png?ex=678077d1&is=677f2651&hm=5b0a2ee95a46ac7a7e9571bcfef8a4b24d5c89e50f085659d9d6df46c9cfb3b7&"
        )
        .setThumbnail(
            "https://cdn.discordapp.com/emojis/1075504085681311784.webp?size=96"
        );

    const components = [
        new ActionRowBuilder<ButtonBuilder>().addComponents([
            new ButtonBuilder()
                .setCustomId(ButtonsId.CreateTicket)
                .setEmoji(EmojisIds.Echo.GoldenTicket)
                .setLabel("Abrir Ticket")
                .setStyle(ButtonStyle.Secondary)
        ])
    ] as any;

    return { embed, components };
};

export const TicketsCreatedEmbed = async (Sharpy: Sharpy, id: string) => {
    const ticket = await Db.GetTicketById(Sharpy, id).catch(() => null);

    if (!ticket) {
        throw new Error("Ticket no encontrado.");
    }

    const authorId = ticket.authorId;
    const staffClaimed = ticket.staffIdClaimed;
    const resolution = ticket.resolution;

    let content = "";
    let embed: EmbedBuilder;
    const components: any[] = [];

    if (!resolution?.id) {
        // Ticket está abierto
        if (!staffClaimed) {
            // Caso: Ticket abierto pero no claimeado
            content = `<@${authorId}> espera a que un miembro del <@&${Config.DiscordBot.EchosOfTalent.roles.Staff}> te atienda.`;
            embed = new EmbedBuilder()
                .setAuthor({
                    name: "Ticket Creado",
                    iconURL: Sharpy.user!.displayAvatarURL()
                })
                .setColor("#5865f2")
                .setFields(
                    { name: "Asunto:", value: `\`${ticket.affaire}\``, inline: true },
                    { name: "Atendido por:", value: "Nadie aún.", inline: true },
                    { name: "Estado:", value: "En espera.", inline: true }
                )
                .setFooter({
                    text: "Gracias por tu paciencia",
                    iconURL: Sharpy.user!.displayAvatarURL()
                });

            components.push(
                new ActionRowBuilder<ButtonBuilder>().addComponents([
                    BtnCloseTicketUser.setDisabled(true),
                    BtnCloseTicketStaff.setDisabled(true),
                    BtnClaimTicket.setDisabled(false)
                ])
            );
        } else {
            // Caso: Ticket abierto y claimeado
            content = `<@${authorId}> tu ticket está siendo atendido por <@${staffClaimed}>.`;
            embed = new EmbedBuilder()
                .setAuthor({
                    name: "Ticket Claimeado",
                    iconURL: Sharpy.user!.displayAvatarURL()
                })
                .setColor("#5865f2")
                .setFields(
                    { name: "Asunto:", value: `\`${ticket.affaire}\``, inline: true },
                    { name: "Atendido por:", value: `<@${staffClaimed}>`, inline: true },
                    { name: "Estado:", value: "En proceso.", inline: true }
                )
                .setFooter({
                    text: "Gracias por tu paciencia",
                    iconURL: Sharpy.user!.displayAvatarURL()
                });

            components.push(
                new ActionRowBuilder<ButtonBuilder>().addComponents([
                    BtnCloseTicketUser.setDisabled(false),
                    BtnCloseTicketStaff.setDisabled(false),
                    BtnClaimed.setDisabled(true)
                ])
            );
        }
    } else {
        // Caso: Ticket cerrado
        const closedBy =
            resolution.staffId === authorId
                ? `<@${authorId}> (Usuario)`
                : `<@${resolution.staffId}> (Staff)`;
        content = `<@${authorId}> tu ticket ha sido cerrado.\n*El canal se cerrará en 30 segundos...*`;

        embed = new EmbedBuilder()
            .setAuthor({
                name: "Ticket Cerrado",
                iconURL: Sharpy.user!.displayAvatarURL()
            })
            .setColor("#ff0000")
            .setFields(
                { name: "Asunto:", value: `\`${ticket.affaire}\``, inline: true },
                { name: "Cerrado por:", value: closedBy, inline: true },
                {
                    name: "Motivo del cierre:",
                    value: resolution.reason || "Sin motivo especificado.",
                    inline: false
                }
            )
            .setFooter({
                text: "Gracias por usar el sistema de tickets",
                iconURL: Sharpy.user!.displayAvatarURL()
            });
        components.push(
            new ActionRowBuilder<ButtonBuilder>().addComponents([
                BtnCloseTicketUser.setDisabled(true),
                BtnCloseTicketStaff.setDisabled(true),
                BtnClaimed.setDisabled(true)
            ])
        );
    }

    return { content, embed, components };
};

const BtnCloseTicketUser = new ButtonBuilder()
    .setCustomId(ButtonsId.CloseTicket)
    .setEmoji(EmojisIds.Util.No)
    .setLabel("Cerrar Ticket (Usuario)")
    .setStyle(ButtonStyle.Danger);

const BtnCloseTicketStaff = new ButtonBuilder()
    .setCustomId(ButtonsId.StaffCloseTicket)
    .setEmoji("🔒")
    .setLabel("Cerrar Ticket (Staff)")
    .setStyle(ButtonStyle.Danger);

const BtnClaimTicket = new ButtonBuilder()
    .setCustomId(ButtonsId.ClaimTicket)
    .setEmoji("🔧")
    .setLabel("Atender Ticket")
    .setStyle(ButtonStyle.Primary);

const BtnClaimed = new ButtonBuilder()
    .setCustomId(ButtonsId.ClaimedTicket)
    .setEmoji(EmojisIds.Util.Yes)
    .setLabel("Ticket Atendido")
    .setStyle(ButtonStyle.Success);
