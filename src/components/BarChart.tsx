import React, { useState, ChangeEvent, MouseEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useAppSelector, useAppDispatch } from '../app/hooks';

export interface CellType {
  id: string;
  desc: string | number;
  linkTo?: string;
}

const propTypes = {
  headers: PropTypes.array,
  rows: PropTypes.array, // id, desc, linkTo
  onChange: PropTypes.func,
};

type BarChartProps = PropTypes.InferProps<typeof propTypes>;
const colors = [
  '#309975',
  '#58b368',
  '#dad873',
  '#efeeb4',
  '#454d66',
  '#e74645',
  '#fb7756',
  '#facd60',
  '#fdfa66',
  '#1ac0c6',
  '#22577a',
  '#38a3a5',
  '#57cc99',
  '#80ed99',
  '#c7f9cc',
];
export function BarChart(props: BarChartProps) {
  const { headers, rows, onChange } = props;
  const [rowInd, setRowInd] = useState(0)

  const row = rows ? rows[rowInd] : []
  const cells = row.filter((r: CellType) => typeof r.desc !== 'string' && !['total', 'd'].includes(r.id));
  console.log('cells', cells);
  const totalCell = row.find((r: CellType) => 'total' === r.id);
  const total: number = totalCell ? totalCell.desc : 100;

  return (
    <div className='bar-chart-wrapper'>
      {cells && cells.map((cell: CellType, cellIndex: number) => {
        const val: number = +cell.desc;
        const percent = Math.round(val * 100 / total);
        return (
          <div key={cellIndex} className='bar-wrapper'>
            <div className='bar-bar' style={{ width: `${percent}%`, background: colors[cellIndex] }}>
              {cell.desc}
            </div>
            <div className='bar-label'>
              {cell.id}
            </div>
          </div>
        )
      })}

    </div>
  );
}