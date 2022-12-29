import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { PieChart } from '../../components/PieChart';
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

const showChartColumns = [
  // 'Official Name',
  'Junior Infants',
  'Senior Infants',
  'First Class',
  'Second Class',
  'Third Class',
  'Fourth Class',
  'Fifth Class',
  'Sixth Class',
  // 'Total',
];

export function D3ChartReport() {
  const [rowInd, setRowInd] = useState(0)
  const counties = useAppSelector(state => state.main.counties);
  const selectedCounty = useAppSelector(state => state.main.selectedCounty);
  const schools = useAppSelector(state => state.main.schools.filter(it => state.main.selectedSchools.includes(it['id'])));
  const school = schools[rowInd] || {}

  const data = {};
  Object.keys(school)
    .filter(key => showChartColumns.includes(key))
    .forEach((key) => {
      data[key] = school[key]
    });
  console.log('data', data);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { headers, rows } = formatTabularSchoolData(schools);

  const handlePrev = () => {
    if (rowInd >= 1) setRowInd(rowInd - 1);
  };

  const handleNext = () => {
    if (rowInd + 1 < (rows?.length || 0)) setRowInd(rowInd + 1);
  };

  useEffect(() => {
    if (counties.length === 0) dispatch(loadCounties())
    if (schools.length === 0) dispatch(loadSchools())
  });

  return (
    <div className='d3-chart-wrapper'>
      <div className='label-wrapper'>
        <div className='label-title'>Official Name: &nbsp;</div>
        <div className='label-value'>{school?.desc}</div>
      </div>
      <PieChart data={data} id={school?.id}/>
      <div className='d3-footer'>
        <button className='preButton' onClick={handlePrev} >Prev</button>
        <span>{rowInd + 1} of {rows?.length}</span>
        <button className='nextButton' onClick={handleNext}>Next</button>
      </div>
    </div>
  )
}