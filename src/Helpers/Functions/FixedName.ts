export function FixedName(name: string) {
    const nameWithSpaces = name.replace(/-/g, " ");
    const words = nameWithSpaces
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1));
    return words.join(" ");
}
