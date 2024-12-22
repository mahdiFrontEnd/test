export const convertPersianNumberToEng = (e) => {
    if (e) {
        return e.replace(/[\u0660-\u0669\u06f0-\u06f9]/g, (a) => {
            // eslint-disable-next-line no-bitwise
            return a.charCodeAt(0) & 0xf
        })
    }
    return e

}