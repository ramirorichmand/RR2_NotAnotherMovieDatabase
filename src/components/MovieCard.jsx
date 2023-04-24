import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { IMAGE_URL } from '../utils/Endpoints'
import PosterFallBack from '../assets/no-poster.png'
import 'react-lazy-load-image-component/src/effects/blur.css';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';

const MovieCard = ({movie, media}) => {

    const navigate = useNavigate()

  return (
    <div role='button' className='cursor-pointer' onClick={() => {
        navigate(`/${media}/${movie.id}`)
        window.scrollTo(0,0)
        }}>
        <div className='w-[250px] h-[350px] mx-auto lg:mx-0'>
            <LazyLoadImage effect='blur' className='rounded-lg w-full h-full'  width={'250px'} height={'350px'} src={movie.poster_path ? IMAGE_URL + movie.poster_path : PosterFallBack} />
        </div>
        <div className='pl-2 text-center lg:text-left'>
            <p className='text-lg text-white'>{movie.title ? movie.title : movie.name}</p>
            <p className='text-lg text-gray-500'>{movie.release_date ? dayjs(movie.release_date).format("YYYY, MMM D") : dayjs(movie.first_air_date).format("YYYY, MMM D")}</p>
        </div>
    </div>
  )
}

export default MovieCard