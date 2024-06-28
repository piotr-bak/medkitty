import SettingsIcon from '@mui/icons-material/Settings';
import ShareIcon from '@mui/icons-material/Share';
import CircularProgress from '@mui/material/CircularProgress';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Link from 'next/link';

import { useFetch } from '@/app/_lib/hooks/useFetch';
import type { Pet } from '@/app/_types';

import styles from './PetList.module.scss';


export function PetList() {
    const { data: pets, isLoading, isError } = useFetch<Pet[]>( '/api/pets' );

    if ( isError ) return <div>an error occurred</div>;

    return (
        <div className={styles.petList}>
            <List className={styles.list}>
                {pets && pets.length > 0
                    ? pets.map( ( pet ) => (
                        <ListItem key={pet.id} className={styles.listItem}>
                            <Link href={`${process.env.NEXT_PUBLIC_APP_URL}/dashboard/pet?id=${pet.id}`} className={styles.name}>
                                <ListItemText className={styles.listItemText}>{pet.name}</ListItemText>
                            </Link>
                            <div className={styles.listItemButtons}>
                                <ListItemButton className={styles.listItemButton}>
                                    <ListItemIcon className={styles.listItemIcon}>
                                        <ShareIcon sx={[{
                                            '&:hover': {
                                                color: '#2196f3',
                                            }
                                        }]} />
                                    </ListItemIcon>
                                </ListItemButton>
                                <ListItemButton className={styles.listItemButton} aria-label="see more">
                                    <Link href={`${process.env.NEXT_PUBLIC_APP_URL}/dashboard/pet?id=${pet.id}&mode=edit`} className={styles.link}>
                                        <ListItemIcon className={styles.listItemIcon}>
                                            <SettingsIcon />
                                        </ListItemIcon>
                                    </Link>
                                </ListItemButton>
                            </div>
                        </ListItem>
                    ) ) : ( isLoading ?
                        <div className={styles.placeholder}>
                            <CircularProgress />
                        </div>
                        :
                        <div>
                            <p>Click to add your first animal!</p>
                        </div>
                    )}
            </List>
        </div>
    );
}
