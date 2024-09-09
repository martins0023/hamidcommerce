import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { search } from "../../assets";
import { client } from "../../../lib/client";

const SearchBar = () => {
  const [searchInput, setSearchInput] = useState("");
  const [recentSearches, setRecentSearches] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [isSearchBarFocused, setIsSearchBarFocused] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedSearches =
      JSON.parse(localStorage.getItem("recentSearches")) || [];
    setRecentSearches(storedSearches);
  }, []);

  const handleFocus = () => {
    setIsSearchBarFocused(true);
  };

  const handleBlur = () => {
    // Add a slight delay to allow a click on the recent search item before closing the dropdown
    setTimeout(() => {
      setIsSearchBarFocused(false);
    }, 100);
  };

  const handleSearchChange = async (e) => {
    const query = e.target.value;
    setSearchInput(query);

    if (query.length > 0) {
      const fetchedSuggestions = await client.fetch(`
        *[_type == "section" && productName match "${query}*"]{
          productName,
          productPrice,
        }[0...5]
      `);
      setSuggestions(fetchedSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSearch = () => {
    if (searchInput.trim() === "") return;

    const updatedSearches = [
      searchInput,
      ...recentSearches.filter((search) => search !== searchInput),
    ].slice(0, 5);
    setRecentSearches(updatedSearches);
    localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));

    navigate(`/search-results?query=${searchInput}`);
  };

  return (
    <div className="flex flex-row gap-4 items-center relative mt-2 mr-3 ml-3">
      <input
        type="text"
        name="keyword"
        placeholder="Search for Products, Brands..."
        className="bg-white py-4 w-full pl-5 border text-[12px] placeholder:text-black border-none text-black rounded-full outline-none h-[41px] font-normal"
        value={searchInput}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleSearchChange}
      />
      <img
        src={search}
        alt="Search"
        className="absolute right-2 top-1/2 transform -translate-y-1/2 w-[25px] h-[25px]"
        onClick={handleSearch}
      />

      {/* Display recent searches */}
      {/* Display recent searches */}
      {isSearchBarFocused && searchInput === "" && (
        <div className="absolute top-full left-0 w-full bg-white shadow-md z-10 recent-searches p-[14px] mt-2 rounded-md">
          <div className="mb-4">
            <p className="text-[#0000006e] text-[12px] font-medium mb-2">
              Recent Search History
            </p>
            <div className="flex flex-wrap gap-2">
              {recentSearches.map((item, index) => (
                <div
                  key={index}
                  onClick={() => setSearchInput(item)}
                  className="bg-[#E6EAED] text-[12px] text-black p-1 rounded-sm cursor-pointer"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Example categories */}
          <div>
            <p className="text-[#0000006e] text-[12px] font-medium mb-2">
              Categories
            </p>
            <div className="flex flex-wrap gap-2">
              {["Men Fashion", "Home Appliance", "Mobile & Tablet", "TV", "Accessories", "Laptop & Computer", "Automobile", "Electronics", "Woman Fashion"].map(
                (category, index) => (
                  <div
                    key={index}
                    className="bg-[#E6EAED] text-[12px] text-black p-1 rounded-sm cursor-pointer"
                  >
                    {category}
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      )}

      {/* Display autocomplete suggestions */}
      {suggestions.length > 0 && (
        <div className="absolute top-full left-0 w-full bg-white shadow-md z-10 suggestions mt-2 p-[14px] rounded-md">
            <p className="text-[#0000006e] text-[12px] font-medium mb-2">
              Suggestions
            </p>
          {suggestions.map((item, index) => (
            <div
              key={index}
              onClick={() => setSearchInput(item.productName)}
              className="p-2 cursor-pointer text-black text-[12px] hover:bg-gray-100"
            >
              {item.productName}
              <p className="text-[#00000071] text-[12px]">NGN {item.productPrice}</p>
              <hr className="h-2 p-3 m-1 w-full" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
