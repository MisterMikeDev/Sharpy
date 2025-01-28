export interface Ticket {
    id: string;
    authorId: string;
    messageId: string;
    channelId: string;
    affaire: string;
    staffIdClaimed?: string | null;
    resolution?: TicketResolution | null;
    createdAt: Date;
    updatedAt: Date;
}

export interface TicketResolution {
    id: string;
    ticketId: string;
    staffId: string | null;
    reason: string;
    closedAt: Date;
    createdAt: Date;
    updatedAt: Date;
}
