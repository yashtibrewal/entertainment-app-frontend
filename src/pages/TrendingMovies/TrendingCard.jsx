import React from "react";
import { FaBookmark } from "react-icons/fa";
import { RiFilmFill } from "react-icons/ri";
import { BASE_IMAGE_URL } from "../../constants";

// This card is the wider card used compared to other cards. These cards are placed first.
const TrendingCard = ({ poster_path, name, title,first_air_date  ,release_date, adult,media_type}) => {
// console.log(media_type);
  return (
    <div className="bg-black shadow-lg rounded-lg w-96 text-white overflow-hidden trending-cart">
      <div className="relative">
        <img src={`${BASE_IMAGE_URL}${poster_path}`} alt={title} className="w-full h-48 object-cover object-bottom" />
        {/* TODO: Implement bookmark */}
        <div className="top-2 right-2 absolute bg-transparent p-2 rounded-full text-white cursor-pointer">
          <FaBookmark  />
        </div>
        <div className="bottom-2 left-2 absolute bg-transparent px-2 py-1 rounded text-black text-sm">
          <ul className="flex gap-4 px-2 pl-0">
            <li className="flex items-center font-semibold text-white">
              <span className="mr-1">{release_date?release_date.slice(0,4):first_air_date.slice(0,4)}</span>
            </li>
            <li className="flex items-center font-semibold text-white">
              <RiFilmFill className="mr-1 text-white" />
              <span>{media_type}</span>
            </li>
            <li className="flex items-center font-semibold text-white">
              <span>{adult?"PG":"UG"}</span>
            </li>
          </ul>
          <h3 className="mt-1 font-semibold text-lg text-white">{title?title:name}</h3>
        </div>
      </div>
    </div>
  );
};

export default TrendingCard;
