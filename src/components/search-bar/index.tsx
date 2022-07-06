import * as React from 'react';
import { localizedStrings } from '../../helpers';
import SearchIcon from '@mui/icons-material/Search';
import { IconButton, InputBase } from '@mui/material';
import styles from '../../styles/search-bar.module.scss';

type Props = {
    setSearchValue: (value: string) => void;
};

const SearchBar: React.FC<Props> = ({ setSearchValue }) => {

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
            <IconButton type="button" className={styles.searchIcon}>
                <SearchIcon />
            </IconButton>
        </div>
    );
};

export default SearchBar;