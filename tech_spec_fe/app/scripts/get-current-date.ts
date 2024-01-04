export const getDate = () => {
    return new Date().toJSON()
        .substring(0, new Date().toJSON().indexOf("T"))
}

export default getDate;