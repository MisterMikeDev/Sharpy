/* eslint-disable no-unused-vars */

export enum MenuId {
    // Menú de colores
    AutoRoleColorMenu = "autoroleColorMenu",
    AutoRoleColorMenuRed = "rojo",
    AutoRoleColorMenuBlue = "azul",
    AutoRoleColorMenuGreen = "verde",
    AutoRoleColorMenuYellow = "amarillo",
    AutoRoleColorMenuOrange = "naranja",
    AutoRoleColorMenuPink = "rosa",
    AutoRoleColorMenuPurple = "morado",
    AutoRoleColorMenuWhite = "blanco",
    AutoRoleColorMenuBlack = "negro",

    // Menú de edades
    AutoRoleAgeMenu = "autoroleAgeMenu",
    AutoRoleAgeMenu24 = "24+",
    AutoRoleAgeMenu21 = "21-23",
    AutoRoleAgeMenu18 = "18-20",
    AutoRoleAgeMenu15 = "15-17",
    AutoRoleAgeMenu13 = "13-14",

    // Menú de géneros
    AutoRoleGenderMenu = "autoroleGenderMenu",
    AutoRoleGenderMenuMale = "hombre",
    AutoRoleGenderMenuFemale = "mujer",
    AutoRoleGenderMenuOther = "otro",

    // Menú de regiones
    AutoRoleRegionMenu = "autoroleRegionMenu",
    AutoRoleRegionMenuNorthAmerica = "norteamerica",
    AutoRoleRegionMenuEurope = "europa",
    AutoRoleRegionMenuSouthAmerica = "suramerica",
    AutoRoleRegionMenuCentralAmerica = "centroamerica",

    // Menú de instrumentos
    AutoRoleInstrumentMenu = "autoroleInstrumentMenu",
    AutoRoleInstrumentMenuWind = "viento",
    AutoRoleInstrumentMenuStrings = "cuerdas",
    AutoRoleInstrumentMenuPercussion = "percusion",

    // Menú de notificaciones
    AutoRoleNotificationMenu = "autoroleNotificationMenu",
    AutoRoleNotificationMenuKaraoke = "karaoke",
    AutoRoleNotificationMenuEvent = "evento",
    AutoRoleNotificationMenuGiveaway = "sorteo",
    AutoRoleNotificationMenuAnnouncement = "anuncio"
}

export type MenuType = MenuId;
