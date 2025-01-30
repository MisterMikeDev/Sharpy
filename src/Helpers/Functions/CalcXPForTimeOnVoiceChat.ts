export function CalcXPForTimeOnVoiceChat(
    timestampOnVoice: number,
    multiplicador: number
): number {
    const totalMinutes = timestampOnVoice / 60000;

    const xpBasePerMinute = 1.75;
    let xpTotal = totalMinutes * xpBasePerMinute * multiplicador;

    const xpMax = 100 * multiplicador;
    xpTotal = Math.min(xpTotal, xpMax);

    return parseFloat(xpTotal.toFixed(2));
}
