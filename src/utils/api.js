import axios from "axios"

export const BASE_URL = 'https://api.themoviedb.org/3/'
const TMDB_TOKEN = import.meta.env.VITE_APP_API_TOKEN

export const fetchDataFromApi = async (url, params) =>{
    try{
        const res = await axios.get(BASE_URL + url, {
            headers:{
                Authorization: `Bearer ${TMDB_TOKEN}`
            },
            params
        })
        return res
    }catch(err){
        console.log(err.message)
        return err
    }
}
