import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Dropdown } from '../../components/Dropdown';
import { ListBox } from '../../components/ListBox';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { TabularReport } from '../../features/tabular/TabularReport';
import { BarChartReport } from '../../features/barchart/BarChartReport';
import { D3ChartReport } from '../d3chart/D3ChartReport';
import { IndividualReport } from '../../features/individual/IndividualReport';

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
  const [reportType, setReportType] = useState(1);

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

  const handleChangeReport = (newType: number) => {
    setReportType(newType);
  }

  const cts = counties.map(c => c.name)

  return (
    <div className='main-wrapper'>
      <div className='main-selection-wrapper'>
        <Dropdown items={cts} onChange={handleOnCountyChange} value={selectedCounty} />
        <ListBox items={schools} onChange={handleOnSchoolChange} value={selectedSchools} />
        {/* <button onClick={handleGetReport}>Generate Report</button> */}
      </div>
      <div className='main-report-wrapper'>
        <div className='icons-wrapper'>
          <span className='icon-pie-chart report-icon' onClick={() => handleChangeReport(1)} >&nbsp;</span>
          <span className='icon-stats-bars report-icon' onClick={() => handleChangeReport(2)}>&nbsp;</span>
          <span className='icon-file-word report-icon' onClick={() => handleChangeReport(3)}>&nbsp;</span>
          <span className='icon-table report-icon' onClick={() => handleChangeReport(4)}>&nbsp;</span>
        </div>
        {reportType == 1 && <D3ChartReport />}
        {reportType == 2 && <BarChartReport />}
        {reportType == 3 && <IndividualReport />}
        {reportType == 4 && <TabularReport />}
      </div>
    </div >
  )
}
