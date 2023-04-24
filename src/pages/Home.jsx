import React, { useEffect } from 'react'
import HeroBanner from '../components/HeroBanner'
import MovieCarousel from '../components/MovieCarousel'
import MovieCarousel2 from '../components/MovieCarousel2'
import { Endpoints } from '../utils/Endpoints'
import axios from 'axios'
import { BASE_URL } from '../utils/api'
import { useDispatch } from 'react-redux'
import { getGenresConfig } from '../slices/MovieHomeSlice'

const Home = () => {

  const dispatch = useDispatch()

  const getGenre = async () =>{
      const promise1 = await axios.get(BASE_URL + `/genre/tv/list`, {
        headers:{
          Authorization: `Bearer ${import.meta.env.VITE_APP_API_TOKEN}`
        }
      })
      const promise2 = await axios.get(BASE_URL + `/genre/movie/list`, {
        headers:{
          Authorization: `Bearer ${import.meta.env.VITE_APP_API_TOKEN}`
        }
      })
      let allGenre = {}
      const data = await Promise.all([promise1, promise2])
      data.map(eachData => {
        return eachData.data.genres.map(eachGen =>{
          return allGenre[eachGen.id] = eachGen.name
        })
      })
      // console.log(allGenre)
      dispatch(getGenresConfig(allGenre))
  }
  
  useEffect(() => {
    getGenre()
  })

  return (
    <div>
        <HeroBanner />
        <MovieCarousel name={"Trending"} dataTab={['day', 'week']} />
        <MovieCarousel2 name={'What\'s Popular'} dataTab={['movie', 'tv']} endpoint={Endpoints.MOVIE_TV_POPULAR}  />
        <MovieCarousel2 name={'Top Rated'} dataTab={['movie', 'tv']} endpoint={Endpoints.MOVIE_TV_TOP_RATED} />
    </div>
  )
}

export default Home