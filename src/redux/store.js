import { configureStore } from '@reduxjs/toolkit';
import contactsInitial from '../components/phonebookAddingForm/contacts.json';
import { createReducer } from '@reduxjs/toolkit';
import { addContact, deliteContact, onFilterChange } from '../redux/actions';
import storage from 'redux-persist/lib/storage';
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

const initialState = {
  contacts: contactsInitial,
  filter: '',
};

const reducer = createReducer(initialState, {
  [addContact]: (state, action) => {
    if (
      state.contacts.some(
        ({ name }) => name.toLowerCase() === action.payload.name.toLowerCase()
      )
    ) {
      alert(`${action.payload.name} is already in contacts`);
      return;
    } else {
      return {
        ...state,
        contacts: [...state.contacts, action.payload],
      };
    }
  },

  [deliteContact]: (state, action) => {
    return {
      ...state,
      contacts: state.contacts.filter(contact => contact.id !== action.payload),
    };
  },
  [onFilterChange]: (state, action) => {
    return {
      ...state,
      filter: action.payload,
    };
  },
});

const persistConfig = {
  key: 'counter',
  storage,
  whitelist: ['contacts'],
};

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export const persistor = persistStore(store);

export default store;
