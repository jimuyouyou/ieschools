// quick start: cd data ; node preprocess.js

const XLSX = require('xlsx');
const path = require('path');
const fs = require('fs');
const { preProcessFile } = require('typescript');

// School
const wb = XLSX.readFile(path.resolve('./ie_school_2022.xlsx'));
const schools = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[2]]);
schools.pop()
schools.forEach(sc => {
  sc.id = sc['Roll Number'];
  [
    'id',
    'Roll Number',
    'Official Name',
    'County Description',
    'Local Authority Description',
    'DEIS (Y/N)',
    'Gaeltacht Indicator (Y/N)',
    'Irish Classification Description',
    'Ethos Description'
  ].forEach(p => {
    if (sc[p] == undefined) sc[p] = ''
  });

  [
    'Junior Infants',
    'Senior Infants',
    'First Class',
    'Second Class',
    'Third Class',
    'Fourth Class',
    'Fifth Class',
    'Sixth Class',
    'Special Class',
    'Total',
  ].forEach(p => {
    if (sc[p] == undefined) sc[p] = 0
  });

})
fs.writeFileSync(path.resolve('./schools.json'), JSON.stringify(schools));

// County
counties = new Set()
for (i = 0; i < schools.length; i++) {
  counties.add(schools[i]['County Description'])
}
countLists = Array.from(counties).map(c => { return { name: c } });
fs.writeFileSync(path.resolve('./counties.json'), JSON.stringify(countLists));

