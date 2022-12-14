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

  // const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (counties.length === 0) dispatch(loadCounties())
    if (schools.length === 0) dispatch(loadSchools())
  });

  const handleOnCountyChange = (updatedCounty: string) => {
    dispatch(updateCounty(updatedCounty))
  }

  const handleOnSchoolChange = (updatedSchools: Array<string>) => {
    // console.log('updatedSchools', updatedSchools)
    if (updatedSchools.length > 0) {
      dispatch(updateSchools(updatedSchools))
    }
  }

  const handleGetReport = () => {
    // navigate(`/tabular?county=${selectedCounty}&school=${selectedSchools.join(',')}`);
  }

  const handleChangeReport = (newType: number) => {
    setReportType(newType);
  }

  const cts = counties.map(c => c.name)

  return (
    <div className='main-wrapper'>
      <div className='main-selection-wrapper'>
        <div className='county-wrapper'>
          <div className='selection-label'>County:</div>
          <Dropdown items={cts} onChange={handleOnCountyChange} value={selectedCounty} />
        </div>
        <div className='school-wrapper'>
          <div className='selection-label'>School:</div>
          <ListBox items={schools} onChange={handleOnSchoolChange} value={selectedSchools} />
        </div>
        {/* <button onClick={handleGetReport}>Generate Report</button> */}
      </div>
      <div className='main-report-wrapper'>
        <div className='icons-wrapper'>
          <span className={`icon-pie-chart report-icon ${reportType === 1 ? 'selected' : ''}`} onClick={() => handleChangeReport(1)} >&nbsp;</span>
          <span className={`icon-stats-bars report-icon ${reportType === 2 ? 'selected' : ''}`} onClick={() => handleChangeReport(2)}>&nbsp;</span>
          <span className={`icon-table report-icon ${reportType === 4 ? 'selected' : ''}`} onClick={() => handleChangeReport(4)}>&nbsp;</span>
          <span className={`icon-file-word report-icon ${reportType === 3 ? 'selected' : ''}`} onClick={() => { handleChangeReport(3) }}>&nbsp;</span>
        </div>
        {reportType == 1 && <D3ChartReport />}
        {reportType == 2 && <BarChartReport />}
        {reportType == 3 && <IndividualReport />}
        {reportType == 4 && <TabularReport />}
      </div>
      <div className='github-wrapper'>
        <span id="forkongithub">
          <a href="https://github.com/jimuyouyou/ieschools" target="__blank" className="bg-green">
            Fork me on GitHub
          </a>
          {/* https://site.mockito.org/ */}
        </span>
      </div>
      <div className='project-title'>Data Visualization for Primary Schools in Ireland</div>
    </div >
  )
}
