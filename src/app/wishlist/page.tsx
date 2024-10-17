'use client';

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import Image from 'next/image';
import Link from 'next/link';
import { BooksProps } from '../page';
import { FaHeart } from 'react-icons/fa';
import { removeToWishList } from '@/utils/booksSlice';

export default function WishList() {
  const wishlist = useSelector((state: RootState) => state.books.wishList);
  const dispatch = useDispatch();

  const topGenres = wishlist.map((item) =>
    [...item.subjects, ...item.bookshelves].slice(0, 2)
  );

  const handleRemoveToWishList = (book: BooksProps) => {
    dispatch(removeToWishList(book));
  };

  if (wishlist.length === 0) {
    return (
      <div className=' h-screen flex flex-col justify-center items-center gap-2'>
        <h1 className=' text-3xl'>No book in Wishlist</h1>
        <Link href='/' className=' rounded-md text-white bg-pink-600 px-5 py-2'>
          Back to Home
        </Link>
      </div>
    );
  }
  return (
    <section className=' max-w-7xl mx-auto px-5 grid place-items-center gap-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-4'>
      {wishlist.map((item) => (
        <section className=' w-[80%] mb-7 sm:w-[12rem] md:w-[14rem] flex flex-col gap-2 rounded-sm shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-lg'>
          <Link href={`/${item.id}`}>
            <Image
              src={`${item.formats['image/jpeg']}`}
              alt={item.title}
              width={500}
              height={500}
              className=' object-contain cursor-pointer'
            />
          </Link>
          <div className=' flex flex-col gap-1 text-gray-800'>
            <h1 className=' text-xl font-semibold '>{item.title}</h1>
            <h2 className=' text-lg font-semibold'>
              By: {item.authors.map((author) => author.name).join(',) ')}
            </h2>
            <p className='font-semibold'>
              Genre: {topGenres.slice(0, 4).join(', ')}
            </p>
            <p className='font-semibold'>Id: {item.id}</p>
            <button
              onClick={() => handleRemoveToWishList(item)}
              className=' text-lg bg-pink-600 text-white cursor-pointer font-semibold'
            >
              Remove
            </button>
          </div>
        </section>
      ))}
    </section>
  );
}
