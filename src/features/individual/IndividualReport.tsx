import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import parseUrl from 'parse-url';
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

export function IndividualReport() {
  // const params = useSearchParams();
  // const { query } = parseUrl(window.location.href);
  const [rowInd, setRowInd] = useState(0)
  const counties = useAppSelector(state => state.main.counties);
  // const selectedCounty = useAppSelector(state => state.main.counties.find(c => c.name === query.county));
  // const schools = useAppSelector(state => state.main.schools);
  const schools = useAppSelector(state => state.main.schools.filter(it => state.main.selectedSchools.includes(it['id'])));
  const school = schools[rowInd];

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { headers, rows } = formatTabularSchoolData(schools);

  useEffect(() => {
    if (counties.length === 0) dispatch(loadCounties())
    if (schools.length === 0) dispatch(loadSchools())
  });

  const handlePrev = () => {
    if (rowInd >= 1) setRowInd(rowInd - 1);
  };

  const handleNext = () => {
    if (rowInd + 1 < (rows?.length || 0)) setRowInd(rowInd + 1);
  };

  // console.log(school);
  return (
    <div className='ind-report-wrapper'>
      {school && false &&
        <div className='sections-wraper'>
          <div className='section'>
            <div className='item'>
              <div className='item-label'>Roll Number</div>
              <div className='item-content'>{school['Roll Number']}</div>
            </div>
            <div className='item'>
              <div className='item-label'>School Name</div>
              <div className='item-content'>{school['Official Name']}</div>
            </div>
            <div className='item'>
              <div className='item-label'>County Description</div>
              <div className='item-content'>{school['County Description']}</div>
            </div>
            <div className='item'>
              <div className='item-label'>Local Authority Description</div>
              <div className='item-content'>{school['Local Authority Description']}</div>
            </div>
          </div>
          <div className='section'>
            <div className='item'>
              <div className='item-label'>'DEIS (Y/N)</div>
              <div className='item-content'>{school['DEIS (Y/N)']}</div>
            </div>
            <div className='item'>
              <div className='item-label'>Gaeltacht Indicator (Y/N)</div>
              <div className='item-content'>{school['Gaeltacht Indicator (Y/N)']}</div>
            </div>
            <div className='item'>
              <div className='item-label'>Irish Classification Description</div>
              <div className='item-content'>{school['Irish Classification Description']}</div>
            </div>
            <div className='item'>
              <div className='item-label'>Ethos Description</div>
              <div className='item-content'>{school['Ethos Description']}</div>
            </div>
          </div>
          <div className='section'>
            <div className='item'>
              <div className='item-label'>Junior Infants</div>
              <div className='item-content'>{school['Junior Infants']}</div>
            </div>
            <div className='item'>
              <div className='item-label'>Senior Infants</div>
              <div className='item-content'>{school['Senior Infants']}</div>
            </div>
            <div className='item'>
              <div className='item-label'>First Class</div>
              <div className='item-content'>{school['First Class']}</div>
            </div>
            <div className='item'>
              <div className='item-label'>Second Class</div>
              <div className='item-content'>{school['Second Class']}</div>
            </div>
            <div className='item'>
              <div className='item-label'>Third Class</div>
              <div className='item-content'>{school['Third Class']}</div>
            </div>
            <div className='item'>
              <div className='item-label'>Fourth Class</div>
              <div className='item-content'>{school['Fourth Class']}</div>
            </div>
            <div className='item'>
              <div className='item-label'>Fifth Class</div>
              <div className='item-content'>{school['Fifth Class']}</div>
            </div>
            <div className='item'>
              <div className='item-label'>Sixth Class</div>
              <div className='item-content'>{school['Sixth Class']}</div>
            </div>
            <div className='item'>
              <div className='item-label'>Special Class</div>
              <div className='item-content'>{school['Special Class']}</div>
            </div>
            <div className='item'>
              <div className='item-label'>Total</div>
              <div className='item-content'>{school.Total}</div>
            </div>
          </div>
        </div>
      }
      <div className='ind-footer' style={{ display: 'none' }}>
        <button className='preButton' onClick={handlePrev} >Prev</button>
        <span>{rowInd + 1} of {rows?.length}</span>
        <button className='nextButton' onClick={handleNext}>Next</button>
      </div>
    </div>
  )
}