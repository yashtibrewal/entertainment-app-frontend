import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Bookmarks from "./pages/Bookmarks";
import HomePage from "./pages/HomePage";
import Movies from "./pages/Movies";
import TVSeries from "./pages/TVSeries";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Navbar from "./components/navbar";
import Search from "./components/search";
import { AuthProvider, useAuth } from "./store/auth";
import ProtectedRoute from "./store/ProtectedRoute";
import Logout from "./pages/Logout";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="main-container flex flex-col md:flex-row min-h-screen bg-black text-white">
          {/* Navbar */}
          <div className="w-full md:w-16 h-auto md:h-screen">
            <Navbar />
          </div>
          <div className=" main-container flexing flex flex-col flex-1">
            {/* Search Component */}
            <div className="padding flex-shrink-0 p-4">
              <Search />
            </div>
            {/* Routes */}
            <div className="flexing flex-1 px-16 overflow-auto md:mt-8">
              <Routes>
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="/login" element={<Login />} />
                <Route path="/logout" element={<Logout />} />
                <Route index path="/" element={<HomePage />} />
                <Route path="/bookmark" element={<Bookmarks />} />
                <Route path="/movies" element={<Movies />} />
                <Route path="/tv-series" element={<TVSeries />} />    
                {/* <Route element={<ProtectedRoute />}>
                </Route> */}
              </Routes>
            </div>
          </div>
        </div>
      </AuthProvider>
    </BrowserRouter>

  );
}

export default App;
