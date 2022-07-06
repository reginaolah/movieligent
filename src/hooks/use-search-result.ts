import axios from "axios";
import { baseURL } from "../consts";
import useDebounce from "./use-debounce";
import { IMovie, ISearchResult } from "../interfaces";
import { useCallback, useEffect, useState } from "react";

type ReturnType = {
  searchResult: ISearchResult;
  isLoading: boolean;
  refetch: () => void;
};

const useSearchResult = (queryString: string, page: number = 1): ReturnType => {
  const [searchResult, setSearchResult] = useState<ISearchResult>({
    movies: [],
    totalPages: 0,
  });

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const debounce = useDebounce();

  const getSearchResult = useCallback(() => {
    setSearchResult(null);
    setIsLoading(true);

    const axiosInstance = axios.create({
      baseURL,
    });

    const config = {
      params: {
        query: queryString,
        page: page,
        api_key: "8e4e279b9cff554eed541f5499a5a6f1",
      },
    };

    if (!!queryString?.length) {
      axiosInstance
        .get("/search/movie", config)
        .then(({ data }) => {
          const { results } = data;
          let totalPages = data.total_pages;
          let movies: IMovie[] = [];

          results.forEach((movie: IMovie) => {
            movies.push(movie);
          });

          setSearchResult({ totalPages, movies });
          setIsLoading(false);
        })
        .catch((error) => console.error(error));
    }
  }, [setIsLoading, setSearchResult, queryString, page]);

  useEffect(() => {
    if (queryString?.length >= 3) {
      setSearchResult(null);
      setIsLoading(true);
      debounce(getSearchResult, 1000);
    }
  }, [getSearchResult, debounce, page, queryString]);

  return {
    searchResult,
    isLoading,
    refetch: getSearchResult,
  };
};

export default useSearchResult;
