import { BooksProps } from '@/app/page';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const loadWishListFromLocalStorage = (): BooksProps[] => {
  try {
    const serializedState = localStorage.getItem('wishlist');
    if (serializedState === null) {
      return [];
    }
    return JSON.parse(serializedState);
  } catch (error) {
    console.error('Could not load wishlist from localStorage', error);
    return [];
  }
};

const saveWishListToLocalStorage = (wishlist: BooksProps[]) => {
  try {
    const serializedState = JSON.stringify(wishlist);
    localStorage.setItem('wishlist', serializedState);
  } catch (error) {
    console.error('Could not save wishlist to localStorage', error);
  }
};
interface initialStateProps {
  wishList: BooksProps[];
  isSidebarOpen: boolean;
  isSearchbarOpen: boolean;
}

const initialState: initialStateProps = {
  wishList: loadWishListFromLocalStorage(),
  isSidebarOpen: false,
  isSearchbarOpen: false,
};

const booksSlice = createSlice({
  name: 'bookstore',
  initialState,
  reducers: {
    openSidebar: (state) => {
      state.isSidebarOpen = true;
    },

    closeSidebar: (state) => {
      state.isSidebarOpen = false;
    },

    openSearchbar: (state) => {
      state.isSearchbarOpen = true;
    },

    closeSearchbar: (state) => {
      state.isSearchbarOpen = false;
    },

    addToWishList: (state, action: PayloadAction<BooksProps>) => {
      const book = action.payload;

      const existingBook = state.wishList.find((item) => item.id === book.id);
      if (!existingBook) {
        state.wishList.push(book);
        saveWishListToLocalStorage(state.wishList);
      }
    },

    removeToWishList: (state, action: PayloadAction<BooksProps>) => {
      const removeBook = state.wishList.find(
        (item) => item.id === action.payload.id
      );
      if (removeBook) {
        state.wishList = state.wishList.filter(
          (item) => item.id !== removeBook.id
        );
        saveWishListToLocalStorage(state.wishList);
      }
    },
  },
});

export const {
  addToWishList,
  removeToWishList,
  openSidebar,
  closeSidebar,
  openSearchbar,
  closeSearchbar,
} = booksSlice.actions;
export default booksSlice.reducer;
