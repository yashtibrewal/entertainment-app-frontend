import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useEffect, useState } from "react";

import { fetchAllMovieBookmarks, fetchAllMovies } from '../components/Redux/MovieSlice';

import style from './../components/common-media/content.module.css';
import '../App.css'

import Trending from './TrendingMovies/trending';
import List from '../components/Content/List'


export default function HomePage() {

  const dispatch = useDispatch();
  const { popularMovies, trendingMovies, movieBookmarks, loading,
          error } = useSelector((state) => state.movies);
  const [popMovies, setPopMovies] = useState([]);
  const [trendingMoviesLocal, setTrendingMoviesLocal] = useState([]);

  //  console.log("popularMovies :",popularMovies);


  useEffect(() => {
    dispatch(fetchAllMovies());
    dispatch(fetchAllMovieBookmarks());
  }, [dispatch]);

  const populateBookmark = useCallback((movie) => {
    let bookmark = false;
    const searchedMovie = movieBookmarks.find((bookmarkObj) => bookmarkObj.movie_id === movie.id);
    if (searchedMovie) {
      bookmark = searchedMovie.bookmark;
    }
    const updatedMovie = { ...movie, bookmark };
    return updatedMovie;
  }, [movieBookmarks])

  const setMediaAsMovie = movie => { return { ...movie, media_type: 'movie' }; }

  useEffect(() => {
    const popularMoviesWithMedia = popularMovies.map(setMediaAsMovie);
    const popularMoviesWithBookmark = popularMoviesWithMedia.map(populateBookmark);
    setPopMovies(popularMoviesWithBookmark);
  }, [popularMovies, populateBookmark])

  useEffect(() => {
    const trendingMoviesWithMediaType = trendingMovies.map(setMediaAsMovie);
    const trendingMoviesWithBookmark = trendingMoviesWithMediaType.map(populateBookmark);
    setTrendingMoviesLocal(trendingMoviesWithBookmark);
  }, [trendingMovies, populateBookmark]);

  if (loading) return <p>Loading movies...</p>;
  if (error) return <p>Error: {error}</p>;

  return (

    <div className="overflow-x-hidden">
      {/* Trending Section */}
      <div className="md:ml-4 p-4 max-w-[calc(100vw-120px)]">
        <Trending trendingMovies={trendingMoviesLocal} />
      </div>

      {/* Recommended Section  */}
      <div className="md:ml-4 p-4 max-w-[calc(100vw-120px)] home-width">
        <h1 className="mb-4 font-semibold text-2xl text-white">Recommended for you</h1>

        {/* Responsive grid layout for Recommended */}
        <div className={style.content}>
          {popMovies.map((card, index) => (
            <div key={index}>
              <List card={[card]} />
            </div>
          ))}
        </div>
      </div>
    </div>

  );
}