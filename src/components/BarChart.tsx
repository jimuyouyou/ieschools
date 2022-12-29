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

const getMaxBarVal = (cells: []) => {
  let max = Math.max(...cells);
  return Math.round((max + 5) / 10) * 10
}

export function BarChart(props: BarChartProps) {
  const { headers, rows, onChange } = props;
  const [rowInd, setRowInd] = useState(0)

  const row = rows ? rows[rowInd] : []
  const cells = row.filter((r: CellType) => typeof r.desc !== 'string' && !['total', 'd'].includes(r.id));
  const cellValues = cells.map((cell: CellType) => cell.desc);
  console.log('cells', cells);
  // const totalCell = row.find((r: CellType) => 'total' === r.id);
  const total: number = getMaxBarVal(cellValues);
  const generalHeader = headers?.find((header) => header.id === 'officialName');
  const generalHeaderCell = row.find((r: CellType) => 'officialName' === r.id);

  const handlePrev = () => {
    if (rowInd >= 1) setRowInd(rowInd - 1);
  };

  const handleNext = () => {
    if (rowInd + 1 < (rows?.length || 0)) setRowInd(rowInd + 1);
  };

  return (
    <div className='bar-chart-wrapper'>
      <div className='bar-general-label'>
        <div className='label-name'>{generalHeader?.desc}:</div>
        <div className='label-val'>{generalHeaderCell?.desc}</div>
      </div>
      <div className='bar-bars-wrapper'>
        {cells && cells.map((cell: CellType, cellIndex: number) => {
          const val: number = +cell.desc;
          const percent = Math.round(val * 100 / total);
          const cellHeader = headers?.find((header) => header.id === cell.id);

          return (
            <div key={cellIndex} className='bar-wrapper'>
              <div className='bar-bar' style={{ width: `${percent}%`, background: colors[cellIndex] }}>
                {cell.desc}
              </div>
              <div className='bar-label'>
                {cellHeader?.desc}
              </div>
            </div>
          )
        })}
      </div>
      <div className='bar-footer'>
        <button className='preButton' onClick={handlePrev} >Prev</button>
        <span>{rowInd + 1} of {rows?.length}</span>
        <button className='nextButton' onClick={handleNext}>Next</button>
      </div>
    </div>
  );
}