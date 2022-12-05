import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Dropdown } from '../../components/Dropdown';
import { ListBox } from '../../components/ListBox';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  loadCounties,
  loadSchools,
  updateCounty,
  updateSchools,
  selectAllCounties,
  selectAllSchools,
  selectSchoolByCounty,
} from './mainSlice';


export function Main() {
  const counties = useAppSelector(state => state.main.counties);
  const selectedCounty = useAppSelector(state => state.main.selectedCounty);
  const schools = useAppSelector(state => state.main.schools.filter(it => it['County Description'] === selectedCounty));
  const selectedSchools = useAppSelector(state => state.main.selectedSchools);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (counties.length === 0) dispatch(loadCounties())
    if (schools.length === 0) dispatch(loadSchools())
  });

  const handleOnCountyChange = (updatedCounty: string) => {
    dispatch(updateCounty(updatedCounty))
  }

  const handleOnSchoolChange = (updatedSchools: Array<string>) => {
    dispatch(updateSchools(updatedSchools))
  }

  const handleGetReport = () => {
    navigate(`/tabular?county=${selectedCounty}&school=${selectedSchools.join(',')}`);
  }

  const cts = counties.map(c => c.name)

  return (
    <div>
      <Dropdown items={cts} onChange={handleOnCountyChange} value={selectedCounty} />
      <ListBox items={schools} onChange={handleOnSchoolChange} value={selectedSchools} />
      <button onClick={handleGetReport}>Generate Report</button>
    </div>
  )
}
