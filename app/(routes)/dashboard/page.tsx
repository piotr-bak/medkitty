'use client'
import { PetList } from '@/app/_components/PetList/PetList';
import styles from './page.module.scss';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css'
import 'swiper/css/pagination'
import { Pagination } from 'swiper/modules';

export default function Page() {

    return (
        <Swiper
            className={styles.swiper}
            modules={[Pagination]}
            spaceBetween={25}
            pagination={{
                clickable: true,
            }}
        >
            <SwiperSlide className={styles.panel}>
                <Swiper
                    className={styles.swiper}
                    direction={'vertical'}
                    modules={[Pagination]}
                    spaceBetween={25}
                    pagination={{
                        clickable: true,
                    }}
                >
                    <SwiperSlide className={styles.panel}>
                        Summary
                    </SwiperSlide>
                    <SwiperSlide className={styles.panel}>
                        <section>
                            <PetList />
                            <Link href={'/dashboard/pet'}>
                                <button className={styles.buttonAdd} aria-label="add pet">{'+'}</button>
                            </Link>
                        </section>
                    </SwiperSlide>
                </Swiper>
            </SwiperSlide>
            <SwiperSlide className={styles.panel}>
                Admin
            </SwiperSlide>
        </Swiper>
    )
}


// export default function Page() {

//     return (
//         <div className={styles.dashboard} >
//             <PetList />
//             <Link href={'/dashboard/pet'}>
//                 <button className={styles.buttonAdd} aria-label="add pet">{'+'}</button>
//             </Link>
//         </div>
//     )
// }
