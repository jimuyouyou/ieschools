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

type BarChartProps = PropTypes.InferProps<typeof propTypes>;

export function BarChart(props: BarChartProps) {
  const { headers, rows } = props;

  return (
    <div className='bar-chart-wrapper'>
      bar-chart
    </div>
  );
}