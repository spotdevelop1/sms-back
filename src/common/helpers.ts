export function random_number() {
    const random = Math.floor(100000 + Math.random() * 900000)
    return random.toString();
}