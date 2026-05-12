import React, { useState } from "react";
import axios from "axios";
import ProfileImage from "../../components/images/ProfileImage";

import { Link } from "react-router-dom";

const Search = () => {

  const [query, setQuery] = useState("");

  const [results, setResults] = useState([]);

  const loggedInUser =
  JSON.parse(localStorage.getItem("user"));

  async function handleSearch(e) {

    const value = e.target.value;

    setQuery(value);

    try {

      const res = await axios.get(
        `http://localhost:3000/api/search/users?q=${value}`
      );

      setResults(res.data);

    } catch (err) {

      console.log(err);

    }

  }

  return (

    <div className="p-2">

      {/* search input */}

      <input
        type="text"
        placeholder="Search users..."
        value={query}
        onChange={handleSearch}
        className="w-full lg:w-1/2 border border-b-gray-700 rounded-lg p-3"
      />

      {/* results */}

      <div className="mt-6 space-y-4">

        {
          results.map((item) => (

            <Link
              key={item.user._id}
              to={`/${loggedInUser.role}/profile/${item.user._id}`}
              className="block bg-white shadow rounded-xl p-4"
            >

              <div className="flex items-center gap-4">

                <div className="w-14 h-14 rounded-full overflow-hidden">
                    <ProfileImage profileImage={item.user.profileImage} />
                </div>


                <div>

                  <p className="font-semibold text-lg">
                    {item.user.name}
                  </p>

                  <p className="text-gray-500">
                    {item.user.role}
                  </p>

                </div>

              </div>

            </Link>

          ))
        }

      </div>

    </div>

  );

};

export default Search;