'use client';

import React, { useEffect, useState } from 'react';
import { BooksProps } from '../page';
import { getSingleBook } from '@/utils/fetchBooks';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { addToWishList, removeToWishList } from '@/utils/booksSlice';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { RootState } from '../store';

export default function Book({ params }: { params: { bookId: number } }) {
  const wishList = useSelector((state: RootState) => state.books.wishList);

  const [book, setBook] = useState<BooksProps | null>(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    const fetchBook = async () => {
      try {
        const bookData = await getSingleBook(params.bookId);
        setBook(bookData);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchBook();
  }, [params.bookId]);

  const handleRemoveToWishList = (book: BooksProps) => {
    dispatch(removeToWishList(book));
  };
  const handleAddToWishList = (book: BooksProps) => {
    dispatch(addToWishList(book));
  };
  if (!book) {
    return (
      <div className='max-w-7xl mx-auto min-h-[80vh] flex justify-center items-center'>
        <h1 className=' text-2xl text-white'>No book Found</h1>
      </div>
    );
  }

  if (loading) {
    return (
      <div className='max-w-7xl mx-auto h-[90vh] flex justify-between gap-12 px-5 py-9'>
        <div className='animate-pulse w-[50%] h-full bg-gray-300 rounded-md'></div>
        <div className='flex flex-col gap-3 w-[50%]'>
          <div className='h-8 bg-gray-300 rounded-md animate-pulse'></div>
          <div className='h-6 bg-gray-300 rounded-md animate-pulse'></div>
          <div className='h-6 bg-gray-300 rounded-md animate-pulse'></div>
          <div className='h-6 bg-gray-300 rounded-md animate-pulse'></div>
          <div className='h-6 bg-gray-300 rounded-md animate-pulse'></div>
          <div className='h-8 bg-gray-300 rounded-md animate-pulse'></div>
        </div>
      </div>
    );
  }
  return (
    <div className=' max-w-7xl mx-auto bg-gray-100 sm:h-[90vh] mb-6 flex flex-col sm:flex-row justify-between gap-12 px-5 py-9'>
      <Image
        src={`${book.formats['image/jpeg']}`}
        alt={book.title}
        width={1000}
        height={1000}
        className=' object-contain max-w-[20rem]'
      />
      <div className=' w-[1px] h-full bg-gray-800'></div>
      <div className=' flex flex-col gap-3 text-gray-700'>
        <h1 className=' text-xl font-semibold'>Title: {book.title}</h1>
        <h1 className=' text-lg font-semibold'>
          Authors:
          {book.authors.map((author) => {
            return (
              <span className='text-lg font-semibold'>
                {author.name}, {author.birth_year} - {author.death_year}
              </span>
            );
          })}
        </h1>
        <p className='text-lg font-semibold'>
          Genre: {book.bookshelves.slice(0, 2).join(', ')}
        </p>
        <p className=' capitalize text-lg font-semibold'>
          Languages: {book.languages}
        </p>
        <p className='text-lg font-semibold'>
          Books: {book.subjects.slice(0, 4).join(', ')}
        </p>
        <p className='text-lg font-semibold'>
          Downloads: {book.download_count}
        </p>
        {wishList.some((item: BooksProps) => item.id === book.id) ? (
          <button
            onClick={() => handleRemoveToWishList(book)}
            className=' text-lg max-w-24 bg-pink-600 text-white cursor-pointer rounded-sm font-semibold py-2 hover:text-gray-800 transition-all'
          >
            Remove
          </button>
        ) : (
          <button
            onClick={() => handleAddToWishList(book)}
            className='text-lg max-w-24 bg-pink-600 text-white cursor-pointer rounded-sm font-semibold py-2 hover:text-gray-800 transition-all'
          >
            Add
          </button>
        )}
      </div>
    </div>
  );
}
