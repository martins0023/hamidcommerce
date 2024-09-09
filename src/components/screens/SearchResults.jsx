import React, { useEffect, useState } from "react";
import { client, urlFor } from "../../../lib/client";

const SearchResults = () => {
  const [results, setResults] = useState([]);
  const query = new URLSearchParams(window.location.search).get("query");
  const [page, setPage] = useState(0);

  useEffect(() => {
    fetchResults();
  }, [query]);

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
        slug
      }[0...10]
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
        slug
      }[${results.length}...${results.length + 10}]
    `);
    setResults((prevResults) => [...prevResults, ...moreResults]);
  };

  return (
    <div className="search-results grid grid-cols-2 gap-4 p-4">
      {results.map((item, index) => (
        <div
          key={index}
          className="result-item bg-white shadow-md p-4 rounded-md flex flex-col items-center"
        >
          <img
            src={urlFor(item.productImage[0])}
            alt={item.productName}
            className="w-full h-40 object-cover rounded-lg"
          />
          <div className="mt-4 text-center">
            <p className="font-semibold text-lg">{item.productName}</p>
            <p className="text-gray-500">{item.productBrand}</p>
            <p className="text-primary-600 font-bold">NGN {item.productPrice}</p>
          </div>
        </div>
      ))}
      <div id="sentinel"></div> {/* Sentinel element for infinite scroll */}
    </div>
  );
};

export default SearchResults;
