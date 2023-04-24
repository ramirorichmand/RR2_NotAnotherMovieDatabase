import React, { useEffect, useState } from "react";
import SwitchTabs from "./SwitchTabs";
import { fetchDataFromApi } from "../utils/api";
import { Endpoints, IMAGE_URL } from "../utils/Endpoints";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import dayjs from "dayjs";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Genres from "./Genres";
import { useNavigate } from "react-router-dom";
import NoPoster from '../assets/no-poster.png'
import 'react-lazy-load-image-component/src/effects/blur.css';


const MovieCarousel = ({ name, dataTab }) => {
  const navigate = useNavigate()
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const dayOrWeekORTvOrMovie = () => {
    return activeTab === 0 ? dataTab[0] : dataTab[1];
  };
  const getMovies = () => {
    const dayOrWeekORTvOrMovieVar = dayOrWeekORTvOrMovie();
    fetchDataFromApi(Endpoints.MOVIE_TRENDING + dayOrWeekORTvOrMovieVar).then(
      (res) => {
        // console.log(res);
        setTrendingMovies(res.data.results);
      }
    );
  };

  useEffect(() => {
    getMovies();
  }, [activeTab]);

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 1024 },
      items: 4,
    },
    desktop: {
      breakpoint: { max: 1024, min: 768 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 768, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <div className="max-w-[1200px] mx-auto px-5 my-[2rem]">
      <div className="text-white flex sm:justify-between sm:items-center flex-col sm:flex-row mb-[2.5rem]">
        <h2 className="text-3xl font-semibold font-mono mb-6 sm:mb-0">
          {name}
        </h2>
        <div className="flex bg-slate-50 text-black px-2 py-1 gap-2 rounded-full self-start sm:self-stretch">
          <SwitchTabs
            setActiveTab={setActiveTab}
            activeTab={activeTab}
            data={dataTab}
          />
        </div>
      </div>
      <Carousel
        responsive={responsive}
        infinite={true}
        keyBoardControl={true}
        containerClass="carousel-container"
        itemClass="carousel-item-padding-40-px"
        slidesToSlide={2}
      >
        {trendingMovies.map((movie) => {
          const posterURL = IMAGE_URL + movie.poster_path;
          return (
            <div key={movie.id} className="cursor-pointer" onClick={() => navigate(`/${movie.media_type}/${movie.id}`)}>
              <div className="relative">
                <LazyLoadImage
                  effect="blur"
                  width={'100%'}
                  height={'100%'}
                  className="rounded-lg h-[400px] w-[250px] mx-auto"
                  src={movie.poster_path ? posterURL : NoPoster}
                />
                <div className="w-[50px] h-[50px] absolute bottom-[-10px] left-[50px] xl:left-[20px]">
                  <CircularProgressbar
                    className="bg-white rounded-full p-[3px]"
                    styles={buildStyles({
                      textSize: "35px",
                      pathColor: 
                      movie.vote_average < 5 ? "red" : movie.vote_average < 7 ? "orange" : 'green'
                    })}
                    value={movie.vote_average.toFixed(1)}
                    maxValue={10}
                    text={movie.vote_average.toFixed(1)}
                  />
                  <Genres genData={movie.genre_ids.slice(0, 2)} style={'bottom-[27px] hidden xl:flex right-[-180px] flex flex-col items-end'} />
                </div>
              </div>
              <div className="text-center mt-5">
                <span className="text-white block">
                  {movie.title || movie.name}
                </span>
                <span className="block text-slate-500">
                  {dayjs(movie.release_date).format("MMM D, YYYY")}
                </span>
              </div>
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};

export default MovieCarousel;
