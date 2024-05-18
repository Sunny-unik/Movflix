async function fetchMovies(movieName) {
  try {
    const response = await fetch(
      `https://www.omdbapi.com/?s=${movieName || "inception"}&apikey=${
        process.env.MOVIESDB_API_KEY
      }`
    );
    const data = await response.json();
    return data.Search;
  } catch (error) {
    console.log("error in fetch moviesData", error);
    return undefined;
  }
}

module.exports = fetchMovies;
