export const converterValue = (value, type) => {
    return value.toLowerCase().split("").filter(item => item !== " ").join("");
}