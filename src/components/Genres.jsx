import React from 'react'
import { useSelector } from 'react-redux'

const Genres = ({genData, style}) => {
    const genres = useSelector((state) => state.MovieHome.genres)
  return (
    <div className={`absolute ${style}`}>
        {genData.map((eachGen) => {
            if(!genres[eachGen]) return 
            return <span key={crypto.randomUUID()} className='mt-1 text-white bg-[#da2f68] px-3 py-[1px]'>{genres[eachGen]}</span>
        })}
    </div>
  )
}

export default Genres