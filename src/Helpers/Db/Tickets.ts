import { Sharpy } from "../../Client";

const CreateNewTicket = async (
    Sharpy: Sharpy,
    {
        authorId,
        messageId,
        channelId,
        affaire
    }: {
        authorId: string;
        messageId: string;
        channelId: string;
        affaire: string;
    }
) => {
    const ticket = await Sharpy.db.tickets.create({
        data: {
            authorId,
            messageId,
            channelId,
            affaire
        }
    });

    return ticket;
};

const CloseTicket = async (Sharpy: Sharpy, ticketId: string, resolutionId: string) => {
    const ticket = await Sharpy.db.tickets.update({
        where: {
            id: ticketId
        },
        data: {
            resolution: {
                connect: {
                    id: resolutionId
                }
            }
        }
    });

    return ticket;
};

const CreateTicketResolution = async (
    Sharpy: Sharpy,
    {
        ticketId,
        staffId,
        reason
    }: {
        ticketId: string;
        staffId: string | null;
        reason: string;
    }
) => {
    const resolution = await Sharpy.db.ticketsResolution.create({
        data: {
            ticketId,
            staffId,
            reason
        }
    });

    return resolution;
};

const GetAllTickets = async (Sharpy: Sharpy) => {
    const tickets = await Sharpy.db.tickets.findMany();

    return tickets;
};

const GetResolvedTickets = async (Sharpy: Sharpy) => {
    const tickets = await Sharpy.db.tickets.findMany({
        where: {
            resolution: {
                isNot: null // Filtra tickets que tienen una resolución asociada
            }
        },
        include: {
            resolution: true // Incluye la información de la resolución en los resultados
        }
    });

    return tickets;
};

const GetTicketById = async (Sharpy: Sharpy, ticketId: string) => {
    const ticket = await Sharpy.db.tickets.findUnique({
        where: {
            id: ticketId
        },
        include: {
            resolution: true
        }
    });

    return ticket;
};

const GetTicketByMessageId = async (Sharpy: Sharpy, messageId: string) => {
    const ticket = await Sharpy.db.tickets.findUnique({
        where: {
            messageId
        },
        include: {
            resolution: true
        }
    });

    return ticket;
};

const GetTicketByChannelId = async (Sharpy: Sharpy, channelId: string) => {
    const ticket = await Sharpy.db.tickets.findUnique({
        where: {
            channelId
        },
        include: {
            resolution: true
        }
    });

    return ticket;
};

const GetTicketByAuthorId = async (Sharpy: Sharpy, authorId: string) => {
    const ticket = await Sharpy.db.tickets.findUnique({
        where: {
            authorId
        },
        include: {
            resolution: true
        }
    });

    return ticket;
};

const UpdateTicketMessageId = async (
    Sharpy: Sharpy,
    {
        ticketId,
        newMessageId
    }: {
        ticketId: string;
        newMessageId: string;
    }
) => {
    const updatedTicket = await Sharpy.db.tickets.update({
        where: {
            id: ticketId
        },
        data: {
            messageId: newMessageId
        }
    });

    return updatedTicket;
};

const DeleteTicketByIdWithReference = async (Sharpy: Sharpy, ticketId: string) => {
    const deleteResolution = await Sharpy.db.ticketsResolution.deleteMany({
        where: {
            ticketId
        }
    });

    const deleteTicket = await Sharpy.db.tickets.delete({
        where: {
            id: ticketId
        }
    });

    return { deleteResolution, deleteTicket };
};

const DeleteAllTickets = async (Sharpy: Sharpy) => {
    const deleteResolutions = await Sharpy.db.ticketsResolution.deleteMany();
    const deleteTickets = await Sharpy.db.tickets.deleteMany();

    return { deleteResolutions, deleteTickets };
};

const DeleteOldestTickets = async (Sharpy: Sharpy, count: number = 5) => {
    const ticketsToDelete = await Sharpy.db.tickets.findMany({
        orderBy: {
            createdAt: "asc"
        },
        take: count
    });

    const deleteResult = await Sharpy.db.tickets.deleteMany({
        where: {
            id: {
                in: ticketsToDelete.map((ticket) => ticket.id)
            }
        }
    });

    return deleteResult;
};

const DeleteTicketByAuthorId = async (Sharpy: Sharpy, authorId: string) => {
    const deleteResult = await Sharpy.db.tickets.delete({
        where: {
            authorId
        }
    });

    return deleteResult;
};

const GetUnresolvedTickets = async (Sharpy: Sharpy) => {
    const tickets = await Sharpy.db.tickets.findMany({
        where: {
            resolution: {
                is: null
            }
        }
    });

    return tickets;
};

const ClaimTicket = async (
    Sharpy: Sharpy,
    {
        ticketId,
        staffId
    }: {
        ticketId: string;
        staffId: string;
    }
) => {
    const updatedTicket = await Sharpy.db.tickets.update({
        where: {
            id: ticketId
        },
        data: {
            staffIdClaimed: staffId
        }
    });

    return updatedTicket;
};

const UnclaimTicket = async (Sharpy: Sharpy, ticketId: string) => {
    const updatedTicket = await Sharpy.db.tickets.update({
        where: {
            id: ticketId
        },
        data: {
            staffIdClaimed: null
        }
    });

    return updatedTicket;
};

const GetTicketsClaimedByStaff = async (Sharpy: Sharpy, staffId: string) => {
    const tickets = await Sharpy.db.tickets.findMany({
        where: {
            staffIdClaimed: staffId
        }
    });

    return tickets;
};

export const Db = {
    ClaimTicket,
    CloseTicket,
    CreateNewTicket,
    CreateTicketResolution,
    DeleteAllTickets,
    DeleteOldestTickets,
    DeleteTicketByAuthorId,
    DeleteTicketByIdWithReference,
    GetAllTickets,
    GetResolvedTickets,
    GetTicketByAuthorId,
    GetTicketByChannelId,
    GetTicketById,
    GetTicketByMessageId,
    GetTicketsClaimedByStaff,
    GetUnresolvedTickets,
    UnclaimTicket,
    UpdateTicketMessageId
};
