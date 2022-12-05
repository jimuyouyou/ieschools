import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { BarChart } from '../../components/BarChart';
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

export function BarChartReport() {
  const counties = useAppSelector(state => state.main.counties);
  const selectedCounty = useAppSelector(state => state.main.selectedCounty);
  const schools = useAppSelector(state => state.main.schools.filter(it => it['County Description'] === selectedCounty));

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { headers, rows } = formatTabularSchoolData(schools);

  useEffect(() => {
    if (counties.length === 0) dispatch(loadCounties())
    if (schools.length === 0) dispatch(loadSchools())
  });

  return (
    <div className='barchart-wrapper'>
      <BarChart headers={headers} rows={rows} />
    </div>
  )
}