import { ActivitiesOptions, ActivityType } from "discord.js";
import { Sharpy } from "../Client";

const StatusActivity: ActivitiesOptions = {
    type: ActivityType.Streaming,
    name: "",
    url: "https://discord.gg/YTk3sw2sHC"
};

export const Config = {
    DiscordBot: {
        IdAuthor: "437308398845952001",
        Client: process.env.BOT_CLIENT_ID ?? "",
        ClientSecret: process.env.BOT_CLIENT_SECRET ?? "",
        Token: process.env.BOT_TOKEN ?? "",
        CallbackURL:
            process.env.BOT_CALLBACK_URL ?? "http://localhost:3000/auth/callback",
        Intents: [
            "Guilds",
            "GuildMembers",
            "GuildBans",
            "GuildEmojisAndStickers",
            "GuildIntegrations",
            "GuildWebhooks",
            "GuildInvites",
            "GuildVoiceStates",
            "GuildPresences",
            "GuildMessages",
            "GuildMessageReactions",
            "GuildMessageTyping",
            "DirectMessages",
            "DirectMessageReactions",
            "DirectMessageTyping",
            "MessageContent",
            "GuildScheduledEvents"
        ] as [
            "Guilds",
            "GuildMembers",
            "GuildBans",
            "GuildEmojisAndStickers",
            "GuildIntegrations",
            "GuildWebhooks",
            "GuildInvites",
            "GuildVoiceStates",
            "GuildPresences",
            "GuildMessages",
            "GuildMessageReactions",
            "GuildMessageTyping",
            "DirectMessages",
            "DirectMessageReactions",
            "DirectMessageTyping",
            "MessageContent",
            "GuildScheduledEvents"
        ],
        EchosOfTalent: {
            id: "1307747744768856110",
            prefixes: {
                tickets: "┗『📜』ticket-"
            },
            channels: {
                Karaoke1: "1313697365781123173",
                Karaoke2: "1313696840406798417",
                Karaoke3: "1313696866898153492",
                Karaoke4: "1313696907469787146",
                Karaoke5: "1313696942488031333",
                Karaoke6: "1330749074349097111",
                Karaoke7: "1330749254683201607",
                Anuncios: "1308057691356401677",
                Rules: "1308056733905588344",
                Presentacion: "1313300920502714379",
                Niveles: "1313296784877027399",
                AutoRoles: "1316204298786439259",
                Boost: "1313299849067761805",
                Tickets: "1324886586751451136",
                General: "1307844573560701119",
                InfoBooster: "1313998340135981058",
                StaffRules: "1313297590749499392",
                Sugerencias: "1324887115481481236",
                Perfiles: "1314449678254735370",
                MaterialMusical: "1314449635829485628",
                MaterialGrafico: "1327375896071376976"
            },
            roles: {
                /* Roles jerarquicos */
                PoderesMisticos: "1308432429824086026",
                Founder: "1307748890254250064",
                Director: "1307804113425272994",
                Programador: "1312909219728593018",
                Admin: "1312909148110717059",
                Supervisor: "1312909103424606279",
                Moderator: "1312909535169744956",
                Ayudante: "1312909599170498690",
                Staff: "1317319643043725383",
                Disenador: "1316510251117318204",
                /* Roles de tickets */
                TicketsSupport: "1315818733364842540",
                TicketsAdmin: "1315818734245384205",
                /* Roles de Boost */
                AltaSociedad: "1316791399156285572",
                VIP: "1307762166127923263",
                /* Roles base */
                Miembro: "1307817127364919326",
                Bots: "1308437376351076422",
                /* Roles de genero */
                Hombre: "1316137057822707823",
                Mujer: "1316138014677929984",
                Otro: "1316138102258925668",
                /* Edades */
                "26+": "1316147419653603428",
                "22-25": "1316147350099591188",
                "18-21": "1316147136114593942",
                "14-17": "1316135938606370906",
                /* Regiones */
                SurAmerica: "1316156694962765936",
                NorteAmerica: "1316138664249655356",
                CentroAmerica: "1316951420230172693",
                Europa: "1316139037647441970",
                /* Colores */
                Amarillo: "1316146352123678841",
                Negro: "1316147072814157940",
                Naranja: "1316146534437355570",
                Morado: "1316146297492865084",
                Rosa: "1316146836142297138",
                Verde: "1316146453604728902",
                Rojo: "1316146150700482560",
                Blanco: "1316146958188154990",
                Azul: "1316146257722474547",
                /* Roles de especialidad */
                Oyente: "1326726520261181503",
                ArtistaGrafico: "1326727023262957599",
                ArtistaMusical: "1314375640748785706",
                Musico: "1326727014450991125",
                Cuerdas: "1326726830421573702",
                Teatro: "1326727018582114465",
                DJ: "1326726949946785962",
                Gaming: "1326727200774553765",
                Vientos: "1326726946184499213",
                Baterista: "1326726937787236434",
                PianistaTecladista: "1326726836000002058",
                Deporte: "1326727032285036607",
                Escritor: "1326727028421955605",
                Compositor: "1326728216747970560",
                BossaNova: "1326726979537604629",
                Percusionista: "1326726942346711073",
                Vocalista: "1326726800910454856",
                /* Generos musicales */
                Blues: "1326726988685377599",
                IndieAlternativo: "1326727008457068577",
                FolkAcustico: "1326726977045925928",
                Rock: "1326726957055873154",
                ExperimentalProgresivo: "1326726993961553950",
                Pop: "1326726962961584129",
                ElectronicaEDM: "1326726967428513875",
                Salsa: "1326727000701796412",
                Jazz: "1326726983031459911",
                Freestyler: "1326726953515876393",
                Clasica: "1326726973787213885",
                Metal: "1326726960076034118",
                Urbano: "1326726970678972557",
                Cumbia: "1326726997690421361",
                Latino: "1326727004698968064",
                /* Roles de notificaciones */
                Anuncios: "1316148450663862332",
                Karaoke: "1316142942741856296",
                Poesia: "1326727036118499369",
                Sorteos: "1316954479609778206",
                /* Roles de Evento */
                Eventos: "1316144113371844678",
                Jurado: "1313122084334862386",
                ArtistaEmergente: "1314375640748785706",
                CreadorDeEventos: "1312909624332124210",
                Partner: "1330729337367957655",
                /* Driver */
                AquelQueConduce: "1330239808467107900"
            },
            categories: {
                dev_tickets: "1319425232813035600",
                tickets: "1313295804995473458"
            }
        },
        Status: (Sharpy: Sharpy): ActivitiesOptions[] => [
            {
                name: `En desarrollo de ${Sharpy.user?.tag}.`,
                type: ActivityType.Watching
            },
            {
                ...StatusActivity,
                name: "Tu estas preso pero en tu mente."
            },
            {
                ...StatusActivity,
                name: "Ay chavito, tienes el prepucio lleno de queso."
            },
            {
                ...StatusActivity,
                name: "Que tiene de malo, estan bien ricos los penes."
            },
            {
                ...StatusActivity,
                name: "Yo pago con Apple Pay."
            }
        ]
    }
};
