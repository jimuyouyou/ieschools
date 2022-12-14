import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { TableChart } from '../../components/TableChart';
import { formatTabularSchoolData } from '../../utils/schoolUtil';
import {
  loadCounties,
  loadSchools,
  updateCounty,
  updateSchools,
  selectAllCounties,
  selectAllSchools,
  selectSchoolByCounty,
} from '../main/mainSlice';

export function TabularReport() {
  const counties = useAppSelector(state => state.main.counties);
  const selectedCounty = useAppSelector(state => state.main.selectedCounty);
  // const schools = useAppSelector(state => state.main.schools.filter(it => it['County Description'] === selectedCounty));
  const schools = useAppSelector(state => state.main.schools.filter(it => state.main.selectedSchools.includes(it['id'])));

  // const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { headers, rows } = formatTabularSchoolData(schools);

  useEffect(() => {
    if (counties.length === 0) dispatch(loadCounties())
    if (schools.length === 0) dispatch(loadSchools())
  });

  const handleOnLink = (params: string) => {

  };

  return (
    <div className='tabular-wrapper'>
      <TableChart headers={headers} rows={rows} onChange={handleOnLink} />
    </div>
  )
}