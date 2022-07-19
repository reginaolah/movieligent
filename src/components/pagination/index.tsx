import * as React from 'react';
import { Pagination as MuiPagination } from '@mui/material';
import styles from '../../styles/movie-library.module.scss';

type Props = {
    currentPage: number;
    totalPages: number;
    isLoading: boolean;
    setCurrentPage: (page: number) => void;
    refetch: () => void;
};

const Pagination: React.FC<Props> = ({ totalPages, isLoading, currentPage, setCurrentPage, refetch }) => {

    return (
        (totalPages > 1 && !isLoading) && <MuiPagination
            className={styles.pagination}
            data-testid="pagination"
            page={currentPage}
            onChange={(_e, page) => { setCurrentPage(page); refetch(); }}
            count={totalPages}
            showFirstButton
            showLastButton />
    );
};

export default Pagination;