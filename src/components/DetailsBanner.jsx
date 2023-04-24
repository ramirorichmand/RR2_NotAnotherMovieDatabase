import React from 'react'
import dayjs from "dayjs";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { IMAGE_URL } from "../utils/Endpoints";
import { LazyLoadImage } from "react-lazy-load-image-component";
import NoPosterImg from '../assets/no-poster.png'
import {BsFillPlayCircleFill} from 'react-icons/bs'

const DetailsBanner = ({director, mediaDetails, video}) => {
  return (
    <div
    className="w-full min-h-[90vh] relative"
    style={{ background: `url(${IMAGE_URL + mediaDetails?.backdrop_path})` }}
  >
    {/* overlay  */}
    <div className="absolute bg-[#04152d] opacity-[0.85] inset-0"></div>

    {/* overlay Text  */}
    <div className="max-w-[1200px] mx-auto px-5 h-full pt-[5rem] relative z-30">
      <div className="grid md:grid-cols-2 pb-[10%] gap-[2rem] md:gap-0">
        <div>
          <LazyLoadImage
            width={350}
            height={300}
            src={mediaDetails?.poster_path ? IMAGE_URL + mediaDetails?.poster_path : NoPosterImg}
            alt=""
            className="rounded-lg mx-auto"
          />
        </div>
        <div className='text-center md:text-left'>
          <h1 className="text-2xl md:text-4xl text-white">
            {mediaDetails?.original_title || mediaDetails?.title} (
            {dayjs(mediaDetails?.release_date).format("YYYY")})
          </h1>
          <h6 className="text-xl text-gray-400">{mediaDetails?.tagline}</h6>
          <div className="flex gap-3 mt-4 justify-center md:justify-start">
            {mediaDetails?.genres.map((genre) => (
              <p key={crypto.randomUUID()} className="bg-[#da2f68] text-white px-[5px] py-[3px] text-[12px] rounded">
                {genre.name}
              </p>
            ))}
          </div>
          <div className="mt-5 flex items-center gap-[2rem] justify-center md:justify-start">
            <div className="w-[80px] h-[80px]">
              <CircularProgressbar
                maxValue={10}
                value={mediaDetails?.vote_average}
                text={mediaDetails?.vote_average}
                styles={buildStyles({
                  textSize: '28px',
                  textColor: '#fff',
                  pathColor:
                    mediaDetails?.vote_average < 5
                      ? "red"
                      : mediaDetails?.vote_average > 7
                      ? "green"
                      : "orange",
                })}
              />
            </div>
            <div>
              <button onClick={() => window.open(`https://www.youtube.com/watch?v=${video.key}`)} className='bg-grd text-white px-4 py-2 flex items-center gap-2 rounded-sm'><BsFillPlayCircleFill />Watch Trailer</button>
            </div>
          </div>
          <div>
            <h3 className="uppercase text-2xl text-white my-3">Overview</h3>
            <p className="text-white text-lg font-inter md:pr-[5rem]">{mediaDetails?.overview}</p>
          </div>
          <div className="mt-2 py-3 border-b border-gray-500">
            {/* status etc  */}
            <div className="text-white flex space-x-6 text-xl">
                <p>Status: <span className="text-gray-500">{mediaDetails?.status}</span></p>
                <p>Release Date: <span className="text-gray-500">{dayjs(mediaDetails?.release_date).format("MMM D, YYYY")}</span></p>
                <p>Runtime: <span className="text-gray-500">{mediaDetails?.runtime} mins</span></p>
            </div>
          </div>
          <div className="mt-2 py-3 border-b border-gray-500">
            {/* Director etc  */}
            <div className="text-white flex space-x-6 text-xl">
               <p>Director: {director?.map(person => (
                  person.job === "Director" && <span key={crypto.randomUUID()} className="text-gray-500">{person?.name || person?.original_name}</span> 
               ))}</p>
            </div>
          </div>
          <div className="mt-2 py-3 border-b border-gray-500">
            {/* writers etc  */}
            <div className="text-white flex space-x-6 text-xl">
               <p>Writers: {director?.map(person => (
                  person.job === "Writer" && <span key={crypto.randomUUID()} className="text-gray-500">{person?.name || person?.original_name}</span> 
               ))}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* overlay opacity  */}
    <div className='opacity-background absolute bottom-0 left-0 right-0 h-[250px]'></div>
  </div>
  )
}

export default DetailsBanner