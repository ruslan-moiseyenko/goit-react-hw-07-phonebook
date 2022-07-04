import React from 'react';
import * as actions from '../../redux/actions';
import { useSelector, useDispatch } from 'react-redux';

const Filter = () => {
  const dispatch = useDispatch();
  const filterValue = useSelector(state => state.filter);
  return (
    <div>
      <label>
        Filter by name:
        <input
          type="text"
          onChange={e => dispatch(actions.onFilterChange(e.target.value))}
          value={filterValue}
        />
      </label>
    </div>
  );
};

export default Filter;
