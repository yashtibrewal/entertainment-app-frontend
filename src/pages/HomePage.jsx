import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";

import {
  fetchAllMovieBookmarks,
  fetchAllMovies,
} from "../store/Redux/MovieSlice";

import style from "./../components/common-media/content.module.css";

import Trending from "./TrendingMovies/trending";
import List from "../components/Content/List";
import { clearSearchResults } from "../store/Redux/SearchSlice";
import { fetchAllTVSeries, fetchAllTVSeriesBookmarks } from "../store/Redux/TvSeriesSlice";
import { MEDIA_TYPE } from "../constants";

export default function HomePage() {
  const dispatch = useDispatch();
  const {
    searchedMovies,
    popularMovies,
    trendingMovies,
    movieBookmarks,
    loading: moviesLoading,
    error: moviesError,
  } = useSelector((state) => state.movies);
  const {
    trending: trendingTVSeries,
    popular:popularTVSeries,
    tvSeriesBookmarks,
    loading: tvSeriesLoading,
    error: tvSeriesError,
  } = useSelector((state) => state.tvSeries);
  const { loading } = useSelector((state) => state.search);
  const [popMovies, setPopMovies] = useState([]);
  const [mergedPopular, setMergedPopular] = useState([]);

  const [trendingMoviesLocal, setTrendingMoviesLocal] = useState([]);
  const [mergedTrending, setMergedTrending] = useState([]);
  const [trendingMoviesCache, setTrendingMoviesCache] = useState([]);
  const [popularMoviesCache, setPopularMoviesCache] = useState([]);

  useEffect(() => {
    dispatch(fetchAllMovies());
    dispatch(fetchAllMovieBookmarks());
    dispatch(fetchAllTVSeries());
    dispatch(fetchAllTVSeriesBookmarks());
  }, []);

  // merging trendingMovies & trendingTVSeries
  useEffect(() => {
    const merged = [
      ...trendingMovies.map((movie) => ({ ...movie, media_type: MEDIA_TYPE.MOVIES })),
      ...trendingTVSeries.map((tv) => ({ ...tv, media_type: MEDIA_TYPE.TV_SERIES })),
    ];
    setMergedTrending(merged);
  }, [trendingMovies, trendingTVSeries]);
  // merging popularMovies & popularTVSeries
  useEffect(() => {
    const merged = [
      ...popularMovies.map((movie) => ({ ...movie, media_type: MEDIA_TYPE.MOVIES })),
      ...popularTVSeries.map((tv) => ({ ...tv, media_type: MEDIA_TYPE.TV_SERIES })),
    ];
    setMergedPopular(merged);
  }, [popularMovies, popularTVSeries]);

  useEffect(() => {
    // Add the present movies to a cache,
    // Show the searched movies.

  
    if (searchedMovies.length > 0) {
      setPopularMoviesCache([...popMovies]);
      setTrendingMoviesCache([...trendingMoviesLocal]);
      setPopMovies([]);
      setTrendingMoviesLocal([]);

 
    } else {
      dispatch(clearSearchResults());
      setPopMovies(popularMoviesCache);
      setTrendingMoviesLocal(trendingMoviesCache);
    }
  }, [searchedMovies.length]);

  /**
   * Used to add bookmark field.
   */
  const populateBookmark = useCallback(
    (content) => {
      if(content.media_type === MEDIA_TYPE.MOVIES) {
      
      let bookmark = false;
      const searchedMovie = movieBookmarks.find(
        (bookmarkObj) => bookmarkObj.movie_id === content.id
      );
      if (searchedMovie) {
        bookmark = searchedMovie.bookmark;
      }
      const updatedMovie = { ...content, bookmark };
      return updatedMovie;
    }else{

      let bookmark = false;
      const searchedTV = tvSeriesBookmarks.find(
        (bookmarkObj) => bookmarkObj.tv_series_id === content.id
      );
      if (searchedTV) {
        bookmark = searchedTV.bookmark;
      }
      const updatedTV = { ...content, bookmark };
      return updatedTV;
    }
        
    },
    [movieBookmarks, tvSeriesBookmarks]
  );

  /**
   * Used to add media_type field.
   */
  const setMediaType = (item) => {
    return { 
      ...item, 
      media_type: item.title ? MEDIA_TYPE.MOVIES : MEDIA_TYPE.TV_SERIES // using tiltle to identify movies
    };
  };

  useEffect(() => {
    const sortedMergedPopular = mergedPopular
      .sort((a, b) => b.popularity - a.popularity)
      .map(setMediaType); // sorting via popularity
    const popularMoviesWithBookmark =
      sortedMergedPopular.map(populateBookmark);
    setPopMovies(popularMoviesWithBookmark);
  }, [mergedPopular, populateBookmark]);
  
  useEffect(() => {
    const trendingMoviesWithMediaType =  mergedTrending
      .sort((a, b) => b.popularity - a.popularity)
      .map(setMediaType);  // sorting via popularity
    const trendingMoviesWithBookmark =
      trendingMoviesWithMediaType.map(populateBookmark);
    setTrendingMoviesLocal(trendingMoviesWithBookmark);
  }, [mergedTrending, populateBookmark]);

  if (moviesLoading) return <p>Loading movies...</p>;
  if (moviesError) return <p>Error: {moviesError}</p>;

  /**
   * To only show searched results.
   * @returns html template
   */
  const renderSearchedMovies = () => (
    <div className="md:ml-4 p-4 max-w-[calc(100vw-120px)] home-width">
      <div className={style.content}>
         <List cards={searchedMovies}></List>
      </div>
    </div>
  );

 
  if (searchedMovies.length) return renderSearchedMovies();
  console.log("searchedMovies.length :",searchedMovies.length);

  return (
    <div className="">
      {/* Trending Section */}
      <div className="md:ml-4 p-4 max-w-[calc(100vw-120px)]">
        <Trending trendingMovies={trendingMoviesLocal} />
      </div>

      <div className="md:ml-4 p-4 max-w-[calc(100vw-120px)] home-width">
        <h1 className="mb-4 font-semibold text-2xl text-white">
          Recommended for you
        </h1>
        <div className={style.content}>
          <List cards={popMovies} />
        </div>
      </div>
    </div>
  );
}
