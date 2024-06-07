import { useFetch } from '@/app/_lib/hooks/useFetch';
import type { Pet } from '@/app/_types';
import Link from 'next/link';
import styles from './PetList.module.scss';
import ShareIcon from '@mui/icons-material/Share';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

export function PetList() {
    const { data: pets, isError } = useFetch<Pet[]>( '/api/pets' );

    if ( isError ) return <div>an error occurred</div>;

    return (
        <div className={styles.petList}>
            <List className={styles.list}>
                {pets && pets.length > 0
                    ? pets.map( ( pet ) => (
                        <ListItem key={pet.id} className={styles.listItem}>
                            <ListItemText className={styles.listItemText}>{pet.name}</ListItemText>
                            <div className={styles.listItemButtons}>
                                <ListItemButton className={styles.listItemButton}>
                                    <ListItemIcon className={styles.listItemIcon}>
                                        <ShareIcon />
                                    </ListItemIcon>
                                </ListItemButton>
                                <ListItemButton className={styles.listItemButton} aria-label="see more">
                                    <Link href={`${process.env.NEXT_PUBLIC_APP_URL}/dashboard/pet?id=${pet.id}`} className={styles.link}>
                                        <ListItemIcon className={styles.listItemIcon}>
                                            <EditCalendarIcon />
                                        </ListItemIcon>
                                    </Link>
                                </ListItemButton>
                            </div>
                        </ListItem>
                    ) )
                    : !isError && <p>loading data</p>}
            </List>
        </div>
    );
}
