export const getLocalStorage = (prop) => {
    const local = localStorage.getItem(prop)
    return local ? JSON.parse(local) : null
}
export const setLocalStorage = (prop, value) => {
    localStorage.setItem(prop, JSON.stringify(value))
}

export const removeItemsLocalStorage = (prop) => {
    localStorage.removeItem(prop)
}