import * as React from 'react';
import { useSearchResult } from '../../hooks';
import { localizedStrings } from '../../helpers';
import SearchIcon from '@mui/icons-material/Search';
import { IconButton, InputBase } from '@mui/material';
import styles from '../../styles/search-bar.module.scss';

type Props = {
    searchValue: string;
    setSearchValue: (value: string) => void;
};

const SearchBar: React.FC<Props> = ({ setSearchValue, searchValue }) => {
    const {refetch} = useSearchResult(searchValue);

    const onChange = React.useCallback((event) => {
        setSearchValue(event.target.value);
    }, [setSearchValue]);

    return (
        <div className={styles.searchBarContainer}>
            <InputBase
                className={styles.inputBase}
                placeholder={localizedStrings.SearchDatabase}
                onChange={onChange}
            />
            <IconButton type="button" className={styles.searchIcon} onClick={refetch}>
                <SearchIcon />
            </IconButton>
        </div>
    );
};

export default SearchBar;