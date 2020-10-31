export function statusToString(s) {
    return {
        0: "In lucru",
        1: "Respins",
        2: "Validat",
    }[s];
}