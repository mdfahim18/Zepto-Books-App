'use client';

import { RootState } from '@/app/store';
import { openSearchbar, openSidebar } from '@/utils/booksSlice';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { FaHeart, FaSearch, FaHome, FaBars } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
interface BookSuggestion {
  id: number;
  title: string;
}

export default function Navbar() {
  const { isSearchbarOpen, wishList } = useSelector((state: RootState) => ({
    wishList: state.books.wishList,
    isSearchbarOpen: state.books.isSearchbarOpen,
  }));
  const [searchInput, setSearchInput] = useState('');
  const [suggestions, setSuggestions] = useState<BookSuggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const fetchSuggestions = async (query: string) => {
    if (!query) {
      setSuggestions([]);
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(
        `https://gutendex.com/books?search=${query}`
      );
      setSuggestions(response.data.results);
    } catch (error) {
      console.error('Error fetching book suggestions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchInput(query);
    fetchSuggestions(query);
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (searchInput) {
      if (suggestions.length > 0) {
        router.push(`/${suggestions[0].id}`);
      } else {
        alert('No books found with this title.');
      }
    }
  };

  const handleSuggestionClick = (id: number) => {
    router.push(`/${id}`);
    setSearchInput('');
    setSuggestions([]);
  };

  return (
    <header className='bg-gray-100 border-b'>
      {loading && (
        <p className=' bg-pink-600 text-white text-center'>
          Searching for book. Please wait...
        </p>
      )}
      <nav className=' h-[10vh] px-5 max-w-7xl mx-auto flex justify-between items-center'>
        <Link href='/'>
          <Image
            src='/logo.png'
            alt='logo'
            width={1000}
            height={1000}
            className=' object-cover h-14 w-14 cursor-pointer rounded-sm'
          />
        </Link>
        <form
          onSubmit={handleFormSubmit}
          className='relative flex w-full items-center justify-center'
        >
          <input
            value={searchInput}
            onChange={handleInputChange}
            type='text'
            placeholder='Search by book'
            className=' hidden sm:flex sm:w-[300px] md:w-[500px] w-full h-8 rounded-md px-2 text-gray-800 outline-none focus-within:ring-1 focus-within:ring-pink-600'
          />
          {isSearchbarOpen && (
            <input
              value={searchInput}
              onChange={handleInputChange}
              type='text'
              placeholder='Search by book'
              className=' flex sm:hidden w-full mx-4 h-12 z-10 rounded-md px-2 text-gray-800 outline-none focus-within:ring-1 focus-within:ring-pink-600'
            />
          )}
          <button
            type='submit'
            className=' bg-white p-3 rounded-md hidden sm:flex sm:bg-transparent text-pink-600 text-lg -ml-9 cursor-pointer'
          >
            <FaSearch />
          </button>
          {isSearchbarOpen ? null : (
            <button
              onClick={() => dispatch(openSearchbar())}
              type='submit'
              className=' bg-white p-3 flex sm:hidden rounded-md text-pink-600 text-lg -ml-9 cursor-pointer'
            >
              <FaSearch />
            </button>
          )}
          {suggestions.length > 0 && (
            <ul className='absolute flex flex-col top-10 left-0 bg-white border border-gray-300 rounded-md shadow-lg w-full max-h-40 overflow-y-auto z-10'>
              {suggestions.map((suggestion) => (
                <Link
                  href={`/${suggestion.id}`}
                  key={suggestion.id}
                  className='p-2 hover:bg-gray-100 cursor-pointer'
                  onClick={() => handleSuggestionClick(suggestion.id)}
                >
                  {suggestion.title}
                </Link>
              ))}
            </ul>
          )}
        </form>
        <ul className=' hidden sm:flex justify-center items-center gap-3'>
          <Link
            href={'/'}
            className=' font-semibold text-gray-700 flex justify-center items-center gap-2'
          >
            <FaHome className=' text-pink-600 text-lg' />
            <li>Home</li>
          </Link>
          <Link
            href={'/wishlist'}
            className=' font-semibold text-gray-700 flex justify-center items-center gap-2'
          >
            <FaHeart className=' text-pink-600 text-lg' />
            <li>Wishlist</li>
            {wishList.length}
          </Link>
        </ul>
        <button
          onClick={() => dispatch(openSidebar())}
          className=' flex sm:hidden text-pink-600'
        >
          <FaBars />
        </button>
      </nav>
    </header>
  );
}
