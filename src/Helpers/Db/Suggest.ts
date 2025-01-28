import { Sharpy } from "../../Client";

// Crear una nueva sugerencia
const CreateSuggestion = async (
    Sharpy: Sharpy,
    {
        authorId,
        messageId,
        suggestion
    }: {
        authorId: string;
        messageId: string;
        suggestion: string;
    }
) => {
    const newSuggestion = await Sharpy.db.suggestions.create({
        data: {
            authorId,
            messageId,
            suggestion
        },
        include: {
            votes: true // Incluir votos por defecto
        }
    });

    return newSuggestion;
};

// Obtener todas las sugerencias con sus votos
const GetAllSuggestions = async (Sharpy: Sharpy) => {
    const suggestions = await Sharpy.db.suggestions.findMany({
        include: {
            votes: true // Incluir los votos
        }
    });

    return suggestions;
};

// Obtener una sugerencia por ID con sus votos
const GetSuggestionById = async (Sharpy: Sharpy, suggestionId: string) => {
    const suggestion = await Sharpy.db.suggestions.findUnique({
        where: {
            id: suggestionId
        },
        include: {
            votes: true // Incluir los votos
        }
    });

    return suggestion;
};

// Eliminar una sugerencia por ID y sus votos relacionados
const DeleteSuggestionById = async (Sharpy: Sharpy, suggestionId: string) => {
    const deleteSuggestion = await Sharpy.db.suggestions.delete({
        where: {
            id: suggestionId
        },
        include: {
            votes: true // Asegurar la eliminación en cascada
        }
    });

    return deleteSuggestion;
};

// Actualizar el texto de una sugerencia
const UpdateSuggestion = async (
    Sharpy: Sharpy,
    {
        suggestionId,
        newSuggestion
    }: {
        suggestionId: string;
        newSuggestion: string;
    }
) => {
    const updatedSuggestion = await Sharpy.db.suggestions.update({
        where: {
            id: suggestionId
        },
        data: {
            suggestion: newSuggestion
        },
        include: {
            votes: true // Mantener los votos al actualizar
        }
    });

    return updatedSuggestion;
};

// Registrar o actualizar un voto para una sugerencia
const VoteSuggestion = async (
    Sharpy: Sharpy,
    {
        suggestionId,
        userId,
        vote
    }: {
        suggestionId: string;
        userId: string;
        vote: 0 | 1; // 0 = Unvote, 1 = Upvote
    }
) => {
    const existingVote = await Sharpy.db.votes.findFirst({
        where: {
            suggestionId,
            userId
        }
    });

    if (existingVote) {
        if (existingVote.vote === vote) return;

        // Actualizar voto existente
        return await Sharpy.db.votes.update({
            where: {
                id: existingVote.id
            },
            data: {
                vote
            }
        });
    } else {
        // Crear nuevo voto
        return await Sharpy.db.votes.create({
            data: {
                suggestionId,
                userId,
                vote
            }
        });
    }
};

// Obtener votos por sugerencia
const GetVotesBySuggestionId = async (Sharpy: Sharpy, suggestionId: string) => {
    const votes = await Sharpy.db.votes.findMany({
        where: {
            suggestionId
        }
    });

    return votes;
};

// Obtener una sugerencia por su Message ID
const GetSuggestionByMessageId = async (Sharpy: Sharpy, messageId: string) => {
    const suggestion = await Sharpy.db.suggestions.findUnique({
        where: {
            messageId
        },
        include: {
            votes: true
        }
    });

    return suggestion;
};

// Obtener sugerencias por autor
const GetSuggestionsByAuthorId = async (Sharpy: Sharpy, authorId: string) => {
    const suggestions = await Sharpy.db.suggestions.findMany({
        where: {
            authorId
        },
        include: {
            votes: true
        }
    });

    return suggestions;
};

// Eliminar votos por usuario
const DeleteVotesByUserId = async (Sharpy: Sharpy, userId: string) => {
    const deleteResult = await Sharpy.db.votes.deleteMany({
        where: {
            userId
        }
    });

    return deleteResult;
};

// Eliminar una sugerencia por su Message ID
const DeleteSuggestionByMessageId = async (Sharpy: Sharpy, messageId: string) => {
    const deleteResult = await Sharpy.db.suggestions.delete({
        where: {
            messageId
        },
        include: {
            votes: true
        }
    });

    return deleteResult;
};

// Actualizar el Message ID de una sugerencia
const UpdateSuggestionMessageId = async (
    Sharpy: Sharpy,
    {
        suggestionId,
        newMessageId
    }: {
        suggestionId: string;
        newMessageId: string;
    }
) => {
    const updatedSuggestion = await Sharpy.db.suggestions.update({
        where: {
            id: suggestionId
        },
        data: {
            messageId: newMessageId
        },
        include: {
            votes: true
        }
    });

    return updatedSuggestion;
};

export const Db = {
    CreateSuggestion,
    DeleteSuggestionById,
    DeleteVotesByUserId,
    DeleteSuggestionByMessageId,
    GetAllSuggestions,
    GetSuggestionById,
    GetSuggestionByMessageId,
    GetSuggestionsByAuthorId,
    GetVotesBySuggestionId,
    UpdateSuggestion,
    UpdateSuggestionMessageId,
    VoteSuggestion
};
