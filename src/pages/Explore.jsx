import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Select from 'react-select';
import { BASE_URL } from '../utils/api';
import { Endpoints } from '../utils/Endpoints';
import MovieCard from '../components/MovieCard';


const Explore = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  const {media_type} = useParams()
  const [genre, setGenre] = useState([])
  const [shows, setShows] = useState([])

  const getMovieOrTvGenre = () =>{
    axios.get(BASE_URL + Endpoints.GENRE + media_type + '/list', {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_APP_API_TOKEN}`
      }
    })
    .then((res) => setGenre(res.data.genres))
  }

  // start from here using the get discover endpoint :)

  const Options = () =>{
    const opts = genre.map((gen) => {
      const newOption = {}
      newOption['label'] = gen.name
      newOption['value'] = gen.id
      return newOption
    })
    return opts
  }
  // console.log(selectedOption)

  const discoverShows = async () => {
    try {
      const res = await axios.get(`${BASE_URL}discover/${media_type}`, {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_APP_API_TOKEN}`
        }
      })
      // console.log(genreParam)
      setShows(res.data.results)
    } catch (err) {
      console.log(res)
    } 
  }

  const SearchByGenre = async () =>{
    const genreParam = selectedOption?.map((eachOption) =>{
      return eachOption.value
    })
    const res = await axios.get(`${BASE_URL}discover/${media_type}`, {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_APP_API_TOKEN}`
      }, 
      params:{
        with_genres: genreParam.join(", ")
      }
    })
    // console.log(genreParam)
    setShows(res.data.results)
  }

   

  useEffect(() =>{
    getMovieOrTvGenre()
    if(selectedOption) {
      SearchByGenre()
    }else{
      discoverShows()
    }
  }, [media_type, selectedOption])
  // console.log(selectedOption)

  return (
    <div className='w-full min-h-[100vh]'>
      <div className='max-w-[1200px] mx-auto px-5 mt-[8rem]'>
        <div className='flex justify-between flex-col sm:flex-row gap-8 sm:gap-0'>
            <h1 className='text-white text-3xl'>Explore {media_type === "movie" ? 'Movies' : 'TV Shows'}</h1>
            <div>
              <Select 
              placeholder='Select a genre'
              isMulti
              defaultValue={selectedOption}
              options={Options()}
              isSearchable
              onChange={setSelectedOption}
              />
            </div>
        </div>
        <div className='grid md:grid-cols-2 lg:grid-cols-4 my-8 gap-8'>
          {shows.map(show => (
              <MovieCard key={crypto.randomUUID()} movie={show} media={media_type} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Explore