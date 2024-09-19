import React, { useEffect, useState } from "react";
import { client, urlFor } from "../../../lib/client";
import { search, favorite, favorited } from "../../assets";
import { useNavigate } from "react-router-dom";
import { styles } from "../../styles";
import BottomNavbar from "../dashboard/BottomNavbar";

const SearchResults = () => {
  const [results, setResults] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [sortOption, setSortOption] = useState("Popular");
  const [searchInput, setSearchInput] = useState("");
  const [recentSearches, setRecentSearches] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const storedSearches =
      JSON.parse(localStorage.getItem("recentSearches")) || [];
    setRecentSearches(storedSearches);
  }, []);

  const handleSearchChange = async (e) => {
    const query = e.target.value;
    setSearchInput(query);
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

  const query = new URLSearchParams(window.location.search).get("query");

  useEffect(() => {
    fetchResults();
  }, [query, sortOption]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        fetchMoreResults();
      }
    });

    const sentinel = document.querySelector("#sentinel");
    if (sentinel) observer.observe(sentinel);

    return () => observer.disconnect();
  }, [results]);

  const fetchResults = async () => {
    const searchResults = await client.fetch(`
      *[_type == "section" && productName match "${query}*"]{
        productName,
        productBrand,
        productPrice,
        productImage,
        productRating,
        reviewsCount,
        slug
      }[0...10] | order(productPrice ${
        sortOption === "Price: Low to High" ? "asc" : "desc"
      })
    `);
    setResults(searchResults);
  };

  const fetchMoreResults = async () => {
    const moreResults = await client.fetch(`
      *[_type == "section" && productName match "${query}*"]{
        productName,
        productBrand,
        productPrice,
        productImage,
        productRating,
        reviewsCount,
        slug
      }[${results.length}...${results.length + 10}]
    `);
    setResults((prevResults) => [...prevResults, ...moreResults]);
  };

  const toggleFavorite = (slug) => {
    if (favorites.includes(slug)) {
      setFavorites(favorites.filter((fav) => fav !== slug));
    } else {
      setFavorites([...favorites, slug]);
    }
  };

  const handleClick = (slug) => {
    if (slug && slug.current) {
      navigate(`/products/${slug.current}`);
    } else {
      console.error("Product slug is undefined");
    }
  };

  return (
    <section className="bg-[#FBFCFF]">
      <div className={`${styles.paddingX} p-5 mr-3 ml-3`}>
        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            name="keyword"
            placeholder="Search for Products, Brands..."
            className="bg-white py-4 w-full pl-5 border text-[12px] placeholder:text-black border-[#212C624F] text-black rounded-full outline-none h-[41px] font-normal"
            value={searchInput}
            onChange={handleSearchChange}
          />
          <img
            src={search}
            alt="Search"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 w-[25px] h-[25px]"
            onClick={handleSearch}
          />
        </div>

        {/* Sorting & Results Info */}
        <div className="flex justify-between items-center mt-4 mb-2">
          <p className="text-black font-medium text-[13px]">
            {results.length}{" "}
            {results.length > 0 ? results[0].productName : "product"} found
          </p>
          <div className="flex items-center space-x-2">
            <p className="text-gray-600 text-[13px]">Sort BY:</p>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="p-1 border-none bg-none rounded-xl text-black text-[13px]"
            >
              <option value="Popular">Popular</option>
              <option value="Price: Low to High">Price: Low to High</option>
              <option value="Price: High to Low">Price: High to Low</option>
              <option value="Top Rated  ">Top Rated</option>
              <option value="Newest Item">Newest Item</option>
            </select>
          </div>
        </div>

        {/* Search Results Grid */}
        <div className="grid grid-cols-2 gap-4 mt-4">
          {results.map((item) => (
            <div
              onClick={() => handleClick(item.slug)}
              key={item.slug.current}
              className="bg-white rounded-xl h-auto shadow-sm w-full justify-evenly flex flex-col gap-0 p-3 relative cursor-pointer"
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(item.slug);
                }}
                className="absolute top-2 right-2"
              >
                <img
                  src={favorites.includes(item.slug) ? favorited : favorite}
                  alt="Favorite Icon"
                  className="w-5 h-5"
                />
              </button>
              <img
                src={urlFor(item.productImage[0])}
                className="w-[131px] h-[130px]"
                alt={item.productName}
              />
              <p className="text-[#212C62] text-[11px] font-medium text-left">
                {item.productName}
              </p>
              <p className="text-[#00000086] font-normal text-[10px] text-left">
                {item.productBrand}
              </p>
              <p className="text-black text-[14px] h-[21px] font-medium text-left">
                NGN {item.productPrice}
              </p>
              <div className="flex items-center text-left">
                <p className="text-[#00000086] font-normal text-[10px] ml-1">
                  <span className="font-semibold">
                    {item.productRating || 0}
                  </span>{" "}
                  ({item.reviewsCount})
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Infinite Scroll Sentinel */}
        <div id="sentinel"></div>
      </div>
      <BottomNavbar />
    </section>
  );
};

export default SearchResults;
