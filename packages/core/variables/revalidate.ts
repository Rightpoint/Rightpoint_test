const SECOND = 1
const MINUTE = 60
const HOUR = MINUTE * 60
const DAY = HOUR * 24

export const revalidate = {
    default: SECOND * 10,
}
