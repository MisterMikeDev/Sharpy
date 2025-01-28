export const TimeoutMillisecondsConverter = (time: string) => {
    const timeSplit = time.trim().split(/(\d+)/);
    timeSplit.forEach((value, index) => {
        if (value === "") timeSplit.splice(index, 1);
    });

    const [milliseconds, timeType] = timeSplit;

    let ms: number;

    if (timeType === "s") ms = Number(milliseconds) * 1000;
    else if (timeType === "m") ms = Number(milliseconds) * 1000 * 60;
    else if (timeType === "h") ms = Number(milliseconds) * 1000 * 60 * 60;
    else if (timeType === "d") ms = Number(milliseconds) * 1000 * 60 * 60 * 24;
    else if (timeType === "w")
        ms = Number(milliseconds) * 1000 * 60 * 60 * 24 * 7;
    else return null;

    if (ms > 2419200000) return null;

    return ms;
};
