import axios from 'axios';

export async function getBooks() {
  try {
    const response = await axios.get('https://gutendex.com/books');
    return response.data;
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
    throw error;
  }
}

export async function getSingleBook(id: number) {
  try {
    const response = await axios.get(`https://gutendex.com/books/${id}`);
    return response.data;
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
    throw error;
  }
}
