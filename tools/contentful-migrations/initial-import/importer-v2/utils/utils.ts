export const truncate = (input, length) =>
    input.length > length ? `${input.substring(0, length)}...` : input
