import React, { useState, ChangeEvent } from 'react';
import PropTypes from 'prop-types';
import { iteratorSymbol } from 'immer/dist/internal';

const propTypes = {
  items: PropTypes.array,
  searchable: PropTypes.bool,
};

type DropdownProps = PropTypes.InferProps<typeof propTypes>;

export function Dropdown(props: DropdownProps) {
  const { items } = props;
  const [searchText, setSearchText] = useState('');
  const [hide, setHide] = useState(true);

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value)
    setHide(false)
  };

  const handleBlur = () => {
    setHide(true)
  }

  const handleClick = () => {
    setHide(false)
  }

  const availableItems = hide ? [] : items?.filter(it => it.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()));

  return (
    <div className="dropdown-wrapper">
      <input className='dropdown-search-input'
        type="text" placeholder='Search'
        value={searchText}
        onChange={handleSearch}
        onBlur={handleBlur}
        onClick={handleClick}
      /><span className='arrow-down' onClick={handleClick}></span>
      <ul className='dropdown-items'>
        {!hide && availableItems && availableItems.map((item, itemIndex) => {
          return (
            <li key={itemIndex} className='dropdown-item'>
              {item}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
