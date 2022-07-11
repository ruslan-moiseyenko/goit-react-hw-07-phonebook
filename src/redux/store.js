import { configureStore, combineReducers } from '@reduxjs/toolkit';
import contactsInitial from '../components/phonebookAddingForm/contacts.json';
import { createReducer } from '@reduxjs/toolkit';
import { addContact, deliteContact, onFilterChange } from '../redux/actions';
import { fetchContacts } from '../redux/contactsOperations';
// import storage from 'redux-persist/lib/storage';
import {
  // persistReducer,
  // persistStore,
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

const contactsFromServer = createReducer([], {
  [fetchContacts.fulfilled]: (_, action) => action.payload,
});

const contactsLoading = createReducer(false, {
  [fetchContacts.pending]: () => true,
  [fetchContacts.fulfilled]: () => false,
  [fetchContacts.rejected]: () => false,
});

const contactsLoadingError = createReducer(false, {
  [fetchContacts.pending]: (_, action) => action.payload,
  [fetchContacts.fulfilled]: () => false,
  [fetchContacts.rejected]: () => false,
});

// const persistConfig = {
//   key: 'counter',
//   storage,
//   whitelist: ['contacts'],
// };

// const persistedReducer = persistReducer(persistConfig, reducer);

const rootReducer = combineReducers({
  contacts: reducer,
  contactsFromServer,
  contactsLoading,
  contactsLoadingError,
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
// export const persistor = persistStore(store);

export default store;
