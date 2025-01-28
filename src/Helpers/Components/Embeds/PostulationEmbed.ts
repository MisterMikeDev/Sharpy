import { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } from "discord.js";
import { Sharpy } from "../../../Client";
import { Emojis } from "../../../Data/Emojis";

export const PostulationPartnersEmbed = ({ Sharpy }: { Sharpy: Sharpy }) => {
    const title = `${Emojis.Echo.GoldLeafLeft} POSTULACIONES PARTNERS ${Emojis.Echo.GoldLeafRight}`;
    const des = `# ${title}\nContesta el siguiente formulario para recibir tu solicitud como partner, si tu solicitud fue aceptada nos comunicaremos contigo para charlar. ${Emojis.Echo.GoldenShimmer}`;
    const color = "#e9c430";

    const embed = new EmbedBuilder()
        .setColor(color)
        .setDescription(des)
        .setImage(
            "https://cdn.discordapp.com/attachments/1316230104355180545/1332535566285275166/4.png?ex=67979634&is=679644b4&hm=7c1e676a79b0772d5cb9add580fd0f279e5205bf1bc4b2f3a0501c6ade8db605&"
        )
        .setFooter({
            text: "Echoes Of Talent | Postulaciones Partners",
            iconURL: Sharpy.user!.displayAvatarURL()
        });

    const components = [
        new ActionRowBuilder<ButtonBuilder>().addComponents(PostulationPartnersButton)
    ] as any;

    return { embed, components };
};

export const PostulationEventCreatorEmbed = ({ Sharpy }: { Sharpy: Sharpy }) => {
    const title = `${Emojis.Echo.GoldenShimmer} POSTULACIONES CREADOR DE EVENTOS ${Emojis.Echo.Megaphone}`;
    const description = `${Emojis.Echo.ArrowBlue} En este apartado puedes contestar nuestro formulario para enviar tu solicitud si deseas ser Creador de Eventos de Echoes Of Talent`;
    const requieranments = [
        "Tener experiencia en realización de anuncios o Flyers.",
        "Disponibilidad.",
        "Realizar un evento cada 3 semanas."
    ];
    const list = `***Nuestros requisitos mínimos son:***\n${requieranments.map((req) => `${Emojis.Echo.AnimatedArrowGreen} ${req}`).join("\n")}`;
    const color = "#550000";

    const des = `# ${title}\n${description}\n\n${list}`;

    const embed = new EmbedBuilder()
        .setColor(color)
        .setDescription(des)
        .setImage(
            "https://cdn.discordapp.com/attachments/1316230104355180545/1332550810810322964/3.png?ex=6797a466&is=679652e6&hm=0e6eac2b1555b56cff40116af725e6f51c742f360c9224954b929372e4912883&"
        )
        .setFooter({
            text: "Echoes Of Talent | Postulaciones Creador de Eventos",
            iconURL: Sharpy.user!.displayAvatarURL()
        });

    const components = [
        new ActionRowBuilder<ButtonBuilder>().addComponents(PostulationEventCreatorButton)
    ] as any;

    return { embed, components };
};

export const PostulationDesignerEmbed = ({ Sharpy }: { Sharpy: Sharpy }) => {
    const title = `${Emojis.Echo.PepeDrawing} POSTULACIONES DISEÑADORES ${Emojis.Echo.PinkNintendo}`;
    const description = `${Emojis.Echo.PrettyArrowR} En este apartado puedes contestar nuestro formulario para enviar tu solicitud si deseas ser Diseñador Oficial de Echoes Of Talent.`;
    const requieranments = [
        "Tener experiencia en diseño digital (Renders, Banners, icons, etc.)",
        "Disponibilidad de tiempo."
    ];
    const list = `***Nuestros requisitos mínimos son:***\n${requieranments.map((req) => `${Emojis.Echo.AnimatedArrowBlue} ${req}`).join("\n")}`;
    const color = "#550000";

    const des = `# ${title}\n${description}\n\n${list}`;

    const embed = new EmbedBuilder()
        .setColor(color)
        .setDescription(des)
        .setImage(
            "https://cdn.discordapp.com/attachments/1316230104355180545/1332550859527028807/2.png?ex=6797a472&is=679652f2&hm=0e14135dbea32fa12cb86d5a1b2aa146be2722f9625f15ef974e6ec3d84faa86&"
        )
        .setFooter({
            text: "Echoes Of Talent | Postulaciones Diseñadores",
            iconURL: Sharpy.user!.displayAvatarURL()
        });

    const components = [
        new ActionRowBuilder<ButtonBuilder>().addComponents(PostulationDesignerButton)
    ] as any;

    return { embed, components };
};

export const PostulationStaffEmbed = ({ Sharpy }: { Sharpy: Sharpy }) => {
    const title = `${Emojis.Echo.AdminHypeSquadPremium} POSTULACIONES STAFF ${Emojis.Echo.AdminHypeSquadPremium}`;
    const description = `${Emojis.Echo.Arrow} En este apartado puedes contestar nuestro formulario para enviar tu solicitud si deseas ser Staff de Echoes Of Talent`;
    const requieranments = [
        "+17 Edad.",
        "Disponibilidad.",
        "Experiencia en uso de comandos y moderación de servidores."
    ];
    const list = `***Nuestros requisitos mínimos son:***\n${requieranments.map((req) => `${Emojis.Echo.AnimatedArrowRed} ${req}`).join("\n")}`;
    const color = "#550000";

    const des = `# ${title}\n${description}\n\n${list}`;

    const embed = new EmbedBuilder()
        .setColor(color)
        .setDescription(des)
        .setImage(
            "https://cdn.discordapp.com/attachments/1316230104355180545/1332550898299306005/1.png?ex=6797a47b&is=679652fb&hm=63678b4eed81bb887cbdb74b4abdc43498291128518b70b2926044e45284aa04&"
        )
        .setFooter({
            text: "Echoes Of Talent | Postulaciones Staff",
            iconURL: Sharpy.user!.displayAvatarURL()
        });

    const components = [
        new ActionRowBuilder<ButtonBuilder>().addComponents(PostulationStaffButton)
    ] as any;

    return { embed, components };
};

export const PostulationMusicArtistEmbed = ({ Sharpy }: { Sharpy: Sharpy }) => {
    const title = `${Emojis.Echo.GoldenShimmer} POSTULACIONES ARTISTA MUSICAL ${Emojis.Echo.Microphone}`;
    const description = `${Emojis.Echo.AnimatedArrowPurple} **Responde nuestro formulario:** Postúlate para compartir tus obras y un miembro de nuestro Staff te responderá.\n${Emojis.Echo.AnimatedArrowPurple} **Presenta tu arte:** Usa el micrófono para presentarte y explicar tu arte (opcional, pero recomendado).`;
    const color = "#550000";

    const des = `# ${title}\n${description}`;

    const embed = new EmbedBuilder()
        .setColor(color)
        .setDescription(des)
        .setImage(
            "https://cdn.discordapp.com/attachments/1316230104355180545/1332550758347964488/Sin_titulo_700_x_500_px_1.png?ex=6797a45a&is=679652da&hm=db092b0a5e76cb6aef803745e24442174987871cb45c6de391b951c05ce4c39a&"
        )
        .setFooter({
            text: "Echoes Of Talent | Postulaciones Artista Musical",
            iconURL: Sharpy.user!.displayAvatarURL()
        });

    const components = [
        new ActionRowBuilder<ButtonBuilder>().addComponents(PostulationMusicArtistButton)
    ] as any;

    return { embed, components };
};

export const PostulationGraphicDesignerEmbed = ({ Sharpy }: { Sharpy: Sharpy }) => {
    const title = `${Emojis.Echo.GoldenShimmer} POSTULACIONES DISEÑADOR GRÁFICO ${Emojis.Echo.PrettyArrowR}`;
    const description = `${Emojis.Echo.AnimatedArrowBlue} **Responde nuestro formulario:** Postúlate para compartir tus obras y un miembro de nuestro Staff te responderá.\n${Emojis.Echo.AnimatedArrowBlue} **Presenta tu arte:** Usa el micrófono para presentarte y explicar tu arte (opcional, pero recomendado).`;
    const color = "#550000";

    const des = `# ${title}\n${description}`;

    const embed = new EmbedBuilder()
        .setColor(color)
        .setDescription(des)
        .setImage(
            "https://cdn.discordapp.com/attachments/1316230104355180545/1332550782486057021/5.png?ex=6797a460&is=679652e0&hm=f07c7e0af1e0db7c5ca08c5da92b5c17a9f58f860cecae7a256223c04119e31a&"
        )
        .setFooter({
            text: "Echoes Of Talent | Postulaciones Diseñador Gráfico",
            iconURL: Sharpy.user!.displayAvatarURL()
        });

    const components = [
        new ActionRowBuilder<ButtonBuilder>().addComponents(
            PostulationGraphicDesignerButton
        )
    ] as any;

    return { embed, components };
};

const PostulationPartnersButton = new ButtonBuilder()
    .setStyle(ButtonStyle.Link)
    .setLabel("Formulario de Partners")
    .setURL("https://forms.gle/sY3WQbkuWNgyjkAj8");
const PostulationEventCreatorButton = new ButtonBuilder()
    .setStyle(ButtonStyle.Link)
    .setLabel("Formulario de Creador de Eventoss")
    .setURL("https://forms.gle/6ZBBGr6jGCJ74c1T7");
const PostulationDesignerButton = new ButtonBuilder()
    .setStyle(ButtonStyle.Link)
    .setLabel("Formulario de Diseñador")
    .setURL("https://forms.gle/3xi6MGgSb9YwjZyk9");
const PostulationStaffButton = new ButtonBuilder()
    .setStyle(ButtonStyle.Link)
    .setLabel("Formulario de Staff")
    .setURL("https://forms.gle/ukCBGhLY6A91XVUSA");

const PostulationMusicArtistButton = new ButtonBuilder()
    .setStyle(ButtonStyle.Link)
    .setLabel("Formulario de Artista Musical")
    .setURL("https://forms.gle/p9jAMGdzbC3cTWD7A");
const PostulationGraphicDesignerButton = new ButtonBuilder()
    .setStyle(ButtonStyle.Link)
    .setLabel("Formulario de Diseñador Gráfico")
    .setURL("https://forms.gle/82Td2er6yQ77XosC7");
