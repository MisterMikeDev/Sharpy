import { ActivitiesOptions, ActivityType } from "discord.js";

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
        EchoesOfTalent: {
            id: "1307747744768856110",
            apealServerId: "1335116102342279219",
            prefixes: {
                tickets: "┗『📜』ticket-",
                category: "──『Apeal $nick$』──",
                apealText: "┏『🖊️』apeal-",
                apealVoice: "┗『🎙️』apeal-"
            },
            channels: {
                Anuncios: "1308057691356401677",
                Rules: "1308056733905588344",
                Presentacion: "1313300920502714379",
                Niveles: "1313296784877027399",
                AutoRoles: "1316204298786439259",
                Boost: "1313299849067761805",
                Tickets: "1324886586751451136",
                InfoBooster: "1313998340135981058",
                StaffRules: "1313297590749499392",
                Sugerencias: "1324887115481481236",
                Perfiles: "1314449678254735370",
                MaterialMusical: "1314449635829485628",
                MaterialGrafico: "1327375896071376976",
                ReportBug: "1335090260132102235",
                ReportStaff: "1313699056933146676",
                InfoApeals: "1335826364045066251",
                Warns: "1340541472637976670",
                CreateApeal: "1335826249645424697",
                Birthdays: "1341511017116471346",
                PresentateStaff: "1341510732252053627",

                // Canales de texto que pueden ganar XP
                General: "1307844573560701119",
                Comandos: "1314454303187927064",
                Memes: "1313300719172059147",
                Media: "1316581530935627836",
                Arte: "1316581989234770013",
                ChatStaff: "1308939197368762459",
                ChatDirectiva: "1329462683715768454",
                BotDev: "1318421562319175711",

                // Canales de voz que pueden ganar XP
                Karaoke1: "1313697365781123173",
                Karaoke2: "1313696840406798417",
                Karaoke3: "1313696866898153492",
                Karaoke4: "1313696907469787146",
                Karaoke5: "1313696942488031333",
                Karaoke6: "1330749074349097111",
                Karaoke7: "1330749254683201607",
                Lobby1: "1307747744768856114",
                Lobby2: "1312860700401602686",
                Lobby3: "1312862212708110427",
                Lobby4: "1333206270089494601",
                Lobby5: "1333206310807802051",
                BeatboxRap1: "1313298775061561395",
                BeatboxRap2: "1313690387013042187",
                BeatboxRap3: "1313690502482366494"
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
                /* Roles jerarquicos (Apelaciones) */
                FounderApeal: "1335116380151742464",
                DirectorApeal: "1335116524775542866",
                AdminApeal: "1335116572204732416",
                SupervisorApeal: "1335116646313889814",
                ModeratorApeal: "1335116762579992627",
                AyudanteApeal: "1335116827931447347",
                StaffApeal: "1335116873527722139",
                BaneadoApeal: "1335116991102586941",
                /* Roles de tickets */
                TicketsSupport: "1315818733364842540",
                TicketsAdmin: "1315818734245384205",
                /* Roles de Boost */
                AltaSociedad: "1316791399156285572",
                VIP: "1307762166127923263",
                Veterano: "1342249210208190464",
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
                Partner: "1338019551161356288",
                /* Driver */
                AquelQueConduce: "1330239808467107900",
                /* Roles de nivel */
                LevelVoice100: "1340920715507011596",
                LevelVoice90: "1340920710192828500",
                LevelVoice80: "1340920707877568512",
                LevelVoice70: "1340920704668930149",
                LevelVoice60: "1340920701045182564",
                LevelVoice50: "1340920698415349854",
                LevelVoice40: "1340920694875095040",
                LevelVoice30: "1340920691557531649",
                LevelVoice20: "1340920688827174944",
                LevelVoice10: "1340920685844893718",
                LevelVoice0: "1340920682783047712",
                LevelText100: "1340920679838519329",
                LevelText90: "1340920676936056884",
                LevelText80: "1340920672578310186",
                LevelText70: "1340920667591147574",
                LevelText60: "1340920664986746920",
                LevelText50: "1340920661987561472",
                LevelText40: "1340920658930171984",
                LevelText30: "1340920656040165476",
                LevelText20: "1340920653435637780",
                LevelText10: "1340920645999001620",
                LevelText0: "1340920643062857920",
                LeyendaDeEchoes: "1334382983716671489",
                LuzDeEchoes: "1334383138582958081",
                EstrellaDeEchoes: "1334382997394292766",
                TalentoAbsoluto: "1334383141854646335",
                TalentoBrillante: "1334383120652304404",
                FuturaEstrella: "1334382988758224937",
                TalentoEnAscenso: "1334383128881659995",
                TalentoInicial: "1334383150620606526",
                PromesaEmergente: "1334383144996175902",
                NotaPerdida: "1334383166223290418",
                Novato: "1334383168966627419",

                /* Separadores */
                AboutSeparador: "1340907432867664015",
                LevelsSeparador: "1340907434285203496",
                ExtraSeparador: "1340909879354724374"
            },
            categories: {
                dev_tickets: "1319425232813035600",
                tickets: "1313295804995473458"
            },
            xpTextChannels: {
                General: "1307844573560701119",
                Comandos: "1314454303187927064",
                Memes: "1313300719172059147",
                Media: "1316581530935627836",
                Arte: "1316581989234770013",
                ChatStaff: "1308939197368762459",
                ChatDirectiva: "1329462683715768454",
                BotDev: "1318421562319175711"
            },
            xpVoiceChannels: {
                Karaoke1: "1313697365781123173",
                Karaoke2: "1313696840406798417",
                Karaoke3: "1313696866898153492",
                Karaoke4: "1313696907469787146",
                Karaoke5: "1313696942488031333",
                Karaoke6: "1330749074349097111",
                Karaoke7: "1330749254683201607",
                Lobby1: "1307747744768856114",
                Lobby2: "1312860700401602686",
                Lobby3: "1312862212708110427",
                Lobby4: "1333206270089494601",
                Lobby5: "1333206310807802051",
                BeatboxRap1: "1313298775061561395",
                BeatboxRap2: "1313690387013042187",
                BeatboxRap3: "1313690502482366494",
                JuntaDirectiva: "1329462498218479666",
                Staff: "1307748449709588500",
                Developing: "1318421706192322591"
            }
        },
        Status: GenerateStatusActivity()
    }
};

function GenerateStatusActivity(): ActivitiesOptions[] {
    const phrases = [
        "Tu estas preso pero en tu mente.",
        "Ay chavito, tienes el prepucio lleno de queso.",
        "Que tiene de malo, estan bien ricos los penes."
    ];

    return phrases.map((phrase) => ({
        ...StatusActivity,
        name: phrase
    })) as ActivitiesOptions[];
}
