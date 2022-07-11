import { createAsyncThunk } from '@reduxjs/toolkit';

const fetchContacts = createAsyncThunk(
  'contacts/fetchContacts',
  async (address, thuncAPI) => {
    try {
      const response = await thuncAPI.dispatch();
      console.log(response);
      return response.data;
    } catch (error) {}
  }
);
