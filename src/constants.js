export const TMDB_BASE_URL = 'https://api.themoviedb.org/3/';
export const BASE_IMAGE_URL = "https://image.tmdb.org/t/p/w500";
// export const BASE_LOCAL_URL = "https://entertainment-app-backend-k2wa.onrender.com/";
export const BASE_LOCAL_URL="http://localhost:4000/"


export const MEDIA_TYPE = {
  MOVIES : 'movie',
  TV_SERIES : 'tv-series'
}

export const UI_MESSAGES = {
  NO_MOVIES:"No Movies found.",
  NO_TV_SERIES: "No TV Series found.",
  RENDER_LOADING: `We use Free Version of Render service for backend.
      It may take upto 50 seconds for the service to get activated on initaly requests.`
};
// Action types
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
