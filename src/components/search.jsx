import { FaSearch } from "react-icons/fa";
import "../App.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import {
  clearSearchResults,
  searchMovies,
  searchTVSeries,
} from "../store/Redux/SearchSlice";
import List from "./Content/List";
import { MEDIA_TYPE } from "../constants";

export default function Search() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState([]);
  const dispatch = useDispatch();
  const location = useLocation();

  const { movies, tvSeries } = useSelector((state) => state.search);

  useEffect(() => {
    const merged = [
      ...movies.map((movie) => ({ ...movie, media_type: MEDIA_TYPE.MOVIES })),
      ...tvSeries.map((tv) => ({ ...tv, media_type: MEDIA_TYPE.TV_SERIES })),
    ];
    setResult(merged);
  }, [movies, tvSeries]);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (input.trim()) {
        dispatch(searchMovies(input));
       
        dispatch(searchTVSeries(input));
      } else {
        const path = location.pathname;
        switch (path) {
          case "/":
          case "/movies":
          case "/tv-series":
            dispatch(clearSearchResults());
            break;

          // TODO: implement search for bookmarks
          case "/bookmark":
            break;

          default:
            console.warn("Unhandled route:", path);
            break;
        }
      }
    }, 500); // Reduced debounce time for better UX

    return () => {
      clearTimeout(handler);
    };
  }, [input, dispatch, location.pathname]);

 

// re-rendering component when route changes
  useEffect(() => {
    setInput("");   /// resetting input field
    dispatch(clearSearchResults());
  }, [location.pathname]);

  return (
    <>
      <div className="flex gap-2 justify-center mt-4 ml-4 sm:justify-start sm:ml-8">
        <div>
          <FaSearch className="w-7 h-5 mt-3 text-white" />
        </div>
        <div>
          <input
            type="search"
            name="search"
            id="search"
            autoFocus
            onChange={(e) => setInput(e.target.value)}
            value={input}
            placeholder="Search for movies or TV series"
            className="h-10 w-full sm:w-96 min-w-[200px] text-xl bg-black text-white outline-none px-3"
          />
        </div>
      </div>
      {/* Rendering the results */}
      {
        <div className="flex gap-4">
          <List cards={result} />
        </div>
      }
      {result.length === 0 && input.trim() !== "" && (
        <div className="text-center text-white mt-4">No results found</div>
      )}
    </>
  );
}
