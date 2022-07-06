import axios from 'axios';
import { baseURL } from '../consts';
import { IMovie, ISearchResult } from '../interfaces';

type ReturnType = {
	searchResult: ISearchResult;
	isLoading: boolean;
};

const getSearchResult = (queryString: string, page: number = 1): ReturnType => {
	let totalPages: number = 0;
	let movies: IMovie[] = [];

	const axiosInstance = axios.create({
		baseURL,
	});

	const config = {
		params: {
			query: queryString,
			page: page,
			api_key: '8e4e279b9cff554eed541f5499a5a6f1',
		},
	};

	if (!!queryString.length) {
		axiosInstance
			.get('/search/movie', config)
			.then(({ data }) => {
				const { results } = data;
				totalPages = data.total_pages;

				results.forEach((movie) => {
					movies.push(movie);
				});
			})
			.catch((error) => console.error(error));
	}

	return {
		searchResult: { totalPages, movies },
		isLoading: false,
	};
};

export default getSearchResult;
