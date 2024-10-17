'use client';

import React, { useEffect, useState } from 'react';
import Books from '../components/Books';
import { getBooks } from '../utils/fetchBooks';

interface Author {
  name: string;
  birth_year: number | null;
  death_year: number | null;
}

interface Formats {
  'image/jpeg'?: string;
  [key: string]: string | undefined;
}

export interface BooksProps {
  id: number;
  title: string;
  authors: Author[];
  bookshelves: string[];
  copyright: boolean;
  download_count: number;
  formats: Formats;
  languages: string[];
  media_type: string;
  subjects: string[];
  translators: Author[];
}

export default function Home() {
  const [books, setBooks] = useState<BooksProps[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<BooksProps[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [genre, setGenre] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const booksPerPage = 8;

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const { results } = await getBooks();
        setBooks(results);
        setFilteredBooks(results);
        setError(null);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching books:', error);
        setError('An error occurred while fetching books. Please reload');
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedFilter = event.target.value;
    setGenre(selectedFilter);
    setCurrentPage(1);

    if (selectedFilter === '') {
      setFilteredBooks(books);
    } else {
      const filtered = books.filter(
        (book) =>
          book.subjects.includes(selectedFilter) ||
          book.bookshelves.includes(selectedFilter)
      );
      setFilteredBooks(filtered);
    }
  };

  const uniqueGenres = Array.from(
    new Set(
      books.length > 0
        ? books.flatMap((book) => [
            ...(book.subjects || []),
            ...(book.bookshelves || []),
          ])
        : []
    )
  );

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);
  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  if (loading) {
    return (
      <div className=' max-w-7xl mx-auto gap-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4'>
        {Array.from({ length: 8 }).map((_, index) => (
          <section
            key={index}
            className='flex p-5 flex-col gap-2 rounded-sm  animate-pulse transition-transform duration-300 shadow-md bg-gray-200'
          >
            <div className='w-full h-48 bg-gray-300 rounded-md'></div>
            <div className='flex flex-col gap-1 mt-2'>
              <div className='h-6 bg-gray-300 rounded-md'></div>
              <div className='h-5 bg-gray-300 rounded-md'></div>
              <div className='h-4 bg-gray-300 rounded-md'></div>
              <div className='h-4 bg-gray-300 rounded-md'></div>
              <div className='flex justify-between items-center mt-3'>
                <div className='h-4 bg-gray-300 rounded-md w-20'></div>
                <div className='h-6 w-6 bg-gray-300 rounded-full'></div>
              </div>
            </div>
          </section>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className='flex h-screen justify-center items-center'>
        <h1 className='text-lg text-red-500 font-semibold'>{error}</h1>
      </div>
    );
  }

  if (filteredBooks.length === 0) {
    return (
      <div className='flex flex-col gap-4 h-screen justify-center items-center'>
        <h1 className='text-3xl'>No books available</h1>
        <h2 className=' text-2l'>Please reload the page</h2>
      </div>
    );
  }

  return (
    <main className=' bg-gray-100 max-w-7xl flex flex-col gap-8 mx-auto p-5'>
      <select
        value={genre}
        onChange={handleFilterChange}
        className='p-2 hidden sm:flex mt-5 border w-[70px] sm:w-full border-gray-300 rounded'
      >
        <option value=''>All</option>
        {uniqueGenres.map((item, index) => (
          <option key={index} value={item}>
            {item}
          </option>
        ))}
      </select>

      <div className=' w-full gap-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4'>
        {currentBooks.map((book) => (
          <Books key={book.id} book={book} />
        ))}
      </div>

      <div className='flex justify-center gap-4 mb-16'>
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className={`px-5 py-3 ${
            currentPage === 1 ? 'bg-gray-300' : 'bg-pink-600 text-white'
          } rounded`}
        >
          Previous
        </button>
        <span className='text-xl'>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`px-5 py-3 ${
            currentPage === totalPages
              ? 'bg-gray-300'
              : 'bg-pink-600 text-white'
          } rounded`}
        >
          Next
        </button>
      </div>
    </main>
  );
}
