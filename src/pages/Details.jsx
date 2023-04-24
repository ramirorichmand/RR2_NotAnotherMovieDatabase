import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../utils/api";
import DetailsBanner from "../components/DetailsBanner";
import Cast from "../components/Cast";
import MovieCarousel from "../components/MovieCarousel";
import MovieCarousel3 from "../components/MovieCarousel3";

const Details = () => {
  const { mediaType, id } = useParams();
  // console.log(useParams())

  const [mediaDetails, setMediaDetails] = useState();
  const [director, setDirector] = useState([])
  const [cast, setCast] = useState([])
  const [similarMovies, setSimilarMovies] = useState([])
  const [recommendations, setRecommendations] = useState([])
  const [video, setVideo] = useState({})

  const headers = {
    Authorization: `Bearer ${import.meta.env.VITE_APP_API_TOKEN}`,
  };
  const getMediaDetails = async () => {
    const res = await axios.get(BASE_URL + mediaType + "/" + id, { headers });
    // console.log(res);
    setMediaDetails(res.data);
  };

  const getCrewDetaisl = async() =>{
    const res = await axios.get(BASE_URL + mediaType + "/" + id + '/credits', { headers });
    // console.log(res)
    setDirector(res.data.crew)
    setCast(res.data.cast)
  }

  const getSimilar = async () =>{
    const res = await axios.get(BASE_URL + mediaType + '/' + id + '/similar', {headers})
    console.log(res)
    setSimilarMovies(res.data.results)
  }

  const getRecommendations = async () =>{
    const res = await axios.get(BASE_URL + mediaType + '/' + id + '/recommendations', {headers})
    console.log(res)
    setRecommendations(res.data.results)
  }

  const getVideos = async () =>{
    const res = await axios.get(BASE_URL + mediaType + '/' + id + '/videos', {headers})
    res.data.results.map((eachRes) =>{
      return eachRes.type === "Trailer" ? setVideo(eachRes) : null
    })
  }

  useEffect(() => {
    getMediaDetails();
    getCrewDetaisl()
    getSimilar()
    getRecommendations()
    getVideos()
  }, [mediaType, id]);
  return (
    <>
      <DetailsBanner mediaDetails={mediaDetails} director={director} video={video} />
      <Cast cast={cast} />
      <MovieCarousel3 name={'Similar Movies'} moviesData={similarMovies} />
      <MovieCarousel3 name={'Recommendations'} moviesData={recommendations} />
    </>
  );
};

export default Details;
