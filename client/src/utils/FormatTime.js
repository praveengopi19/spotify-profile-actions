export function formatTime(millisecond) {
    let min = (millisecond / 60000).toFixed(2) + ''
    return min.replace('.', ':')
}
