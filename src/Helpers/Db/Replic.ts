import { Sharpy } from "../../Client";

const CreateReplic = async (
    Sharpy: Sharpy,
    {
        channelId,
        messageId
    }: {
        channelId: string;
        messageId: string;
    }
) => {
    const replic = await Sharpy.db.replic.create({
        data: {
            channelId,
            messageId
        }
    });

    return replic;
};

const GetReplicById = async (Sharpy: Sharpy, replicId: string) => {
    const replic = await Sharpy.db.replic.findUnique({
        where: {
            id: replicId
        },
        include: {
            votes: true
        }
    });

    if (!replic) return null;

    const participants = [
        replic.participant1,
        replic.participant2,
        replic.participant3,
        replic.participant4
    ];

    return { ...replic, participants };
};

const GetReplicByChannel = async (Sharpy: Sharpy, channelId: string) => {
    const replic = await Sharpy.db.replic.findFirst({
        where: {
            channelId
        },
        include: {
            votes: true
        }
    });

    if (!replic) return null;

    const participants = [
        replic.participant1,
        replic.participant2,
        replic.participant3,
        replic.participant4
    ];

    return { ...replic, participants };
};

const GetReplics = async (Sharpy: Sharpy) => {
    const replics = await Sharpy.db.replic.findMany({
        include: {
            votes: true
        }
    });

    const transformedReplics = replics.map((replic) => ({
        ...replic,
        participants: [
            replic.participant1,
            replic.participant2,
            replic.participant3,
            replic.participant4
        ]
    }));

    return transformedReplics;
};

const UpdateReplicParticipants = async (
    Sharpy: Sharpy,
    {
        replicId,
        participants
    }: {
        replicId: string;
        participants: string[];
    }
) => {
    const updatedReplic = await Sharpy.db.replic.update({
        where: {
            id: replicId
        },
        data: {
            participant1: participants[0],
            participant2: participants[1],
            participant3: participants[2],
            participant4: participants[3]
        }
    });

    return updatedReplic;
};

const UpdateReplicStatus = async (
    Sharpy: Sharpy,
    {
        replicId,
        status,
        currentTurn
    }: {
        replicId: string;
        status: number;
        currentTurn?: number;
    }
) => {
    if (currentTurn) {
        const updatedReplic = await Sharpy.db.replic.update({
            where: {
                id: replicId
            },
            data: {
                replicStatus: status,
                currentTurn
            }
        });

        return updatedReplic;
    } else {
        const updatedReplic = await Sharpy.db.replic.update({
            where: {
                id: replicId
            },
            data: {
                replicStatus: status
            }
        });

        return updatedReplic;
    }
};

const UpdateReplicWinner = async (
    Sharpy: Sharpy,
    {
        replicId,
        winnerId
    }: {
        replicId: string;
        winnerId: string | null;
    }
) => {
    const updatedReplic = await Sharpy.db.replic.update({
        where: {
            id: replicId
        },
        data: {
            winnerId
        }
    });

    return updatedReplic;
};

const UpdateReplicMessageId = async (
    Sharpy: Sharpy,
    {
        replicId,
        newMessageId
    }: {
        replicId: string;
        newMessageId: string;
    }
) => {
    const updatedReplic = await Sharpy.db.replic.update({
        where: {
            id: replicId
        },
        data: {
            messageId: newMessageId
        }
    });

    return updatedReplic;
};

const JoinReplic = async (Sharpy: Sharpy, replicId: string, userId: string) => {
    const replic = null;
    const error = null;

    const replica = await Sharpy.db.replic.findUnique({
        where: { id: replicId }
    });

    if (!replica)
        return {
            replic,
            error: "No se encontró la réplica"
        };

    const participants = [
        replica.participant1,
        replica.participant2,
        replica.participant3,
        replica.participant4
    ];

    const emptyIndex = participants.findIndex((participant) => !participant);

    if (emptyIndex === -1)
        return {
            replic,
            error: "La réplica está llena"
        };

    const updatedField = `participant${emptyIndex + 1}`;

    const updatedReplic = await Sharpy.db.replic.update({
        where: { id: replicId },
        data: {
            [updatedField]: userId
        }
    });

    return {
        replic: updatedReplic,
        error
    };
};

const ExitReplic = async (Sharpy: Sharpy, replicId: string, userId: string) => {
    const replic = null;
    const error = null;

    const replica = await Sharpy.db.replic.findUnique({
        where: { id: replicId }
    });

    if (!replica)
        return {
            replic,
            error: "No se encontró la réplica"
        };

    const participants = [
        replica.participant1,
        replica.participant2,
        replica.participant3,
        replica.participant4
    ];

    const participantIndex = participants.findIndex(
        (participant) => participant === userId
    );

    if (participantIndex === -1)
        return {
            replic,
            error: "No se encontró al usuario en la réplica"
        };

    const updatedField = `participant${participantIndex + 1}`;

    const updatedReplic = await Sharpy.db.replic.update({
        where: { id: replicId },
        data: {
            [updatedField]: null
        }
    });

    return {
        replic: updatedReplic,
        error
    };
};

const VoteReplic = async (
    Sharpy: Sharpy,
    {
        replicId,
        userId,
        voteFor,
        weight = 1
    }: {
        replicId: string;
        userId: string;
        voteFor: number;
        weight?: number;
    }
) => {
    const vote = await Sharpy.db.replicVotes.findFirst({
        where: {
            replicId,
            userId
        }
    });

    if (vote) {
        const updatedVote = await Sharpy.db.replicVotes.update({
            where: {
                id: vote.id
            },
            data: {
                voteFor,
                weight
            }
        });

        return updatedVote;
    }

    const newVote = await Sharpy.db.replicVotes.create({
        data: {
            replicId,
            userId,
            voteFor,
            weight
        }
    });

    return newVote;
};

const RemoveReplicById = async (Sharpy: Sharpy, replicId: string) => {
    await Sharpy.db.replicVotes.deleteMany({
        where: { replicId }
    });

    const replic = await Sharpy.db.replic.delete({
        where: {
            id: replicId
        }
    });

    return replic;
};

const RemoveReplicByChannel = async (Sharpy: Sharpy, channelId: string) => {
    await Sharpy.db.replicVotes.deleteMany({
        where: {
            replic: {
                channelId
            }
        }
    });

    const replic = await Sharpy.db.replic.deleteMany({
        where: {
            channelId
        }
    });

    return replic;
};

const RemoveReplics = async (Sharpy: Sharpy) => {
    const replics = await Sharpy.db.replic.deleteMany();

    return replics;
};

const GetReplicWhereUserParticipate = async (Sharpy: Sharpy, userId: string) => {
    const replic = await Sharpy.db.replic.findFirst({
        where: {
            OR: [
                { participant1: userId },
                { participant2: userId },
                { participant3: userId },
                { participant4: userId }
            ]
        }
    });

    return replic;
};

const RunAwayReplic = async (Sharpy: Sharpy, replicId: string, userId: string) => {
    await Sharpy.db.replicVotes
        .deleteMany({
            where: {
                replicId,
                userId
            }
        })
        .catch(() => {});

    const replic = await Sharpy.db.replic.findUnique({
        where: { id: replicId }
    });

    if (!replic) return null;

    const participants = [
        replic.participant1,
        replic.participant2,
        replic.participant3,
        replic.participant4
    ];

    const updatedFields = participants
        .map((participant, index) =>
            participant === userId ? `participant${index + 1}` : null
        )
        .filter((field) => field !== null);

    if (updatedFields.length === 0) return null;

    const updateData = updatedFields.reduce((acc, field) => {
        acc[field] = null;
        return acc;
    }, {});

    const updatedReplic = await Sharpy.db.replic.update({
        where: { id: replicId },
        data: updateData
    });

    const participantsLeft = participants.filter((p) => p && p !== userId);

    if (participantsLeft.length === 0) {
        await Sharpy.db.replic.update({
            where: { id: replicId },
            data: {
                replicStatus: 3,
                currentTurn: 0,
                winnerId: null
            }
        });
    } else if (participantsLeft.length === 1) {
        const winnerId = participantsLeft[0];

        await Sharpy.db.replic.update({
            where: { id: replicId },
            data: {
                winnerId,
                replicStatus: 3,
                currentTurn: 0
            }
        });
    } else if (participantsLeft.length > 1) {
        const currentTurnIndex = participants.findIndex(
            (participant) => participant === userId
        );

        let nextTurnIndex = (currentTurnIndex + 1) % participants.length;

        while (!participants[nextTurnIndex] || participants[nextTurnIndex] === userId) {
            nextTurnIndex = (nextTurnIndex + 1) % participants.length;
        }

        await Sharpy.db.replic.update({
            where: { id: replicId },
            data: {
                currentTurn: nextTurnIndex + 1
            }
        });
    } else {
        await Sharpy.db.replic.update({
            where: { id: replicId },
            data: {
                replicStatus: 2
            }
        });

        Sharpy.emit("voteReplicStart", replic.channelId);
    }

    return updatedReplic;
};

const GetWinnerByVotes = async (Sharpy: Sharpy, replicId: string) => {
    const votes = await Sharpy.db.replicVotes.findMany({
        where: { replicId }
    });

    if (!votes.length) return null;

    const votesCount: Record<number, { total: number; oldestVote: Date }> = {};

    for (const vote of votes) {
        if (!votesCount[vote.voteFor]) {
            votesCount[vote.voteFor] = { total: 0, oldestVote: vote.createdAt };
        }
        votesCount[vote.voteFor].total += vote.weight;

        if (vote.createdAt < votesCount[vote.voteFor].oldestVote) {
            votesCount[vote.voteFor].oldestVote = vote.createdAt;
        }
    }

    const winnerId = Object.keys(votesCount).reduce((a, b) => {
        const voteA = votesCount[+a];
        const voteB = votesCount[+b];

        if (voteA.total !== voteB.total) {
            return voteA.total > voteB.total ? a : b;
        }

        return voteA.oldestVote < voteB.oldestVote ? a : b;
    });

    return winnerId;
};

export const Db = {
    CreateReplic,
    ExitReplic,
    GetReplicByChannel,
    GetReplicById,
    GetReplics,
    GetReplicWhereUserParticipate,
    JoinReplic,
    RemoveReplicByChannel,
    RemoveReplicById,
    RemoveReplics,
    RunAwayReplic,
    UpdateReplicMessageId,
    UpdateReplicParticipants,
    UpdateReplicStatus,
    UpdateReplicWinner,
    VoteReplic,
    GetWinnerByVotes
};
