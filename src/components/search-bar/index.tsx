import * as React from 'react';
import { localizedStrings } from '../../helpers';
import SearchIcon from '@mui/icons-material/Search';
import { IconButton, InputBase } from '@mui/material';
import styles from '../../styles/search-bar.module.scss';

type Props = {
    searchValue: string;
    setSearchValue: (value: string) => void;
    refetch: () => void;
};

const SearchBar: React.FC<Props> = ({ setSearchValue, refetch }) => {
    const onChange = React.useCallback((event) => {
        setSearchValue(event.target.value);
    }, [setSearchValue]);

    const handleKeypress = React.useCallback((event) => {
        if (event.charCode === 13) {
            refetch();
        }
    }, [refetch]);

    return (
        <div className={styles.searchBarContainer}>
            <InputBase
                className={styles.inputBase}
                placeholder={localizedStrings.SearchDatabase}
                onChange={onChange}
                onKeyPress={handleKeypress}
            />
            <IconButton type="button" className={styles.searchIcon} onClick={refetch}>
                <SearchIcon />
            </IconButton>
        </div>
    );
};

export default SearchBar;