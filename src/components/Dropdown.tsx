import React, { useState, ChangeEvent, MouseEvent } from 'react';
import PropTypes from 'prop-types';
import { iteratorSymbol } from 'immer/dist/internal';
import classNames from 'classnames';

const propTypes = {
  value: PropTypes.string,
  items: PropTypes.array,
  searchable: PropTypes.bool,
  onChange: PropTypes.func,
};

type DropdownProps = PropTypes.InferProps<typeof propTypes>;

export function Dropdown(props: DropdownProps) {
  const { items, value, onChange } = props;
  const [searchText, setSearchText] = useState('');
  const [hide, setHide] = useState(true);

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value)
    setHide(false)
  };

  const handleBlur = (event: ChangeEvent<HTMLInputElement>) => {
    setHide(true)
  }

  const handleClick = () => {
    setHide(false)
  }

  const handleItemClick = (event: MouseEvent, value: string) => {
    if (onChange) onChange(value);
    setHide(true)
  }

  const availableItems = hide ? [] : items?.filter(it => it.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()));

  return (
    <div className="dropdown-wrapper" >
      <input className='dropdown-search-input'
        type="text" placeholder='Search'
        readOnly
        value={value || ''}
        // onChange={handleSearch}
        onBlur={handleBlur}
        onClick={handleClick}
      /><span className='arrow-down' onClick={handleClick}></span>
      <ul className='dropdown-items'>
        {!hide && availableItems && availableItems.map((item, itemIndex) => {
          const liClass = classNames({
            'dropdown-item': true,
            'selected': value === item,
          });
          return (
            <li key={itemIndex} className={liClass} onMouseDown={(event) => handleItemClick(event, item)}>
              {item}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
