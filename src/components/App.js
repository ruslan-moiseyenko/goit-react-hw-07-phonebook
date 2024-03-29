import React from 'react';
import PhonebookAddingForm from './phonebookAddingForm/phonebookAddingForm';
import Contacts from './contacts/contacts';
import Filter from './filter/Filter';

//http://62c33d12876c4700f5393964.mockapi.io/:endpoint  - для получения данных из базы данных

function App() {
  return (
    <>
      <h1>Phonebook</h1>
      <PhonebookAddingForm />
      <h2>Contacts</h2>
      <Filter />
      <Contacts />
    </>
  );
}

export default App;
