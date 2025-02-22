import { ColorResolvable } from "discord.js";
import { Emojis } from "./Emojis";
import { Config } from "./Config";
import { ButtonsId } from "../Helpers";

const AGUAS_CON_LO_QUE_DICES_PENDEJO = "https://shorturl.at/TYR1V";

// Info para los embeds del server
export const InfoBooster = {
    title: `${Emojis.Echo.Impulso} Información de los Boosters ${Emojis.Echo.Impulso}`,
    description: `${Emojis.Echo.ArrowBlue} Valoramos muchísimo tu colaboración al servidor ${Emojis.Echo.Music_Note_1}\nGracias por ayudarnos de esta manera, y por esto mismo queremos darte beneficios como agradecimiento por apoyar a nuestra comunidad ${Emojis.Echo.Music_Note_2}`,
    image: "https://cdn.discordapp.com/attachments/1178199527212199978/1330766028623315034/LOGOS_ECHOES_OF_TALENT_3.gif?ex=67966c31&is=67951ab1&hm=e1e361c32bc9d555f8166ea07c1fac6573a2da3d94852922780be9dd73beb441&",
    color: "#b1049a" as ColorResolvable,
    info: [
        {
            title: "Beneficios para 1er Boost:",
            prefix: `${Emojis.Echo.AnimatedArrowWhite} `,
            benefits: [
                "Se te asignará un rol <@&1307762166127923263>.",
                `Estarás más arriba que los demás en la lista de miembros. ${Emojis.Echo.GatoHappyMeme}`,
                `Podrás __cambiar tu apodo__ en el servidor. ${Emojis.Echo.ToothlessDance}`,
                `Tendrás la opción de utilizar un rol personalizado con tu color favorito. ${Emojis.Echo.AnimateCat}`,
                `Gracias a que nos apoyaste, tendrás un duplicador de experiencia del \`25%\` en los niveles del servidor. ${Emojis.Echo.ScottPilgrimRock}`
            ]
        },
        {
            title: "Beneficios para 2do Boost:",
            prefix: `${Emojis.Echo.AnimatedArrowBlue} `,
            benefits: [
                "Se te asignará un rol <@&1316791399156285572>.",
                `Tu nombre aparecerá más arriba que los usuarios con 1 Booster. ${Emojis.Echo.NitroBoost}`,
                `Tendrás __5 entradas extra__ para los sorteos del servidor. ${Emojis.Echo.MexicanCat}`,
                "Tu voto valdrá el **doble** al momento de saltar el turno de los demás usuarios en nuestro bot exclusivo de karaoke <@1316232484991533066>.",
                `Gracias a tu apoyo al servidor, tendrás un duplicador de experiencia del \`50%\` en los niveles del servidor. ${Emojis.Echo.Clapping}`
            ]
        }
    ]
};
/* eslint-disable quotes */

// Reglas del servidor
export const Rules = {
    title: `${Emojis.Echo.GoldenShimmer} ${Emojis.Echo.GoldLeafLeft} Reglas del Servidor ${Emojis.Echo.GoldLeafLeft} ${Emojis.Echo.GoldenShimmer}`,
    image: "https://cdn.discordapp.com/attachments/1316222710980022314/1326698662625022064/darules_20250108101317.png?ex=67805fea&is=677f0e6a&hm=3ef1a26faac394e491ee07a2bf8b9213a9b2d4b2f0c770e3f1ab7ab78c1336de&",
    color: "#550000" as ColorResolvable,
    emojiNumbers: {
        $0$: Emojis.Echo.MinecraftGoldZero,
        $1$: Emojis.Echo.MinecraftGoldOne,
        $2$: Emojis.Echo.MinecraftGoldTwo,
        $3$: Emojis.Echo.MinecraftGoldThree,
        $4$: Emojis.Echo.MinecraftGoldFour,
        $5$: Emojis.Echo.MinecraftGoldFive,
        $6$: Emojis.Echo.MinecraftGoldSix,
        $7$: Emojis.Echo.MinecraftGoldSeven,
        $8$: Emojis.Echo.MinecraftGoldEight,
        $9$: Emojis.Echo.MinecraftGoldNine
    },
    rules: [
        {
            title: `${Emojis.Echo.Alert} **Reglas Generales:**`,
            prefix: `${Emojis.Echo.AnimatedArrowWhite} `,
            rules: [
                "**Seguro para todos:**\nTodos son bienvenidos en este servidor. Todos deben sentirse seguros aquí, así que cualquier contenido inapropiado (Contenido +18, violento, o platicas inapropiadas o enlaces externos) no va a ser tolerado en ninguna circunstancia.",
                '**Respeto:**\nTrata bien a los demás, no se va a soportar a nadie con una actitud tóxica o abusiva (Insultos, acoso, burlas o comentarios discriminatorios). Este discord es para pasar un buen rato y compartir música. No hay porque ser malos con las demás personas. *(El staff, los mods y los fundadores también son personas y tienen su corazoncito, cuídalo)*\n"Trata a los demás como quieras ser tratado" - Mi mamá',
                "**No hay debate:**\nEste no es un servidor de política ni de ideologías, todos podemos tener nuestras propias opiniones, pero no por eso tenemos que compartirlas. No vamos a aceptar comentarios discriminatorios de ninguna clase. No hablamos ni juzgamos ni política, ni religión, ideología o fanatismos.",
                "**Es sobre música:**\nLa temática del servidor es clara, hay muchos canales para hablar de distintos temas, si no encuentras un canal para compartir lo que quieres, hay bastantes servers que pueden tener esa temática en especial, este no.",
                `**Spam y promoción:**\nLas promociones son exclusivamente en los canales de <#${Config.DiscordBot.EchoesOfTalent.channels.Perfiles}> y <#${Config.DiscordBot.EchoesOfTalent.channels.MaterialMusical}>. Promociones o spam fuera de estos canales, será eliminada. No lo hagas, te van a regañar. Esta regla también va para el spam en general (mandar varias veces le mismo mensaje o etiquetar a la misma persona).`,
                `**Acoso:**\nCualquier forma de acoso no será tolerada. Compartir información personal de alguien más, hostigar por mensaje a moderadores o usuarios, difundir falsa información, cualquier cosa que haga a otra persona sentir incomoda no esta bien y no será permitido. ${Emojis.Echo.M9deomk9}`
            ]
        },
        {
            title: `${Emojis.Echo.Alert} **Reglas de Karaoke:**`,
            prefix: `${Emojis.Echo.AnimatedArrowWhite} `,
            rules: [
                `**Espera tu turno:**\nYa sabemos que quieres cantar, pero ten paciencia. Todos quieren compartir su talento y para hacerlo de forma ordenada, tenemos una lista de espera para para hacerlo. ${Emojis.Echo.V2tumxa}\n*Usando el comando \`/karaoke\` puedes ver lista de comandos para el bot de karaoke.*`,
                "**No interrumpas:**\nCuando alguien mas este cantando, ten respeto y silencia tu micrófono. Está feo que te interrumpan ya sea con comentarios o con ruidos externos. También cualquier troleo, o intento de sabotaje a la presentación de alguien tendrá castigo...Un castigo feo.",
                `**No abuses del bot:**\n<@${Config.DiscordBot.Client}> nació para ayudarnos a usar el karaoke de forma ordenada y con respeto. Su mal uso de cualquier forma será sancionado con severidad. Quiérelo, ámalo, es tu amigo, es nuestro amigo. ${Emojis.Echo.EvliPray}\n*Nota del dev: abusar del bot puede resultar en un **Blacklisteo** de mi bot y ni los Founders te van a poder ayudar, asi que ||[aguas con lo que haces pendejo](${AGUAS_CON_LO_QUE_DICES_PENDEJO})||.*`,
                "**Aplaude el esfuerzo:**\nCantar no es fácil, y lo sabemos. Reconoce el esfuerzo de las personas y no seas grosero. Si tu critica o tu opinión no es pedida, no la des. *(Y si la piden, no seas grosero, te estamos vigilando)*"
            ]
        }
    ],
    footer: `${Emojis.Echo.PrettyStars} ¡Gracias por contribuir a crear un espacio divertido y acogedor para todos! ${Emojis.Echo.PrettyStars}`
};

// Reglas de staff
export const StaffRules = {
    title: `${Emojis.Echo.ArrowBlue} Reglas del Staff`,
    description: `${Emojis.Echo.AnimatedArrowRed} **Sé un ejemplo:** Mantén siempre una actitud respetuosa, amable y profesional con los usuarios y con los miembros del <@&1317319643043725383>  ${Emojis.Echo.HyperSquadAdmin}`,
    image: "https://cdn.discordapp.com/attachments/1178199527212199978/1330719818730704906/Reglas_Staff_700_x_500_px.png?ex=678f00e8&is=678daf68&hm=bee7b9d90cb5200942f91c48abc2a1268af3401a9377c4347e0e703b771afb9c&",
    color: "#550000" as ColorResolvable,
    rules: [
        {
            title: `${Emojis.Echo.Alert} **Warn/ Ban/ mute:** Cada sanción tiene que ser seria y con una razón.`,
            prefix: `${Emojis.Echo.AnimatedArrowRed} `,
            rules: [
                "**Baneo permanente:** Contenido NSFW, CP, Gore, filtrar información de otros miembros (Doxeo o divulgar información personal), grooming, pedofilia y acoso.",
                "**Baneo temporal:** Discriminación y difamación que afecte la dignidad y falta de respeto a un usuario.",
                "**3 warns a un usuario implica el baneo temporal a los usuarios.**"
            ]
        },
        {
            title: `${Emojis.Echo.Alert} Warns: Faltas de respeto, usar indevidamente los canales de voice chat y texto, molestar a usuarios por texto o voice chat.`,
            prefix: `${Emojis.Echo.AnimatedArrowRed} `,
            rules: [
                "**Modera con justicia:** Actúa de friamente calculada y neutral al resolver conflictos.",
                "**Ayuda a todos:** Los staffs deben ayudar en la organización y coordinación de eventos y dinámicas. Ayuda a los usuarios, que requieran información sobre el servidor, asi como los miembros nuevos del staff.",
                "**Chat Staff:** Usa los canales de staff para coordinar acciones y reportar incidencias.",
                "**Escucha:** Atiende sugerencias, tickets, dudas y quejas.",

                '**No abuses tu poder:** Usa tus permisos solo para moderar o mejorar la experiencia del servidor. *- "Un gran poder conlleva una gran responsabilidad"*',
                "**Promueve la igualdad:** Trata a todos los miembros por igual, valorando su participación sin favoritismos."
            ]
        }
    ],
    footer: `${Emojis.Echo.PrettyStars} ¡Gracias por contribuir a crear un espacio divertido y acogedor para todos! ${Emojis.Echo.ScottPilgrimRock}`
};
/* eslint-enable quotes */

// Bienvenida de los usuarios
export const WelcomeInfo = {
    title: `${Emojis.Echo.ArrowBlue} BIENVENIDO A ECHOES OF TALENT ${Emojis.Echo.ScottPilgrimRock}`,
    description: `${Emojis.Echo.PrettyArrowR} Somos una comunidad dedicada al canto y el arte. Esperamos que te la pases muy lindo con nosotros.`,
    color: "#550000" as ColorResolvable,
    image: "https://media.discordapp.net/attachments/1317010464189710366/1317010835591401533/3rc8fdy.png?ex=676461ac&is=6763102c&hm=d7a5ab13ba57700f49fe24d9ba5d244bce9da081c6a24efec1753d454db80508&format=webp&quality=lossless&width=2160&height=982&",
    thumbnail:
        "https://media.discordapp.net/attachments/1313715864511709184/1316216984458887291/ECHOES_1.gif?ex=67642157&is=6762cfd7&hm=bb5a549ab3d85289dace1d0e1687ca8e1cd1cea4eb08b24a389c5e4693bb549f&=&width=449&height=449",
    info: {
        prefix: `${Emojis.Echo.AnimatedArrowBlue} `,
        i: [
            `Puedes unirte a KARAOKE 𝄞⨾𓍢ִ໋ para cantar en vivo y disfrutar de un ambiente divertido. ${Emojis.Echo.Music_Note_1}`,
            `Pásate a <#${Config.DiscordBot.EchoesOfTalent.channels.Anuncios}> para enterarte de concursos y eventos. Demuestra tu talento y gana premios. ${Emojis.Echo.Trophy}`,
            `Nos interesa que revises las <#${Config.DiscordBot.EchoesOfTalent.channels.Rules}> para mantenerte al tanto de nuestras normas. ${Emojis.Echo.DaRules}`,
            `¡Personalizate! entra a <#${Config.DiscordBot.EchoesOfTalent.channels.AutoRoles}> y <#${Config.DiscordBot.EchoesOfTalent.channels.Presentacion}> para conocer tus gustos y más sobre ti. ${Emojis.Echo.AnimateCat}`,
            `¡Ponte cómodo ${Emojis.Echo.Chillguy} agarra el micrófono y deja que la música fluya! Si tienes alguna queja o reporte, no dudes en contactar a nuestro equipo en <#${Config.DiscordBot.EchoesOfTalent.channels.Tickets}>`
        ]
    },

    footer: `${Emojis.Echo.Music_Note_2} ¡Que comience el show! ${Emojis.Echo.MexicanCat}`
};

// Info para el embed de Partners
export const PartersInfo = {
    title: `${Emojis.Echo.GoldLeafLeft} BENEFICIOS DE PARTNERS ECHOES OF TALENT ${Emojis.Echo.GoldLeafRight}`,
    description: `*Convertirte en **Partner** de nuestro servidor trae consigo ventajas exclusivas diseñadas para maximizar tu experiencia, aumentar tu visibilidad y conectar con una comunidad comprometida con tus mismos intereses.* ${Emojis.Echo.GoldenShimmer}`,
    line: "–".repeat(68),
    color: "#e9c430" as ColorResolvable,
    image: "https://cdn.discordapp.com/attachments/1318421562319175711/1324259905334542447/image.png?ex=678163e4&is=67801264&hm=479738cfbed2f3b88af097069b07f7fb5b6c81ef72fa55952c1785f2f71de6f2&",
    emojiNumbers: {
        $0$: Emojis.Echo.MinecraftGoldZero,
        $1$: Emojis.Echo.MinecraftGoldOne,
        $2$: Emojis.Echo.MinecraftGoldTwo,
        $3$: Emojis.Echo.MinecraftGoldThree,
        $4$: Emojis.Echo.MinecraftGoldFour,
        $5$: Emojis.Echo.MinecraftGoldFive,
        $6$: Emojis.Echo.MinecraftGoldSix,
        $7$: Emojis.Echo.MinecraftGoldSeven,
        $8$: Emojis.Echo.MinecraftGoldEight,
        $9$: Emojis.Echo.MinecraftGoldNine
    },
    prefix: `${Emojis.Echo.PurpleArrow} `,
    info: [
        {
            title: `**Promoción y Visibilidad Exclusiva** ${Emojis.Echo.PrettyStars}`,
            data: [
                "**Rol de Partner Especial:** Tu nombre resaltará con un rol exclusivo y un color único en el servidor, garantizando que siempre seas visible para la comunidad.",
                "**Destacados en Anuncios:** Tu contenido, proyectos o eventos serán promocionados en los canales de anuncios principales del servidor.",
                "**Certificación de Partner:** Reconocimiento oficial como Partner del servidor, lo que aumenta tu credibilidad dentro y fuera de la comunidad.",
                "**Premios o logros especiales:** Posibilidad de recibir premios, medallas o menciones en los eventos destacados del servidor.",
                "**Recomendaciones:** Si tienes un proyecto o servicio, serás recomendado dentro de la comunidad como un recurso confiable y destacado."
            ]
        },
        {
            title: `**Acceso a Canales y Eventos Exclusivos.** ${Emojis.Echo.GatoHappyMeme}`,
            data: [
                "**Canales Privados:** Tendrás acceso a áreas reservadas solo para Partners, colaboraciones y conversaciones de alto nivel.",
                "**Eventos especiales:** Participación en eventos exclusivos para Partners, como sesiones de mentoring y paneles de discusión.",
                "**Promoción en eventos del servidor:** Si organizas eventos o lanzamientos, la comunidad apoyará con difusión y participación activa."
            ]
        },
        {
            title: `Oportunidades de Crecimiento ${Emojis.Echo.Chillguy}`,
            data: [
                "**Colaboraciones:** Conecta con otros Partners y colaboradores.",
                "**Colaboraciones personalizadas:** Oportunidad de trabajar junto a otros Partners en proyectos conjuntos o iniciativas del servidor.",
                "**Feedback y mejora:** Recibe retroalimentación de calidad sobre tus proyectos o servicios por parte de otros miembros destacados o de otros partners."
            ]
        },
        {
            title: `Herramientas y Recursos Exclusivos ${Emojis.Echo.ToothlessDance}`,
            data: [
                "**Acceso prioritario a recursos:** Obtendrás acceso temprano a guías, manuales, herramientas o materiales creados por la comunidad.",
                "**Soporte dedicado:** Atención personalizada por parte del equipo de moderación para resolver dudas, organizar eventos o facilitar colaboraciones.",
                "**Plataformas de difusión:** Tu contenido puede ser destacado en nuestras redes sociales u otras plataformas externas asociadas al servidor."
            ]
        }
    ]
};

// Info para el embed de Artistas Musicales
export const MusicArtistsInfo = {
    title: `${Emojis.Echo.TGNewsEmoji} ARTISTAS MUSICALES ${Emojis.Echo.TGNewsEmoji}`,
    description: `${Emojis.Echo.PrettyArrowR} ¡Bienvenido al canal de texto dedicado a compartir y escuchar material original. Nuestro objetivo es crear un espacio donde artistas emergentes en el ámbito musical puedan **Mostrar su talento, mejorar juntos y encontrar apoyo**. ${Emojis.Echo.Clapping}`,
    color: "#550000" as ColorResolvable,
    image: "https://media.discordapp.net/attachments/1316230104355180545/1339054996628439140/image.png?ex=67ad53a5&is=67ac0225&hm=119acb5cad9ec83bc1d9f7810cd0c4d0765e81c77ce0e55f9149e0a1615360b0&=&format=webp&quality=lossless&width=1376&height=625",
    sections: [
        {
            title: `¿Qué puedes hacer aquí? ${Emojis.Echo.HmmmBaby}`,
            prefix: `${Emojis.Echo.AnimatedArrowYellow} `,
            list: [
                "**Presentar tus obras originales:** Sube tus canciones, beats, o demos y compártelos en tiempo real con la comunidad.",
                "**Recibir retroalimentación:** Pide opiniones constructivas y consejos para mejorar tu obra.",
                "**Inspirarte:** Conoce el trabajo de otros artistas y encuentra nuevas ideas para tus proyectos.",
                "**Conectar:** Establece contactos con otros músicos, productores y cantantes interesados en colaborar o intercambiar ideas."
            ]
        },
        {
            title: `Reglas del canal ${Emojis.Echo.DaRules}`,
            prefix: `${Emojis.Echo.AnimatedArrowGreen} `,
            list: [
                `**Material original solamente:** Comparte únicamente tus creaciones. No subas contenido de terceros sin permiso ni material con derechos de autor. ${Emojis.Echo.CatShhh}`,
                `**Retroalimentación constructiva:** Evita críticas destructivas o comentarios negativos. Comparte tus opiniones de manera respetuosa y útil. ${Emojis.Echo.Smile}`,
                `**No abuses:** Este canal no es para autopromoción excesiva ni enlaces externos sin contexto. ${Emojis.Echo.M9deomk9}`
            ]
        },
        {
            title: `¿Qué beneficios obtengo? ${Emojis.Echo.ScottPilgrimRock}`,
            prefix: `${Emojis.Echo.AnimatedArrowBlue} `,
            list: [
                `**Rol exclusivo:** Recibirás el rol de <@&${Config.DiscordBot.EchoesOfTalent.roles.ArtistaMusical}> para destacar tu perfil en el servidor. ${Emojis.Echo.TGNewsEmoji}`,
                `**Promoción sin restricciones:** Podrás hacer **spam** de tus obras originales en el canal de <#${Config.DiscordBot.EchoesOfTalent.channels.MaterialMusical}>. ${Emojis.Echo.VinylRecord}`,
                `**Concierto especial:** Tendrás la opción de organizar un **evento especial** para presentar tus obras originales. Contácta a un <@&${Config.DiscordBot.EchoesOfTalent.roles.Supervisor}> para coordinar tu presentación. ${Emojis.Echo.GatoHappyMeme}`
            ]
        }
    ],
    footer: `## ${Emojis.Echo.Arrow} ${Emojis.Echo.Alert} **IMPORTANTE** ${Emojis.Echo.Alert}\n ${Emojis.Echo.Warning} **NO, nos haremos cargo si tú obra es plagiada, asegurate que tus canciones estén registradas para compartir tú música de manera segura con nosotros y los demás.** ${Emojis.Echo.Warning}`
};

// Info para el embed de Artistas Gráficos
export const GraphicArtistsInfo = {
    title: `${Emojis.Echo.PepeDrawing} ARTISTAS GRÁFICOS ${Emojis.Echo.ADrawing}`,
    description: `${Emojis.Echo.PrettyArrowR} ¡Bienvenido al canal de texto dedicado a compartir y escuchar material original. Nuestro objetivo es crear un espacio donde artistas emergentes en el ámbito gráfico/dibujo y puedan **Mostrar su talento, mejorar juntos y encontrar apoyo**. ${Emojis.Echo.Clapping}`,
    color: "#550000" as ColorResolvable,
    image: "https://media.discordapp.net/attachments/1316230104355180545/1339054856681295973/image.png?ex=67ad5384&is=67ac0204&hm=681d3951abcb31dc5a1e863a535d9c3445c4f42462d602026ac008690e6cf958&=&format=webp&quality=lossless&width=1376&height=625",
    sections: [
        {
            title: `¿Qué puedes hacer aquí? ${Emojis.Echo.HmmmBaby}`,
            prefix: `${Emojis.Echo.AnimatedArrowYellow} `,
            list: [
                "**Presentar tus obras originales:** Sube tus dibujos, renders, o pinturas y compártelos en tiempo real con la comunidad.",
                "**Recibir retroalimentación:** Pide opiniones constructivas y consejos para mejorar tu obra.",
                "**Inspirarte:** Conoce el trabajo de otros artistas y encuentra nuevas ideas para tus proyectos.",
                "**Conectar:** Establece contactos con otros músicos, productores y cantantes interesados en colaborar o intercambiar ideas."
            ]
        },
        {
            title: `Reglas del canal ${Emojis.Echo.DaRules}`,
            prefix: `${Emojis.Echo.AnimatedArrowGreen} `,
            list: [
                `**Material original solamente:** Comparte únicamente tus creaciones. No subas contenido de terceros sin permiso ni material con derechos de autor. ${Emojis.Echo.CatShhh}`,
                `**Retroalimentación constructiva:** Evita críticas destructivas o comentarios negativos. Comparte tus opiniones de manera respetuosa y útil. ${Emojis.Echo.Smile}`,
                `**No abuses:** Este canal no es para autopromoción excesiva ni enlaces externos sin contexto. ${Emojis.Echo.M9deomk9}`
            ]
        },
        {
            title: `¿Qué beneficios obtengo? ${Emojis.Echo.ScottPilgrimRock}`,
            prefix: `${Emojis.Echo.AnimatedArrowBlue} `,
            list: [
                `**Rol exclusivo:** Recibirás el rol de <@&${Config.DiscordBot.EchoesOfTalent.roles.ArtistaGrafico}> para destacar tu perfil en el servidor. ${Emojis.Echo.TGNewsEmoji}`,
                `**Promoción sin restricciones:** Podrás hacer **spam** de tus obras originales en el canal de <#${Config.DiscordBot.EchoesOfTalent.channels.MaterialGrafico}>. ${Emojis.Echo.VinylRecord}`,
                `**Haz un evento especial:** Tendrás la opción de organizar un **Evento o Podcast de arte** para presentar tus obras originales. Contácta a un <@&${Config.DiscordBot.EchoesOfTalent.roles.Supervisor}> para coordinar tu presentación. ${Emojis.Echo.GatoHappyMeme}`
            ]
        }
    ],
    footer: `## ${Emojis.Echo.Arrow} ${Emojis.Echo.Alert} **IMPORTANTE** ${Emojis.Echo.Alert}\n ${Emojis.Echo.Warning} **NO, nos haremos cargo si tú obra es plagiada, asegurate que tus canciones estén registradas para compartir tú música de manera segura con nosotros y los demás.** ${Emojis.Echo.Warning}`
};

// Info para el embed de los Critérios de Postulación
export const ApplicationCriteriaInfo = {
    title: `${Emojis.Echo.ArrowBlue} CRITERIOS DE POSTULACIÓN`,
    description: `${Emojis.Echo.PrettyArrowR} **¡Gracias por tu interés en unirte a nuestro equipo!** A continuación, te presentamos los criterios que consideramos para evaluar las postulaciones. ${Emojis.Echo.ScottPilgrimRock}`,
    color: "#550000" as ColorResolvable,
    image: "https://cdn.discordapp.com/attachments/1178199527212199978/1330760030009692242/Reglas_Staff_700_x_500_px_2.png?ex=6797b81b&is=6796669b&hm=a76d1a68fabe37a9471a11b580218748bb056786abb6182c5e35a9f4f410e530&",
    sections: [
        {
            title: `CRITERIOS DE STAFF ${Emojis.Echo.HyperSquadAdmin}`,
            prefix: `${Emojis.Echo.AnimatedArrowYellow} `,
            list: [
                "¿Tienes experiencia previa como moderador o en un rol de staff en Discord u otras plataformas?",
                "¿Cómo manejarías una situación en la que un usuario rompe las reglas del servidor?",
                "¿Por qué te gustaría ser parte del staff en este servidor?",
                "¿Cómo te desempeñas trabajando en equipo?",
                "¿Cómo contribuirías al servidor desde tu puesto como staff?"
            ]
        },
        {
            title: `CRITERIOS DE DISEÑADOR ${Emojis.Echo.PinkNintendo}`,
            prefix: `${Emojis.Echo.AnimatedArrowYellow} `,
            list: [
                "¿Cómo defines la estética de los diseños del servidor?",
                "¿Cómo defines tu estilo de dibujo/diseño?",
                "¿Por qué te gustaría formar parte del equipo de diseño?",
                "¿Qué tan bueno eres trabajando en equipo?",
                "¿Cuáles son los recursos que cuentas para hacer tus diseños? *(tableta, programas, etc.)*"
            ]
        },
        {
            title: `CRITERIOS DE CREADOR DE EVENTOS ${Emojis.Echo.Announce}`,
            prefix: `${Emojis.Echo.AnimatedArrowYellow} `,
            list: [
                `¿Por qué te interesa postularte para <@&${Config.DiscordBot.EchoesOfTalent.roles.CreadorDeEventos}>?`,
                "¿Como sería la forma en que le darías alcance a tu evento?",
                "En base a la pregunta del formulario ''Propón un evento original que te gustaría organizar en el servidor'' Explícanos a detalle sobre este evento hipotético y como lo llevarás a cabo.",
                "¿Cómo manejarías a los participantes en caso de un conflicto durante un evento?",
                "¿Como evaluarías tus habilidades de comunicación oral?",
                "¿Qué tan bueno eres trabajando en equipo?"
            ]
        },
        {
            title: `CRITERIOS DE ARTISTA MUSICAL ${Emojis.Echo.VinylRecord}`,
            prefix: `${Emojis.Echo.AnimatedArrowYellow} `,
            list: [
                `¿Por qué te gustaría ser <@&${Config.DiscordBot.EchoesOfTalent.roles.ArtistaEmergente}> de **Echoes Of Talent**?`,
                "¿Tienes registradas tus canciones? Y ¿Hay manera de comprobar de que tus canciones son tuyas?",
                "¿Qué intenciones tienes con ser Artista Emergente de **Echoes Of Talent**?",
                "Como Artista Emergente tienes la posibilidad de realizar un Evento/Concierto de tus obras, ¿Estás dispuesto/a a hacer algo así dentro de la comunidad?"
            ]
        },
        {
            title: `CRITERIOS DE ARTISTA GRÁFICO ${Emojis.Echo.PepeDrawing}`,
            prefix: `${Emojis.Echo.AnimatedArrowYellow} `,
            list: [
                `¿Por qué te gustaría ser <@&${Config.DiscordBot.EchoesOfTalent.roles.ArtistaGrafico}> de **Echoes Of Talent**?`,
                "¿Tienes marcas de agua o registradas tus obras? Y ¿Hay manera de comprobar de que son tuyas?",
                "¿Qué intenciones tienes con ser Artista Gráfico de **Echoes Of Talent**?",
                "Como Artista Gráfico tienes la posibilidad de realizar un Evento/Podcast o galería de arte de tus obras, ¿Estás dispuesto/a a hacer algo así dentro de la comunidad?"
            ]
        }
    ]
};

// Info para el embed de Manual de Jurado
export const ManualJuradoInfo = {
    title: `JURADOS ${Emojis.Echo.Judge}`,
    description: `${Emojis.Echo.Arrow} Por cada evento solo contará con 3 personas como jurado y cada juez debe de cumplir con los siguientes requisitos:`,
    color: "#550000" as ColorResolvable,
    prefix: `${Emojis.Echo.AnimatedArrowYellow} `,
    list: [
        "Experiencia y conocimiento musical [Teoría musical o Técnica vocal].",
        "Desenvolvimiento y fluidez al explicar puntos de vista críticos.",
        "Tener sentido crítico y realizar opiniones constructivas fundamentadas."
    ],
    note: `${Emojis.Echo.BlueWarning} Los jueces tendrán un feedback de 35 segundos máximo por juez, para cada participante. Durante el evento deberán utilizar un cronómetro para respetar el tiempo de cada jurado y el rol de feedback, es decir los jueces deberán hablar en orden, sin interrumpir a ninguno, estableciendo una lista para el turno de cada juez, este mismo orden se puede intercambiar durante el evento siempre y cuando se respete sus turnos. ${Emojis.Echo.AlarmClock}\n\n*Durante el evento los jueces deberán colocar sus calificaciones en la hoja de cálculo de excel y calificar a los concursantes.*`,
    points: {
        title: `${Emojis.Echo.ArrowBlue} **LOS PUNTOS A CALIFICAR SON:**`,
        prefix: `${Emojis.Echo.AnimatedArrowRed} `,
        list: [
            "**DICCIÓN:** Claridad adecuada en las palabras.",
            "**TÉCNICA:** Control de la respiración, emisión, resonancia y afinación.",
            "**ENTONACIÓN:** Alcanzar la tonalidad correcta y armoniosa al interpretar."
        ]
    },
    footer: "*Al tener las calificaciones completas los Jueces subirán los resultados para anunciar a los ganadores de la primera fase.*"
};

// Info para el embed de Reglas de Karaoke
export const InfoRockola = {
    title: `.⋆${Emojis.Echo.VinylRecord} INFO ROCKOLA ${Emojis.Echo.VinylRecord}⋆.`,
    description: `Aquí podrás conseguir toda la información sobre cómo escuchar música con cualquier bot de tu preferencia. ${Emojis.Echo.Announce}`,
    color: "#550000" as ColorResolvable,
    image: "",
    prefix: `${Emojis.Echo.Arrow} `,
    note: `${Emojis.Echo.Warning} Tanto los Jockies como <@810540985032900648> tienen soporte a SlashComands, por lo que puedes usar \`/play\`.`,
    list: [
        {
            title: "<@411916947773587456> `( m! )`",
            prefix: `${Emojis.Echo.AnimatedArrowYellow} `,
            commands: [
                "**m!play** `<nombre o link de la música>`",
                "**m!autoplay** *(Reproduce canciones automáticamente)*",
                "**m!skip** *(Salta una canción)*",
                "**m!stop** *(Detiene la canción y saca el bot)*"
            ]
        },
        {
            title: "<@810540985032900648> `( + )` o `( / )`",
            prefix: `${Emojis.Echo.AnimatedArrowGreen} `,
            commands: [
                "**+play** `<nombre o link de la música>`",
                "**+skip** *(Salta una canción)*",
                "**+pause** *(Pausa la canción)*",
                "**+stop** *(Detiene la canción y saca el bot)*"
            ]
        },
        {
            title: "<@339926969548275722> `( / )`",
            prefix: `${Emojis.Echo.AnimatedArrowPurple} `,
            commands: [
                "**/play** `<nombre o link de la música>`",
                "**/skip** *(Salta una canción)*",
                "**/pause** *(Pausa la canción)*",
                "**/stop** *(Detiene la canción y saca el bot)*"
            ]
        },
        {
            title: "<@944016826751389717> `( / )`",
            prefix: `${Emojis.Echo.AnimatedArrowRed} `,
            commands: [
                "**/play** `<nombre o link de la música>`",
                "**/skip** *(Salta una canción)*",
                "**/pause** *(Pausa la canción)*",
                "**/stop** *(Detiene la canción y saca el bot)*"
            ]
        }
    ]
};

// Info para el embed de Sharpy
export const SharpyInfoData = {
    title: `# ${Emojis.Util.Bot} Presentación de Sharpy ${Emojis.Echo.VinylRecord}`,
    description: `¡Hola! Soy **Sharpy**, un bot de Discord diseñado exclusivamente para **Echoes Of Talent**, una comunidad dedicada a la música y el talento vocal. Creado por <@${Config.DiscordBot.IdAuthor}>, Sharpy no solo ofrece herramientas esenciales para la administración, sino también dinámicas únicas que enriquecen la experiencia musical y social en el servidor.`,
    color: "#550000" as ColorResolvable,
    emojiNumbers: {
        $0$: Emojis.Echo.MinecraftGoldZero,
        $1$: Emojis.Echo.MinecraftGoldOne,
        $2$: Emojis.Echo.MinecraftGoldTwo,
        $3$: Emojis.Echo.MinecraftGoldThree,
        $4$: Emojis.Echo.MinecraftGoldFour,
        $5$: Emojis.Echo.MinecraftGoldFive,
        $6$: Emojis.Echo.MinecraftGoldSix,
        $7$: Emojis.Echo.MinecraftGoldSeven
    },
    sections: [
        {
            title: "¿Qué puede hacer Sharpy?",
            prefix: `${Emojis.Echo.ArrowBlue} `,
            fields: [
                {
                    name: "Sistemas básicos para la comunidad",
                    prefix: `${Emojis.Echo.AnimatedArrowPurple} `,
                    values: [
                        "**Bienvenidas y despedidas** personalizadas para nuevos miembros.",
                        "**Autoroles** para asignar roles automáticamente.",
                        "**Gestión de tickets** para un soporte eficiente.",
                        "**Automod** para mantener el orden de manera automática.",
                        "**Comandos de moderación**, como ban, kick, mute, entre otros."
                    ]
                },
                {
                    name: "Herramientas para el staff",
                    prefix: `${Emojis.Echo.AnimatedArrowYellow} `,
                    values: [
                        "**Creación de embeds personalizados**, ideales para anuncios y presentaciones.",
                        "**Detención de spam** para evitar la saturación de mensajes.",
                        "**Sistema de advertencias** para moderar el comportamiento de los usuarios.",
                        "**Sistema de sanciones** para aplicar medidas disciplinarias.",
                        "**Sistema de logs** para registrar las acciones del servidor."
                    ]
                },
                {
                    name: "Dinámicas exclusivas de karaoke",
                    prefix: `${Emojis.Echo.AnimatedArrowGreen} `,
                    values: [
                        "**Lista de turnos (Queue)**: Organiza los turnos para cantar de manera ordenada y sin conflictos.",
                        "**Sistema de duelos**: Dos participantes se enfrentan y la comunidad vota por el ganador.",
                        "**Sistema de réplicas**: De 2 a 4 personas se enfrentan en turnos, y al final se realiza una votación para decidir al ganador."
                    ]
                }
            ]
        },
        {
            title: "Reglas para el uso de Sharpy",
            prefix: `${Emojis.Echo.Arrow} `,
            fields: [
                {
                    name: "Para garantizar que Sharpy funcione correctamente y mantener la armonía en **Echoes Of Talent**, te pedimos seguir estas reglas:",
                    prefix: `${Emojis.Echo.AnimatedArrowRed} `,
                    values: [
                        "**No abuses de los bugs**: Si encuentras algún error en el bot, repórtalo utilizando el comando **`/dev report`**.",
                        "**Evita el spam de comandos**: Usa los comandos de manera responsable para no saturar el bot o el chat.",
                        "**Respeta las dinámicas**: Sigue las instrucciones para las listas, duelos y réplicas, y evita sabotear la experiencia de otros usuarios.",
                        "**Uso exclusivo para Echoes Of Talent**: Sharpy es un bot privado diseñado específicamente para esta comunidad. *(Cualquier  intento de uso externo del bot conllevara a un bloqueo de servidor)*"
                    ]
                }
            ]
        }
    ],
    footer: "*Y en caso de no respetar las reglas se te hará un Blacklisteo indeterminado, lo cual implica que no tendrás permiso de usar NINGUN comando o interacción del bot así que evitemos llegar a esa situación.*"
};

// Info para el embed de Karaoke
export const InfoKaraokeData = {
    title: `${Emojis.Echo.Microphone} Información de Karaoke ${Emojis.Echo.Microphone}`,
    description:
        "Sharpy incluye tres dinámicas principales para enriquecer la experiencia de karaoke en **Echoes Of Talent**: **Queue**, **Duel** y **Replica**. A continuación, encontrarás cómo usar cada una de ellas.\n> ***Nota**: Para usar estas dinámicas, debes estar conectado a un canal de voz de karaoke y si te sales de voz, serás expulsado de la dinamica.*",
    color: "#550000" as ColorResolvable,
    sections: [
        {
            title: "Lista de Turnos *(Queue)*",
            prefix: `${Emojis.Echo.ArrowBlue} `,
            description:
                "La lista organiza los turnos para cantar de manera ordenada.\nEs obligatorio estar conectado a un canal de voz de karaoke para la dinamica.",
            fields: [
                {
                    name: "Comandos principales",
                    prefix: `${Emojis.Echo.AnimatedArrowYellow} `,
                    values: [
                        "**`/karaoke start-queue`**: Crea una nueva lista de karaoke.",
                        "**`/karaoke show-queue`**: Reenvía el mensaje de la lista en el canal de texto para evitar que se pierda en el historial."
                    ]
                },
                {
                    name: "Funciones y reglas",
                    prefix: `${Emojis.Echo.AnimatedArrowRed} `,
                    values: [
                        "Unirte y salir de la lista en cualquier momento.",
                        "Finalizar tu turno.",
                        "Puede reiniciar la lista usando comandos administrativos.",
                        "Si eres staff, puedes saltar el turno actual se salta automáticamente.",
                        "Si no eres staff, se inicia una votación. Si el **80% de los participantes restantes** en la lista votan a favor, el turno se saltará."
                    ]
                }
            ]
        },
        {
            title: "Duelo",
            prefix: `${Emojis.Echo.ArrowBlue} `,
            description:
                "El duelo es una dinámica para que dos personas compitan entre sí, con votaciones al final para decidir al ganador.",
            fields: [
                {
                    name: "Comandos principales",
                    prefix: `${Emojis.Echo.AnimatedArrowGreen} `,
                    values: [
                        "**`/karaoke start-duel <@rival>`**: Envia una solicitud de duelo al usuario mencionado.",
                        "Si el rival rechaza la solicitud, el duelo se cancela.",
                        "Si el rival acepta, se pasa a la fase de turnos.",
                        "**`/karaoke show-duel`**: Reenvía el mensaje del duelo en el canal de texto."
                    ]
                },
                {
                    name: "Fases del duelo",
                    prefix: `${Emojis.Echo.AnimatedArrowRed} `,
                    values: [
                        "Uno de los participantes comienza el duelo y canta en su turno.",
                        "Cada participante debe finalizar su turno para que el otro pueda continuar.",
                        "Una vez que ambos participantes han terminado sus turnos, se inicia una votación.",
                        "La votación dura **1 minuto**.",
                        "Los usuarios pueden votar usando botones de cada participante, y el que obtenga más votos gana."
                    ]
                }
            ]
        },
        {
            title: "Réplica",
            prefix: `${Emojis.Echo.ArrowBlue} `,
            description:
                "La réplica es una dinámica especial reservada para **administradores** y eventos. Permite que entre 2 y 4 personas compitan por turnos con una votación final más visual.",
            fields: [
                {
                    name: "Comandos principales",
                    prefix: `${Emojis.Echo.AnimatedArrowGreen} `,
                    values: [
                        "**`/karaoke start-replic`**: Inicia una réplica y envía un mensaje donde los usuarios pueden unirse.",
                        "**`/karaoke show-replic`**: Reenvía el mensaje de la réplica en el canal de texto."
                    ]
                },
                {
                    name: "Cómo funciona",
                    prefix: `${Emojis.Echo.AnimatedArrowYellow} `,
                    values: [
                        "Los usuarios pueden unirse presionando el botón de Unirse.",
                        "Mínimo 2 y máximo 4 personas pueden participar.",
                        "Cada participante tiene un turno para cantar.",
                        "Una vez terminados los turnos, se inicia una votación que dura **2 minutos**.",
                        "Se generan botones para votar por cada participante (hasta un máximo de 4 botones).",
                        "La votación incluye una barra gráfica con emojis que representa el porcentaje de votos de cada participante y el participante con mayor porcentaje de votos es el ganador."
                    ]
                }
            ]
        }
    ]
};

// Info para el embed de Gerarquia de Roles
export const Hierarchies = {
    title: `${Emojis.Echo.GoldLeafLeft} JERARQUÍAS STAFF ${Emojis.Echo.GoldLeafRight}`,
    description: `${Emojis.Echo.PrettyArrowR} En Echoes of Talent, cada miembro del staff tiene un rol específico y una responsabilidad única. A continuación, te presentamos la jerarquía de roles y sus funciones. ${Emojis.Echo.GoldenShimmer}`,
    color: "#550000" as ColorResolvable,
    image: "https://cdn.discordapp.com/attachments/1178199527212199978/1330711500163256360/Reglas_Staff_700_x_500_px_3.png?ex=678ef929&is=678da7a9&hm=2832a234db060198e233117372dc291ec3c922908423404d42f2a0533c840d48&",
    prefix: `${Emojis.Echo.AnimatedArrowYellow} `,
    roles: [
        {
            title: `<@&${Config.DiscordBot.EchoesOfTalent.roles.Founder}>`,
            description:
                "Los fundadores son la máxima autoridad del servidor. Tienen acceso a todos los permisos y son responsables de la administración y dirección general del servidor. Su rol incluye la toma de decisiones críticas, la supervisión de todas las actividades y la garantía de que el servidor funcione sin problemas.",
            note: null
        },
        {
            title: `<@&${Config.DiscordBot.EchoesOfTalent.roles.Director}>`,
            description:
                "Personas de confianza que comparten las mismas responsabilidades de los Founders. Ayudan en la toma de decisiones del servidor, así como el costeo y mantenimiento de este. Los directores tienen todos los permisos y pueden tomar decisiones para el servidor en caso de la ausencia total de los Founders. Los directores por su parte se encargarán de ascender a los usuarios en la jerarquía del Staff y elegirlos debidamente, así como denigrar a los que no cumplan con sus roles dentro del Staff.",
            note: "Los directores se pueden encargar de la revisión de todas las postulaciones."
        },
        {
            title: `<@&${Config.DiscordBot.EchoesOfTalent.roles.Admin}>`,
            description:
                "Los Administradores serán los encargados de supervisar los roles por debajo de la jerarquía en la que se encuentra del Staff, es decir: Supervisor, Moderador y Ayudante. Los Administradores serán capaces de tomar decisiones con respecto a eventos, gestionar permisos y solucionar problemas técnicos del servidor, todo en conjunto con los DIRECTORES y demás administradores. En caso de la ausencia de los FOUNDERS o DIRECTORES, los Administradores pueden tomar decisiones en caso de ser necesario. También podrán ascender o denigrar los roles de: Ayudante, Moderador y Supervisor.",
            note: `Los Admins pueden admitir solicitudes de Eventos de <@&${Config.DiscordBot.EchoesOfTalent.roles.CreadorDeEventos}>, se encargan de administrar las postulaciones de <@&${Config.DiscordBot.EchoesOfTalent.roles.ArtistaGrafico}> y <@&${Config.DiscordBot.EchoesOfTalent.roles.ArtistaMusical}>, <@&${Config.DiscordBot.EchoesOfTalent.roles.Disenador}>, todas excepto <@&${Config.DiscordBot.EchoesOfTalent.roles.Partner}>.`
        },
        {
            title: `<@&${Config.DiscordBot.EchoesOfTalent.roles.Supervisor}>`,
            description:
                "Los Supervisores se encargan de coordinar las funciones de los moderadores y ayudantes, así como de solucionar problemas, gestionar canales, apelaciones y reportes dentro del servidor. Los supervisores son capaces de realizar: warneos, silenciar, aislar y banear a los usuarios que no cumplan con las reglas. A pesar de sus funciones no son capaces de tomar decisiones dentro del servidor, pero cumplen con un rol importante al mantener un control sobre la interacción de los Moderadores y Ayudantes.",
            note: `Los Supervisores solo se encargan de administrar las solicitudes de postulantes de <@&${Config.DiscordBot.EchoesOfTalent.roles.Staff}> y también <@&${Config.DiscordBot.EchoesOfTalent.roles.Disenador}>`
        },
        {
            title: `<@&${Config.DiscordBot.EchoesOfTalent.roles.Moderator}>`,
            description:
                "Los moderadores vigilan el cumplimiento de las reglas, responden a problemas en el chat, y maneja sanciones leves, es decir, tienen permisos de silenciar, aislar, realizar advertencias a los usuarios que no cumplan con las reglas. También los moderadores pueden responder y atender tickets a usuarios, realizar warns, aislar usuarios, silenciar, esondecer o mover a los usuarios, sin embargo no pueden realizar baneos, en dado caso deberán reportarse con un supervisor, para mantener un orden.",
            note: null
        },
        {
            title: `<@&${Config.DiscordBot.EchoesOfTalent.roles.Ayudante}>`,
            description:
                "El ayudante tiene permisos limitados para responder preguntas, reportar problemas y ayudar a los usuarios, este rol se le otorga a los miembros en entrenamiento para ser moderador. Los ayudantes pueden silenciar, ensordecer o mover a los usuarios dentro de un canal de voz.",
            note: null
        }
    ]
};

// Info para el embed de las reglas de diseñadores
export const DesignerRules = {
    title: `${Emojis.Echo.PinkNintendo} REGLAS DE DISEÑADORES ${Emojis.Echo.KITTYCLAPS}`,
    description: `${Emojis.Echo.PrettyArrowR} ¡Bienvenidos al equipo creativo encargado de transformar este servidor en un espacio visualmente atractivo y único! Para mantener un flujo de trabajo eficiente y respetuoso, estas son las normas que todos debemos seguir. ${Emojis.Echo.ADrawing}`,
    color: "#550000" as ColorResolvable,
    emojiNumbers: {
        $0$: Emojis.Echo.MinecraftGoldZero,
        $1$: Emojis.Echo.MinecraftGoldOne,
        $2$: Emojis.Echo.MinecraftGoldTwo,
        $3$: Emojis.Echo.MinecraftGoldThree,
        $4$: Emojis.Echo.MinecraftGoldFour,
        $5$: Emojis.Echo.MinecraftGoldFive,
        $6$: Emojis.Echo.MinecraftGoldSix,
        $7$: Emojis.Echo.MinecraftGoldSeven
    },
    rules: [
        {
            title: "El respeto como base del equipo",
            description:
                "Mantén una actitud respetuosa hacia tus compañeros y su trabajo. Recuerda que cada diseño refleja el esfuerzo y la creatividad de quien lo realiza. Si tienes sugerencias o críticas, exprésalas de manera constructiva, aportando soluciones o ideas que enriquezcan el proyecto."
        },
        {
            title: `Calidad y coherencia visual ${Emojis.Echo.Sparkles}`,
            description:
                "Aunque valoramos la innovación, todos los diseños deben respetar las pautas visuales establecidas (colores, tipografías, estilos). Esto asegura que la estética del servidor sea coherente y profesional. Si tienes propuestas para actualizar o cambiar ciertos elementos, ¡compártelas con el equipo para evaluarlas!"
        },
        {
            title: `Puntualidad en las entregas ${Emojis.Echo.ShrekWithRizz}`,
            description:
                "Cada proyecto tiene una fecha límite por una razón. Si te comprometes a una tarea, asegúrate de entregarla a tiempo. Si surge algún contratiempo, comunícalo de inmediato para ajustar el calendario y evitar retrasos en otros procesos."
        },
        {
            title: `Organización en los archivos entregados ${Emojis.Echo.Smile}`,
            description:
                "Entregar tus diseños de forma organizada es fundamental para un flujo de trabajo ágil. Usa nombres descriptivos para los archivos y, cuando sea necesario, incluye versiones editables para facilitar futuras modificaciones. Ejemplo de formato: `banner_evento_nombre_fecha.psd`"
        },
        {
            title: `Participa activamente y comparte ideas ${Emojis.Echo.PepeDrawing}`,
            description:
                "El diseño es un trabajo colaborativo. Participa en las reuniones, aporta sugerencias y sé parte activa de las decisiones creativas. Tus ideas pueden ser el motor que impulse grandes proyectos."
        },
        {
            title: `Acepta y ofrece retroalimentación con actitud abierta ${Emojis.Echo.MexicanCat}`,
            description:
                "Todos estamos aquí para mejorar y aprender. Si recibes críticas sobre tu trabajo, tómalo como una oportunidad para crecer. Del mismo modo, al dar feedback, sé específico y respetuoso, enfocándote en cómo mejorar y no en señalar errores."
        },
        {
            title: `Disfruta del servidor ${Emojis.Echo.PrettyStars}`,
            description:
                "Recuerda que tu trabajo no solo es un aporte técnico, sino una representación de este espacio. Diseña con pasión, mantén el estándar alto y sé orgulloso del impacto que tus creaciones tendrán en la comunidad."
        }
    ]
};

// Info para el embed de las reglas de Staff de Eventos
export const StaffEventRules = {
    title: `${Emojis.Echo.GoldLeafLeft} REGLAS STAFF EVENTOS ${Emojis.Echo.GoldLeafRight}`,
    color: "#550000" as ColorResolvable,
    emojiNumbers: {
        $0$: Emojis.Echo.MinecraftGoldZero,
        $1$: Emojis.Echo.MinecraftGoldOne,
        $2$: Emojis.Echo.MinecraftGoldTwo,
        $3$: Emojis.Echo.MinecraftGoldThree,
        $4$: Emojis.Echo.MinecraftGoldFour,
        $5$: Emojis.Echo.MinecraftGoldFive,
        $6$: Emojis.Echo.MinecraftGoldSix
    },
    prefix: `${Emojis.Echo.AnimatedArrowYellow} `,
    rules: [
        {
            title: "Cronogramas y Planificación",
            description: `Todos los eventos deben ser propuestos en el canal <#${Config.DiscordBot.EchoesOfTalent.channels.Sugerencias}>, las propuestas deben incluir: nombre del evento, objetivo, premios propuestos, fecha, hora, duración estimada, y descripción general. Los eventos deben ser aprobados por un <@&${Config.DiscordBot.EchoesOfTalent.roles.Admin}> antes de ser anunciados.`
        },
        {
            title: "Organización",
            description:
                "El organizador principal del evento será responsable de la coordinación general, incluyendo la preparación del material necesario, el staff estará ahí para la moderación durante el evento."
        },
        {
            title: "Anuncios",
            description: `Los anuncios deben realizarlos un <@&${Config.DiscordBot.EchoesOfTalent.roles.CreadorDeEventos}> o <@&${Config.DiscordBot.EchoesOfTalent.roles.Admin}>, el anuncio se lanzarán dos Flyers uno al menos 3 días antes de la fecha del evento y otro el día designado del evento, en el canal <#${Config.DiscordBot.EchoesOfTalent.channels.Anuncios}>`
        },
        {
            title: "Preparación Previa al Evento",
            description:
                "Asegúrate de y roles necesarios estén configurados correctamente. Verifica que los recursos técnicos, como bots o canales de voz, estén funcionando adecuadamente. Revisa el plan del evento con el equipo de Staff para asegurar que todos están al tanto de sus roles y responsabilidades."
        },
        {
            title: "Moderación Durante el Evento",
            description:
                "Mantén un ambiente positivo y respetuoso. Cualquier comportamiento inapropiado debe ser manejado de acuerdo a las reglas del servidor. Monitorea la participación y asegúrate de que todos los asistentes sigan las reglas del evento. Responde a las preguntas y proporciona asistencia técnica según sea necesario."
        },
        {
            title: "Adaptación y Flexibilidad",
            description:
                "Sé flexible y adaptable ante cualquier imprevisto o cambio de última hora. Trabaja en equipo para resolver problemas de manera eficiente y efectiva."
        }
    ]
};

// Info para el embed de las reglas de Info Staff
export const StaffInfoRules = {
    title: `${Emojis.Echo.Information} INFO STAFF ${Emojis.Echo.AdminHypeSquadPremium}`,
    description: `Bienvenido al canal de info staff. Aquí podrás conocer las sanciones y advertencias que pueden aplicar si incumples alguna de nuestras reglas.\n\n> ## ${Emojis.Echo.BlueWarning} SANCIONES ${Emojis.Echo.BlueWarning}\n*Todas las sanciones deben tener un motivo válido y contar con las pruebas necesarias. Sin ellas, ningún miembro del staff tomará acciones.*\n***En caso de baneo por warns: nuestro bot te enviará una invitación a un servidor de apelaciones, donde evaluaremos tu caso y determinaremos si puedes regresar al servidor ${Emojis.Echo.CatShhh}***`,
    color: "#550000" as ColorResolvable,
    section: {
        warns: {
            title: `${Emojis.Echo.Alert} ADVERTENCIAS ${Emojis.Echo.Alert}`,
            description: "Aquí te dejamos las razones de warns:",
            prefix: `${Emojis.Echo.AnimatedArrowBlue} `,
            fields: [
                "Hacer críticas destructivas.",
                "Insultos a la integridad de una persona.",
                "Spam de emojis y mensajes en los canales.",
                "Spam de links y contenido externo al servidor.",
                "Poner sonidos molestos en los canales de voz.",
                "Spam del panel de sonidos.",
                "Usar modulador de voz con el afán de molestar."
            ],
            note: `${Emojis.Echo.Danger} ***IMPORTANTE:** En caso de sobrepasar el número de 3 warns se te aplicara un Ban (Apelable).*`
        },
        instaban: {
            title: `${Emojis.Echo.BanHammer} BANEOS INSTANTÁNEOS ${Emojis.Echo.BanHammer}`,
            description: "No toleramos de ninguna manera:",
            prefix: `${Emojis.Echo.Warning} `,
            fields: [
                "Contenido NSFW.",
                "CP.",
                "Gore.",
                "Filtrar información de otros miembors *(Doxeo o información personal)*.",
                "Grooming.",
                "Pedofilia.",
                "Acoso."
            ]
        }
    }
};

// Info para el embed de Inforacion de Apelaciones
export const InfoApealData = {
    title: `${Emojis.Echo.AdminHypeSquadPremium} Servidor de Apelaciones ECHOES OF TALENT - Revisión de Baneos ${Emojis.Echo.AdminHypeSquadPremium}`,
    description: `**Bienvenido al servidor de apelaciones. Si has sido baneado de nuestra comunidad y deseas solicitar una revisión de tu caso. ${Emojis.Echo.Judge}**`,
    color: "#550000" as ColorResolvable,
    footer: "Agradecemos tu comprensión y esperamos que esta oportunidad sirva para mejorar la convivencia en nuestra comunidad. ¡Buena suerte!",
    sections: [
        {
            title: "Requisitos para solicitar una apelación",
            description:
                "Para que tu apelación sea considerada, debes cumplir con los siguientes requisitos:",
            prefix: `${Emojis.Echo.AnimatedArrowRed} `,
            fields: [
                "Haber esperado el tiempo que se te indico en la sanción.",
                "No haber apelado anteriormente por el mismo baneo sin aportar nueva información.",
                "Mantener una actitud respetuosa y madura durante todo el proceso.",
                "Proporcionar la información requerida de forma clara y verídica *(con evidencias sobre alguna injusticia si es el caso)*."
            ]
        },
        {
            title: "Pasos para apelar tu baneo",
            description: "",
            prefix: `${Emojis.Echo.AnimatedArrowYellow} `,
            fields: [
                `**Accede al canal de apelaciones:** En este servidor, dirígete a <#${Config.DiscordBot.EchoesOfTalent.channels.CreateApeal}>`,
                "Da clic en el botón de **Crear Apelación**.",
                "Responde de manera honesta el formulario que se te proporcionará.",
                "Confirma que se haya creado tu apelación llendo a la categoria que se creo con tu ID de usuario, donde habrá un canal de texto y otro de voz.",
                "Espera a que un miembro del staff se ponga en contacto contigo para revisar tu caso.",
                "En caso de que tu apelación sea aceptada, se te notificará y se te dará una segunda oportunidad en el servidor.",
                "En caso de que tu apelación sea rechazada, deberás esperar 15 días antes de volver a intentarlo."
            ]
        },
        {
            title: "Espera la revisión del equipo de moderación",
            prefix: `${Emojis.Echo.AnimatedArrowGreen} `,
            fields: [
                "Tu caso será evaluado en un plazo de 48 - 72 horas.",
                "Recibirás una respuesta: Un Supervisor o rango superior que te notificará si tu apelación ha sido aceptada o rechazada."
            ]
        },
        {
            title: `${Emojis.Echo.BlueWarning} IMPORTANTE ${Emojis.Echo.BlueWarning}`,
            prefix: "",
            fields: [
                "Si tu apelación es rechazada, deberás esperar 15 días antes de volver a intentarlo.",
                "En caso de proporcionar información falsa, tu apelación será automáticamente denegada y podrías recibir una sanción mayor.",
                "Las decisiones de nuestro Staff son las finales."
            ]
        }
    ]
};

// Info para los AutoRoles de Colores
export const ColorData = [
    {
        label: "Rojo",
        emoji: "🟥",
        id: Config.DiscordBot.EchoesOfTalent.roles.Rojo,
        buttonId: ButtonsId.Autorol_Rojo
    },
    {
        label: "Azul",
        emoji: "🟦",
        id: Config.DiscordBot.EchoesOfTalent.roles.Azul,
        buttonId: ButtonsId.Autorol_Azul
    },
    {
        label: "Verde",
        emoji: "🟩",
        id: Config.DiscordBot.EchoesOfTalent.roles.Verde,
        buttonId: ButtonsId.Autorol_Verde
    },
    {
        label: "Amarillo",
        emoji: "🟨",
        id: Config.DiscordBot.EchoesOfTalent.roles.Amarillo,
        buttonId: ButtonsId.Autorol_Amarillo
    },
    {
        label: "Naranja",
        emoji: "🟧",
        id: Config.DiscordBot.EchoesOfTalent.roles.Naranja,
        buttonId: ButtonsId.Autorol_Naranja
    },
    {
        label: "Rosa",
        emoji: "🌸",
        id: Config.DiscordBot.EchoesOfTalent.roles.Rosa,
        buttonId: ButtonsId.Autorol_Rosa
    },
    {
        label: "Morado",
        emoji: "🟪",
        id: Config.DiscordBot.EchoesOfTalent.roles.Morado,
        buttonId: ButtonsId.Autorol_Morado
    },
    {
        label: "Blanco",
        emoji: "⬜",
        id: Config.DiscordBot.EchoesOfTalent.roles.Blanco,
        buttonId: ButtonsId.Autorol_Blanco
    },
    {
        label: "Negro",
        emoji: "⬛",
        id: Config.DiscordBot.EchoesOfTalent.roles.Negro,
        buttonId: ButtonsId.Autorol_Negro
    }
];

// Info para los AutoRoles de Especialidad Musical
export const MusicalSpecialistData = [
    {
        label: "Oyente",
        description: "Rol para aquellos que disfrutan escuchar música.",
        emoji: "🎧",
        id: Config.DiscordBot.EchoesOfTalent.roles.Oyente,
        buttonId: ButtonsId.Autorol_Oyente
    },

    {
        label: "Cuerdas",
        description: "Rol para músicos que tocan instrumentos de cuerda.",
        emoji: "🎻",
        id: Config.DiscordBot.EchoesOfTalent.roles.Cuerdas,
        buttonId: ButtonsId.Autorol_Cuerdas
    },
    {
        label: "Vientos",
        description: "Rol para músicos que tocan instrumentos de viento.",
        emoji: "🎷",
        id: Config.DiscordBot.EchoesOfTalent.roles.Vientos,
        buttonId: ButtonsId.Autorol_Vientos
    },
    {
        label: "Baterista",
        description: "Rol para bateristas.",
        emoji: "🥁",
        id: Config.DiscordBot.EchoesOfTalent.roles.Baterista,
        buttonId: ButtonsId.Autorol_Baterista
    },
    {
        label: "Pianista/Tecladista",
        description: "Rol para pianistas y tecladistas.",
        emoji: "🎹",
        id: Config.DiscordBot.EchoesOfTalent.roles.PianistaTecladista,
        buttonId: ButtonsId.Autorol_PianistaTecladista
    },
    {
        label: "Compositor",
        description: "Rol para compositores.",
        emoji: "🎼",
        id: Config.DiscordBot.EchoesOfTalent.roles.Compositor,
        buttonId: ButtonsId.Autorol_Compositor
    },
    {
        label: "Percusionista",
        description: "Rol para percusionistas.",
        emoji: "🥁",
        id: Config.DiscordBot.EchoesOfTalent.roles.Percusionista,
        buttonId: ButtonsId.Autorol_Percusionista
    },
    {
        label: "Vocalista",
        description: "Rol para vocalistas.",
        emoji: "🎤",
        id: Config.DiscordBot.EchoesOfTalent.roles.Vocalista,
        buttonId: ButtonsId.Autorol_Vocalista
    }
];

// Info para los AutoRoles de Hobbies
export const HobbiesData = [
    {
        label: "Músico",
        description: "Rol para músicos en general.",
        emoji: "🎸",
        id: Config.DiscordBot.EchoesOfTalent.roles.Musico,
        buttonId: ButtonsId.Autorol_Musico
    },

    {
        label: "Teatro",
        description: "Rol para aquellos que participan en teatro.",
        emoji: "🎭",
        id: Config.DiscordBot.EchoesOfTalent.roles.Teatro,
        buttonId: ButtonsId.Autorol_Teatro
    },
    {
        label: "DJ",
        description: "Rol para DJs.",
        emoji: "🎧",
        id: Config.DiscordBot.EchoesOfTalent.roles.DJ,
        buttonId: ButtonsId.Autorol_DJ
    },
    {
        label: "Freestyler",
        description: "Rol para aquellos que disfrutan del Freestyle.",
        emoji: "🎤",
        id: Config.DiscordBot.EchoesOfTalent.roles.Freestyler,
        buttonId: ButtonsId.Autorol_Freestyler
    },
    {
        label: "Gaming",
        description: "Rol para aquellos que disfrutan de los videojuegos.",
        emoji: "🎮",
        id: Config.DiscordBot.EchoesOfTalent.roles.Gaming,
        buttonId: ButtonsId.Autorol_Gaming
    },
    {
        label: "Deporte",
        description: "Rol para aquellos que disfrutan de los deportes.",
        emoji: "⚽",
        id: Config.DiscordBot.EchoesOfTalent.roles.Deporte,
        buttonId: ButtonsId.Autorol_Deporte
    },
    {
        label: "Escritor",
        description: "Rol para escritores.",
        emoji: "✍️",
        id: Config.DiscordBot.EchoesOfTalent.roles.Escritor,
        buttonId: ButtonsId.Autorol_Escritor
    },
    {
        label: "Poesía",
        description: "Rol para poetas.",
        emoji: "🖋️",
        id: Config.DiscordBot.EchoesOfTalent.roles.Poesia,
        buttonId: ButtonsId.Autorol_Poesia
    }
];

// Info para los AutoRoles de Géneros Musicales
export const MusicGenreData = [
    {
        label: "Blues",
        description: "Rol para aquellos que disfrutan del Blues.",
        emoji: "🎷",
        id: Config.DiscordBot.EchoesOfTalent.roles.Blues,
        buttonId: ButtonsId.Autorol_Blues
    },
    {
        label: "Indie/Alternativo",
        description: "Rol para aquellos que disfrutan del Indie y Alternativo.",
        emoji: "🎸",
        id: Config.DiscordBot.EchoesOfTalent.roles.IndieAlternativo,
        buttonId: ButtonsId.Autorol_IndieAlternativo
    },
    {
        label: "Folk/Acústico",
        description: "Rol para aquellos que disfrutan del Folk y Acústico.",
        emoji: "🎻",
        id: Config.DiscordBot.EchoesOfTalent.roles.FolkAcustico,
        buttonId: ButtonsId.Autorol_FolkAcustico
    },
    {
        label: "Bossa Nova",
        description: "Rol para aquellos que disfrutan de la Bossa Nova.",
        emoji: "🎶",
        id: Config.DiscordBot.EchoesOfTalent.roles.BossaNova,
        buttonId: ButtonsId.Autorol_BossaNova
    },
    {
        label: "Rock",
        description: "Rol para aquellos que disfrutan del Rock.",
        emoji: "🎸",
        id: Config.DiscordBot.EchoesOfTalent.roles.Rock,
        buttonId: ButtonsId.Autorol_Rock
    },
    {
        label: "Experimental/Progresivo",
        description: "Rol para aquellos que disfrutan del Experimental y Progresivo.",
        emoji: "🎹",
        id: Config.DiscordBot.EchoesOfTalent.roles.ExperimentalProgresivo,
        buttonId: ButtonsId.Autorol_ExperimentalProgresivo
    },
    {
        label: "Pop",
        description: "Rol para aquellos que disfrutan del Pop.",
        emoji: "🎤",
        id: Config.DiscordBot.EchoesOfTalent.roles.Pop,
        buttonId: ButtonsId.Autorol_Pop
    },
    {
        label: "Electrónica/EDM",
        description: "Rol para aquellos que disfrutan de la Electrónica y EDM.",
        emoji: "🎧",
        id: Config.DiscordBot.EchoesOfTalent.roles.ElectronicaEDM,
        buttonId: ButtonsId.Autorol_ElectronicaEDM
    },
    {
        label: "Salsa",
        description: "Rol para aquellos que disfrutan de la Salsa.",
        emoji: "🕺",
        id: Config.DiscordBot.EchoesOfTalent.roles.Salsa,
        buttonId: ButtonsId.Autorol_Salsa
    },
    {
        label: "Jazz",
        description: "Rol para aquellos que disfrutan del Jazz.",
        emoji: "🎷",
        id: Config.DiscordBot.EchoesOfTalent.roles.Jazz,
        buttonId: ButtonsId.Autorol_Jazz
    },
    {
        label: "Clásica",
        description: "Rol para aquellos que disfrutan de la música Clásica.",
        emoji: "🎻",
        id: Config.DiscordBot.EchoesOfTalent.roles.Clasica,
        buttonId: ButtonsId.Autorol_Clasica
    },
    {
        label: "Metal",
        description: "Rol para aquellos que disfrutan del Metal.",
        emoji: "🎸",
        id: Config.DiscordBot.EchoesOfTalent.roles.Metal,
        buttonId: ButtonsId.Autorol_Metal
    },
    {
        label: "Urbano",
        description: "Rol para aquellos que disfrutan de la música Urbana.",
        emoji: "🎤",
        id: Config.DiscordBot.EchoesOfTalent.roles.Urbano,
        buttonId: ButtonsId.Autorol_Urbano
    },
    {
        label: "Cumbia",
        description: "Rol para aquellos que disfrutan de la Cumbia.",
        emoji: "🕺",
        id: Config.DiscordBot.EchoesOfTalent.roles.Cumbia,
        buttonId: ButtonsId.Autorol_Cumbia
    },
    {
        label: "Latino",
        description: "Rol para aquellos que disfrutan de la música Latina.",
        emoji: "🎶",
        id: Config.DiscordBot.EchoesOfTalent.roles.Latino,
        buttonId: ButtonsId.Autorol_Latino
    }
];

// Info para los AutoRoles de Géneros Musicales
export const BannedWords = [
    "cp",
    "c p",
    "cp",
    "c\np",
    "porno",
    "porno infantil",
    "pedofilia",
    "violación",
    "violador",
    "suicídate",
    "mátate",
    "muérete",
    "abuso infantil",
    "zoofilia",
    "necrofilia",
    "pornografía infantil",
    "golpearte",
    "asesinarte",
    "terrorista"
];

// Info del equipo de Staff de Echoes of Talent
export const EchoesTeam = {
    founders: [
        "633792173120290816", // Nozomu,
        "895819071726161941", // Nolan
        "438465229295190016", //Driver
        "1069799361913028639" // Sebascon
    ],
    directores: [
        "437308398845952001", // MrMikeDev
        "830269330226675743", // Jessica
        "1237587291740831834" // Dani
    ],
    "equipo-de-desarrollo": [
        "437308398845952001" // MrMikeDev
    ],
    "equipo-de-diseño": [
        "821581605205966850", // Lenny
        "1300883123533381733", // Mary
        "633792173120290816", // Nozomu,
        "739992290420064321" // Soft
    ],
    "equipo-de-soporte": [
        "437308398845952001", // MrMikeDev
        "633792173120290816", // Nozomu,
        "1069799361913028639" // Sebascon
    ],
    "equipo-de-eventos": [
        "633792173120290816", // Nozomu,
        "1069799361913028639", // Sebascon
        "438465229295190016", //Driver,
        "1237587291740831834", // Dani
        "895819071726161941" // Nolan
    ],
    "equipo-de-moderacion": [
        "1300883123533381733", // Mary
        "437308398845952001", // MrMikeDev
        "633792173120290816", // Nozomu,
        "895819071726161941", // Nolan
        "830269330226675743", // Jessica
        "1069799361913028639" // Sebascon
    ]
};

// Info de Suffijos de los Staff
export const StaffTeamSuffixes: Record<string, string> = {
    "437308398845952001": Emojis.KomiShouko.KomiFlushed
};

export const TextLevels = {
    100: Config.DiscordBot.EchoesOfTalent.roles.LevelText100,
    90: Config.DiscordBot.EchoesOfTalent.roles.LevelText90,
    80: Config.DiscordBot.EchoesOfTalent.roles.LevelText80,
    70: Config.DiscordBot.EchoesOfTalent.roles.LevelText70,
    60: Config.DiscordBot.EchoesOfTalent.roles.LevelText60,
    50: Config.DiscordBot.EchoesOfTalent.roles.LevelText50,
    40: Config.DiscordBot.EchoesOfTalent.roles.LevelText40,
    30: Config.DiscordBot.EchoesOfTalent.roles.LevelText30,
    20: Config.DiscordBot.EchoesOfTalent.roles.LevelText20,
    10: Config.DiscordBot.EchoesOfTalent.roles.LevelText10,
    0: Config.DiscordBot.EchoesOfTalent.roles.LevelText0
};

export const VoiceLevels = {
    100: Config.DiscordBot.EchoesOfTalent.roles.LevelVoice100,
    90: Config.DiscordBot.EchoesOfTalent.roles.LevelVoice90,
    80: Config.DiscordBot.EchoesOfTalent.roles.LevelVoice80,
    70: Config.DiscordBot.EchoesOfTalent.roles.LevelVoice70,
    60: Config.DiscordBot.EchoesOfTalent.roles.LevelVoice60,
    50: Config.DiscordBot.EchoesOfTalent.roles.LevelVoice50,
    40: Config.DiscordBot.EchoesOfTalent.roles.LevelVoice40,
    30: Config.DiscordBot.EchoesOfTalent.roles.LevelVoice30,
    20: Config.DiscordBot.EchoesOfTalent.roles.LevelVoice20,
    10: Config.DiscordBot.EchoesOfTalent.roles.LevelVoice10,
    0: Config.DiscordBot.EchoesOfTalent.roles.LevelVoice0
};

export const VoiceRankLevels = {
    100: Config.DiscordBot.EchoesOfTalent.roles.LeyendaDeEchoes,
    90: Config.DiscordBot.EchoesOfTalent.roles.LuzDeEchoes,
    80: Config.DiscordBot.EchoesOfTalent.roles.EstrellaDeEchoes,
    70: Config.DiscordBot.EchoesOfTalent.roles.TalentoAbsoluto,
    60: Config.DiscordBot.EchoesOfTalent.roles.TalentoBrillante,
    50: Config.DiscordBot.EchoesOfTalent.roles.FuturaEstrella,
    40: Config.DiscordBot.EchoesOfTalent.roles.TalentoEnAscenso,
    30: Config.DiscordBot.EchoesOfTalent.roles.TalentoInicial,
    20: Config.DiscordBot.EchoesOfTalent.roles.PromesaEmergente,
    10: Config.DiscordBot.EchoesOfTalent.roles.NotaPerdida,
    0: Config.DiscordBot.EchoesOfTalent.roles.Novato
};
