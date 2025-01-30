export function CalcXpForMessage(mensaje: string, multiplicador: number): number {
    const palabras = mensaje.split(" ");
    let totalXp = 0;

    for (const palabra of palabras) {
        const longitud = palabra.length;
        let xpPalabra = 0;

        if (longitud <= 4) {
            xpPalabra = longitud * 0.3;
        } else {
            xpPalabra = longitud;
        }

        totalXp += xpPalabra;
    }

    const xpMax = 25 * multiplicador;
    let xpFinal = totalXp * multiplicador;
    xpFinal = Math.min(xpFinal, xpMax) * 0.45;

    return parseFloat(xpFinal.toFixed(2));
}
