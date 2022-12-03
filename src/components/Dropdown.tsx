import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { iteratorSymbol } from 'immer/dist/internal';

const propTypes = {
  items: PropTypes.array,
  searchable: PropTypes.bool,
};

type DropdownProps = PropTypes.InferProps<typeof propTypes>;

export function Dropdown(props: DropdownProps) {
  const { items } = props;
  console.log('items', items)
  return (
    <div>
      <input type="text" />
      <ul>
        {items && items.map((item, itemIndex) => {
          return (
            <li key={itemIndex}>
              {item}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
