export const predictGender = (username: string): "M" | "F" => {
    const regexF = /(a$|elle$|ina$|ette$)/i;
    const regexM = /(o$|el$|ito$|in$)/i;
    if (regexF.test(username)) return "F";
    if (regexM.test(username)) return "M";
    return "M";
};
