export const dateToISOString = (date) => {
    return new Date(date).toISOString().split('T')[0]
}