import { createAction } from '@reduxjs/toolkit';

export const addContact = createAction('contacts/ADD_CONTACT');

export const deliteContact = createAction('contacts/DELITE_CONTACT');

export const onFilterChange = createAction('filter/FILTER_CHANGE');
