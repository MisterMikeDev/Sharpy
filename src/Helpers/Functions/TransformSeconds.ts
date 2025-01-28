export const transformSeconds = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const secondsLeft = seconds % 60;

    const minutosString = minutes.toString().padStart(2, "0");
    const segundosString = secondsLeft.toString().padStart(2, "0");

    return `${minutosString}:${segundosString}`;
};
