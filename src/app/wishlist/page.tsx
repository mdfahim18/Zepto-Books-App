'use client';

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import Image from 'next/image';
import Link from 'next/link';
import { BooksProps } from '../page';
import { removeToWishList } from '@/utils/booksSlice';

export default function WishList() {
  const wishlist = useSelector((state: RootState) => state.books.wishList);
  const dispatch = useDispatch();

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
    <section className='max-w-7xl  bg-gray-100 mx-auto p-5 grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-4'>
      {wishlist.map((item) => (
        <section
          key={item.id}
          className='flex p-5 flex-col gap-2 rounded-sm shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-lg h-full'
        >
          <Link href={`/${item.id}`}>
            <Image
              src={`${item.formats['image/jpeg']}`}
              alt={item.title}
              width={500}
              height={500}
              className='object-contain cursor-pointer w-full h-[12rem] sm:h-[16rem] rounded-md'
            />
          </Link>
          <div className='flex flex-col justify-between gap-1 text-gray-800 flex-grow'>
            <h1 className='text-xl font-semibold'>{item.title}</h1>
            <h2 className='text-lg font-semibold'>
              By: {item.authors.map((author) => author.name).join(', ')}
            </h2>
            <p className='font-semibold'>
              Genre:
              {[...item.subjects, ...item.bookshelves].slice(0, 4).join(', ')}
            </p>
            <p className='font-semibold'>Id: {item.id}</p>
            <button
              onClick={() => handleRemoveToWishList(item)}
              className='text-lg bg-pink-600 text-white cursor-pointer font-semibold mt-3 py-2 px-4 rounded-sm'
            >
              Remove
            </button>
          </div>
        </section>
      ))}
    </section>
  );
}
