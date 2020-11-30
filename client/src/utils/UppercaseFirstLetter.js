export function uppercaseFirstLetter(key) {
    let tempString = key.substring(0, 1)
    return (tempString.toUpperCase() + key.substring(1))
}