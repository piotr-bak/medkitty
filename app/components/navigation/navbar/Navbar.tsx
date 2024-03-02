import React from "react";
import Link from "next/link";

export default function Navbar() {
    return (
        <nav className='relative px-4 py-4 flex justify-between items-center bg-yellowPrimary'>
            <a className='text-3xl font-bold text-greenPrimary hover:text-black leading-none' href='/'>
                <svg
                    className='h-10 fill-current'
                    viewBox='0 0 512 512'
                    xmlns='http://www.w3.org/2000/svg'>
                    <path d='M226.5 92.9c14.3 42.9-.3 86.2-32.6 96.8s-70.1-15.6-84.4-58.5s.3-86.2 32.6-96.8s70.1 15.6 84.4 58.5zM100.4 198.6c18.9 32.4 14.3 70.1-10.2 84.1s-59.7-.9-78.5-33.3S-2.7 179.3 21.8 165.3s59.7 .9 78.5 33.3zM69.2 401.2C121.6 259.9 214.7 224 256 224s134.4 35.9 186.8 177.2c3.6 9.7 5.2 20.1 5.2 30.5v1.6c0 25.8-20.9 46.7-46.7 46.7c-11.5 0-22.9-1.4-34-4.2l-88-22c-15.3-3.8-31.3-3.8-46.6 0l-88 22c-11.1 2.8-22.5 4.2-34 4.2C84.9 480 64 459.1 64 433.3v-1.6c0-10.4 1.6-20.8 5.2-30.5zM421.8 282.7c-24.5-14-29.1-51.7-10.2-84.1s54-47.3 78.5-33.3s29.1 51.7 10.2 84.1s-54 47.3-78.5 33.3zM310.1 189.7c-32.3-10.6-46.9-53.9-32.6-96.8s52.1-69.1 84.4-58.5s46.9 53.9 32.6 96.8s-52.1 69.1-84.4 58.5z' />
                </svg>
            </a>
            <div className='lg:hidden'>
                <button className='navbar-burger flex items-center text-greenPrimary hover:text-mutedWhite p-3'>
                    <svg
                        className='block h-4 w-4 fill-current'
                        viewBox='0 0 20 20'
                        xmlns='http://www.w3.org/2000/svg'>
                        <title>Mobile menu</title>
                        <path d='M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z'></path>
                    </svg>
                </button>
            </div>
            <ul className='hidden absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 lg:flex lg:mx-auto lg:flex lg:items-center lg:w-auto lg:space-x-6'>
                <li>
                    <Link href='/pets'>
                        <span className="hover:text-greenPrimary">Pets</span>
                    </Link>
                </li>
                <li>
                    <Link href='/schedule'>
                        <span className="hover:text-greenPrimary">Schedule</span>
                    </Link>
                </li>
                <li>
                    <Link href='/medicines'>
                        <span className="hover:text-greenPrimary">Medicines</span>
                    </Link>
                </li>
            </ul>
        </nav>
    );
}
