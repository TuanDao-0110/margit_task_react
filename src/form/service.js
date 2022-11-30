import axios from "axios"


export const getData = async (url) => {
    try {
        const data = await axios.get(url)
        return data
    } catch (error) {

    }
}