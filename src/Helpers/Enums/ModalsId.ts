/* eslint-disable no-unused-vars */
export enum ModalsId {
    // Tickets
    CreateTicket = "CreateTicket",
    CreateTicketInput = "CreateTicketInput",
    UserCloseTicketInput = "UserCloseTicketInput",
    UserCloseTicket = "UserCloseTicket",
    StaffCloseTicketInput = "StaffCloseTicketInput",
    StaffCloseTicket = "StaffCloseTicket",

    // Appeals
    ApealSituation = "ApealSituation",
    ApealCommitment = "ApealCommitment",
    ApealCreate = "ApealCreate",
    ApealCreatePardon = "ApealCreatePardon",
    ApealCreateBan = "ApealCreateBan",
    ApealCreateBanReason = "ApealCreateBanReason",
    ApealCreatePardonReason = "ApealCreatePardonReason",
    ApealVerify = "ApealVerifyIdInput",
    ApealCreatePardonUserId = "ApealCreatePardonUserId",
    ApealCreateBanUserId = "ApealCreateBanUserId"
}

export type ModalsType = ModalsId;
