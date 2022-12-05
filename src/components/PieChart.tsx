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

type PieChartProps = PropTypes.InferProps<typeof propTypes>;

export function PieChart(props: PieChartProps) {
  const { headers, rows } = props;

  return (
    <div className='pie-chart-wrapper'>
      pie-chart
    </div>
  );
}