import React, { useState, ChangeEvent, MouseEvent } from 'react';
import PropTypes from 'prop-types';
import { iteratorSymbol } from 'immer/dist/internal';
import classNames from 'classnames';

const propTypes = {
  value: PropTypes.array,
  items: PropTypes.array,
  // searchable: PropTypes.bool,
  onChange: PropTypes.func,
};

type DropdownProps = PropTypes.InferProps<typeof propTypes>;

export function ListBox(props: DropdownProps) {
  const { items, value, onChange } = props;
  const valueSet = new Set(value)

  const handleClick = (id: string) => {
    if (valueSet.has(id)) valueSet.delete(id)
    else valueSet.add(id)

    onChange && onChange(Array.from(valueSet));
  }

  return (
    <div className='list-box-wrapper'>
      <ul className='listbox-items'>
        {items && items.map((item) => {
          const cls = classNames({
            'listbox-item': true,
            'selected': valueSet.has(item.id)
          });

          return (
            <li className={cls} key={item.id} onClick={() => handleClick(item.id)}>
              {item.desc}
            </li>
          )
        })}
      </ul>
    </div>
  )
}