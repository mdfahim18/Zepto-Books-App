'use client';

import React from 'react';
import { BooksProps } from '../app/page';
import Image from 'next/image';
import Link from 'next/link';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { addToWishList, removeToWishList } from '@/utils/booksSlice';

export default function Books({ book }: { book: BooksProps }) {
  const dispatch = useDispatch();
  const wishList = useSelector((state: RootState) => state.books.wishList);
  const topGenres = [...book.subjects, ...book.bookshelves].slice(0, 4);

  const handleAddToWishList = (book: BooksProps) => {
    dispatch(addToWishList(book));
  };

  const handleRemoveToWishList = (book: BooksProps) => {
    dispatch(removeToWishList(book));
  };
  return (
    <section
      key={book.id}
      className='flex p-5 flex-col gap-2 rounded-sm shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-lg h-full'
    >
      <Link href={`/${book.id}`}>
        <Image
          src={`${book.formats['image/jpeg']}`}
          alt={book.title}
          width={500}
          height={500}
          className='object-contain cursor-pointer w-full h-[12rem] sm:h-[16rem] rounded-md'
        />
      </Link>
      <div className='flex flex-col justify-between gap-1 text-gray-800 flex-grow'>
        <h1 className='text-xl font-semibold'>{book.title}</h1>
        <h2 className='text-lg font-semibold'>
          By: {book.authors.map((author) => author.name).join(', ')}
        </h2>
        <p className='font-semibold'>
          Genre:
          {[...book.subjects, ...book.bookshelves].slice(0, 4).join(', ')}
        </p>
        <p className='font-semibold'>Id: {book.id}</p>
        <div className=' flex justify-between items-center'>
          <Link
            href={`/${book.id}`}
            className=' border-2 border-pink-600 font-semibold px-3 py-1 hover:bg-pink-600 transition-all hover:text-white'
          >
            Details
          </Link>
          {wishList.some((item: BooksProps) => item.id === book.id) ? (
            <button className=' text-lg cursor-pointer'>
              <FaHeart
                onClick={() => handleRemoveToWishList(book)}
                className=' text-pink-600 '
              />
            </button>
          ) : (
            <button className='text-lg cursor-pointer'>
              <FaRegHeart
                onClick={() => handleAddToWishList(book)}
                className=' text-pink-600 '
              />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
