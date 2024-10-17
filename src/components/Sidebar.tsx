'use client';

import { RootState } from '@/app/store';
import { closeSidebar } from '@/utils/booksSlice';
import Link from 'next/link';
import { FaHeart, FaHome, FaTimes } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';

export default function Sidebar() {
  const { wishList, isSidebarOpen } = useSelector((state: RootState) => ({
    isSidebarOpen: state.books.isSidebarOpen,
    wishList: state.books.wishList,
  }));
  const dispatch = useDispatch();
  return (
    <aside
      className={`${
        isSidebarOpen ? 'sidebar-wrapper show' : 'sidebar-wrapper'
      }`}
    >
      <button
        onClick={() => dispatch(closeSidebar())}
        className=' flex sm:hidden text-white p-2 rounded-sm cursor-pointer bg-pink-600'
      >
        <FaTimes />
      </button>
      <ul className='flex flex-col gap-3'>
        <li className=' font-semibold text-gray-700 flex  items-center gap-2'>
          <Link href='/'>Home</Link>
          <FaHome className=' text-pink-600 text-lg' />
        </li>
        <li className=' font-semibold text-gray-700 flex items-center gap-2'>
          <Link href='/wishlist'>Wishlist</Link>
          <FaHeart className=' text-pink-600 text-lg' />
          <span>{wishList.length}</span>
        </li>
      </ul>
    </aside>
  );
}
