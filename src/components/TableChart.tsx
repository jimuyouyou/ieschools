import React, { useState, ChangeEvent, MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';


export interface CellType {
  id: string;
  desc: string | number;
  linkTo?: string;
}

const propTypes = {
  headers: PropTypes.array,
  rows: PropTypes.array, // id, desc, linkTo
};

type TableChartProps = PropTypes.InferProps<typeof propTypes>;

export function TableChart(props: TableChartProps) {
  const { headers, rows } = props;

  return (
    <div className='table-chart-wrapper'>
      table-chart
      <table>
        <thead>
          <tr>
            {headers && headers.map(header => {
              return (
                <th key={header.id}>
                  {header.desc}
                </th>
              )
            })}
          </tr>
        </thead>

        <tbody>
          {rows && rows.map((row, rowIndex) => {
            return (
              <tr key={rowIndex}>
                {row.map((cell: CellType) => {
                  return (
                    <td key={cell.id}>
                      {cell.linkTo ? <Link to={cell.linkTo}>{cell.desc}</Link> : cell.desc}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
};