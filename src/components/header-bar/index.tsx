import * as React from 'react';
import { Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { localizedStrings } from '../../helpers';
import styles from '../../styles/header-bar.module.scss';

type Props = {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    children?: React.ReactNode;
};

const HeaderBar: React.FC<Props> = ({ isOpen, setIsOpen, children }) => {
    return (
        <div className={styles.headerBar}>
            <Button
                className={styles.favoritesButton}
                onClick={() => setIsOpen(!isOpen)}>
                <MenuIcon className={styles.menuIcon} />
                {localizedStrings.Favorites}
            </Button>
            {children}
        </div>

    );
};

export default HeaderBar;