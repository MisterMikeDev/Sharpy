/* eslint-disable no-unused-vars */

export enum ButtonsId {
    // Karaoke Queue
    JoinQueue = "joinQueue",
    ExitQueue = "exitQueue",
    FinishQueue = "finishQueue",
    FocusQueue = "focusQueue",
    SkipQueue = "skipQueue",

    // Karaoke Duel
    AcceptDuel = "acepetDuel",
    DeclineDuel = "declineDuel",
    StartDuel = "startDuel",
    EndTurn = "endTurn",
    VoteChallenger = "voteChallenger",
    VoteRival = "voteRival",

    // LevelSystem
    DebugGetAllUsers = "debugGetAllUsers",
    DebugSetUserXp = "debugSetUserXp",
    DebugRemoveUser = "debugRemoveUser",

    // Tickets
    CreateTicket = "createTicket",
    CloseTicket = "closeTicket",
    StaffCloseTicket = "staffCloseTicket",
    ClaimTicket = "claimTicket",
    ClaimedTicket = "claimedTicket",
    VerifyCloseTicket = "verifyCloseTicket",
    SuggestionApprove = "suggestionApprove",
    SuggestionReject = "suggestionReject",

    // Replic
    JoinReplic = "joinReplic",
    ExitReplic = "exitReplic",
    StartReplic = "startReplic",
    NextTurnReplic = "nextTurnReplic",
    VoteFirstParticipant = "voteFirstParticipant",
    VoteSecondParticipant = "voteSecondParticipant",
    VoteThirdParticipant = "voteThirdParticipant",
    VoteFourthParticipant = "voteFourthParticipant",

    // Autoroles
    Autorol_Rojo = "autorolRojo",
    Autorol_Azul = "autorolAzul",
    Autorol_Verde = "autorolVerde",
    Autorol_Amarillo = "autorolAmarillo",
    Autorol_Naranja = "autorolNaranja",
    Autorol_Rosa = "autorolRosa",
    Autorol_Morado = "autorolMorado",
    Autorol_Blanco = "autorolBlanco",
    Autorol_Negro = "autorolNegro",
    Autorol_Oyente = "autorolOyente",
    Autorol_ArtistaGrafico = "autorolArtistaGrafico",
    Autorol_ArtistaMusical = "autorolArtistaMusical",
    Autorol_Musico = "autorolMusico",
    Autorol_Cuerdas = "autorolCuerdas",
    Autorol_Teatro = "autorolTeatro",
    Autorol_DJ = "autorolDJ",
    Autorol_Gaming = "autorolGaming",
    Autorol_Vientos = "autorolVientos",
    Autorol_Baterista = "autorolBaterista",
    Autorol_PianistaTecladista = "autorolPianistaTecladista",
    Autorol_Deporte = "autorolDeporte",
    Autorol_Escritor = "autorolEscritor",
    Autorol_Poesia = "autorolPoesia",
    Autorol_Compositor = "autorolCompositor",
    Autorol_BossaNova = "autorolBossaNova",
    Autorol_Percusionista = "autorolPercusionista",
    Autorol_Vocalista = "autorolVocalista",
    Autorol_Blues = "autorolBlues",
    Autorol_IndieAlternativo = "autorolIndieAlternativo",
    Autorol_FolkAcustico = "autorolFolkAcustico",
    Autorol_Rock = "autorolRock",
    Autorol_ExperimentalProgresivo = "autorolExperimentalProgresivo",
    Autorol_Pop = "autorolPop",
    Autorol_ElectronicaEDM = "autorolElectronicaEDM",
    Autorol_Salsa = "autorolSalsa",
    Autorol_Jazz = "autorolJazz",
    Autorol_Freestyler = "autorolFreestyler",
    Autorol_Clasica = "autorolClasica",
    Autorol_Metal = "autorolMetal",
    Autorol_Urbano = "autorolUrbano",
    Autorol_Cumbia = "autorolCumbia",
    Autorol_Latino = "autorolLatino",

    // Apeals
    CreateApeal = "createApeal",
    PardonApeal = "pardonApeal",
    DefinitiveBan = "definitiveBan"
}

export type ButtonsType = ButtonsId;
