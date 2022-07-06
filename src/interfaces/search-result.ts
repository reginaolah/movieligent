import { IMovie } from '.';

interface ISearchResult {
	movies: IMovie[];
	totalPages: number;
}

export default ISearchResult;
