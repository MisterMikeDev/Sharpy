import { User } from "discord.js";

/**
 * Current turn:
 * 0: Acepet/Decline.
 * 1: En espera.
 * 2: Turno del retador.
 * 3: Turno del rival.
 * 4: En votación.
 * 5: Ganador decidido.
 *
 * Vote:
 * 0: No ha votado.
 * 1: Votó por el retador.
 * 2: Votó por el rival.
 */

export type TurnType = 0 | 1 | 2 | 3 | 4 | 5;

export interface Duel {
    id: string;
    messageID?: string;
    challenger: User | null;
    rival: User | null;
    winner?: User;
    currentTurn: TurnType;
    votes: {
        user: User;
        vote: 0 | 1 | 2;
        weight: number;
    }[];
}
