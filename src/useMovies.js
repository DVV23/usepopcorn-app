import { useState, useEffect } from "react";
import axios from "axios";

export function useMovies(query) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const KEY = "267002ed";

  useEffect(
    function () {
      const controller = new AbortController();
      async function getMovies() {
        try {
          setIsLoading(true);
          setError("");
          const response = await axios.get(
            `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
            { signal: controller.signal }
          );
          if (response.status !== 200)
            throw new Error("Something went wrong with data fetching");
          if (response.data.Response === "False")
            throw new Error("Movie was not found");
          setMovies(response.data.Search);
          setError("");
        } catch (err) {
          if (err.name !== "CanceledError") {
            setError(err.message);
          }
        } finally {
          setIsLoading(false);
        }
      }

      getMovies();
      return function () {
        controller.abort();
      };
    },
    [query]
  );
  return { movies, isLoading, error };
}
