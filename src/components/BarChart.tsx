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

export function BarChart(props: BarChartProps) {
  const { headers, rows, onChange } = props;
  console.log('Barchart', rows)
  return (
    <div className='bar-chart-wrapper'>
      bar-chart
    </div>
  );
}