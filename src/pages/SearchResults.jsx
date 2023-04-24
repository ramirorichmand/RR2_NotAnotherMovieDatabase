import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../utils/api";
import { Endpoints } from "../utils/Endpoints";
import MovieCard from "../components/MovieCard";
import ClipLoader from "react-spinners/ClipLoader";


const SearchResults = () => {
  const { query } = useParams();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false)

  const getMovieData = () => {
    setLoading(true)
    axios
      .get(BASE_URL + Endpoints.MOVIE_SEARCH + `?query=${query}`, {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_APP_API_TOKEN}`,
        },
      })
      .then((res) => {
        setData(res.data.results);
        console.log(res);
      })
      .catch((err) => console.log(err.message))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    getMovieData()
  }, [query]);

  if(loading){
    return (
      <div className="relative h-[100vh]">
        <div className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]">
        <ClipLoader
        color={'#35d2b3'}
        size={50}
        aria-label="Loading Spinner"
        data-testid="loader"
        />
        </div>
        </div>
    )
  }

  return (
    <div className="max-w-[1200px] mx-auto px-5 pb-[10%] mt-[8rem]">
      <div className="my-8">
        <h1 className="text-xl text-white">Showing results for: "{query}"</h1>
      </div>
      {data.length ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {data.map((movie) => (
            <MovieCard key={crypto.randomUUID()} movie={movie} media={movie.media_type} />
          ))}
        </div>
      ) : (
        <div className="text-center h-[50vh]">
          <p className="text-white text-2xl">No results found for "{query}"</p>
        </div>
      )}
    </div>
  );
};

export default SearchResults;
