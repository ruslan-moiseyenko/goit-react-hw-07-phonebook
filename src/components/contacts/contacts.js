import React from 'react';
import { LiContacts } from './Contacts.styled';
import * as actions from '../../redux/actions';
import { useSelector, useDispatch } from 'react-redux';

const Contacts = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(state =>
    state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(state.filter.toLowerCase())
    )
  );

  return (
    <ul>
      {contacts.map(({ id, name, number }) => (
        <LiContacts key={id}>
          {name} : {number}
          <button onClick={() => dispatch(actions.deliteContact(id))}>
            {' '}
            Delite
          </button>
        </LiContacts>
      ))}
    </ul>
  );
};

export default Contacts;
