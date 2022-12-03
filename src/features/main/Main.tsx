import React, { useState, useEffect } from 'react';
import { Dropdown } from '../../components/Dropdown';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  loadCounties,
  loadSchools,
  updateCounty,
  updateSchools,
  selectAllCounties,
  selectAllSchools,
} from './mainSlice';

export function Main() {
  const counties = useAppSelector(state => state.main.counties);
  const schools = useAppSelector(state => state.main.schools);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (counties.length === 0) dispatch(loadCounties())
    if (schools.length === 0) dispatch(loadSchools())
  });

  const cc = counties.map(c => c.name)
  return (
    <div>
      <Dropdown items={cc} />
      <button onClick={() => dispatch(updateCounty('hoho'))}>Click Me</button>
    </div>
  )
}
