import camelCase from 'camelcase';
import { School } from "../types/School.d"
import { CellType } from "../components/TableChart"

const getLinkTo = (colName: string, school: School) => {
  const county = school['County Description']
  const schoolId = school['id']
  if ('Official Name' === colName) return `/individual?count=${county}&school=${schoolId}`;
  else if ('Bar Chart' === colName) return `/barchart?count=${county}&school=${schoolId}`;
  else if ('Pie Chart' === colName) return `/piechart?count=${county}&school=${schoolId}`;
  return ''
};

export const formatTabularSchoolData = (schools: Array<School>) => {
  let headers = new Array<CellType>();
  let rows = new Array<Array<CellType>>();

  if (schools.length > 0) {
    const cellsTypes = new Array<CellType>();
    const school = schools[0];
    Object.keys(school).forEach(key => {
      cellsTypes.push({ id: camelCase(key), desc: key })
    });
    cellsTypes.push({ id: camelCase('Bar Chart'), desc: 'Bar Chart' });
    cellsTypes.push({ id: camelCase('Pie Chart'), desc: 'Pie Chart' });


    headers = cellsTypes;
    for (let i = 0; i < schools.length; i++) {
      const sch = schools[i]
      const row = new Array<CellType>();
      for (let j = 0; j < cellsTypes.length; j++) {
        const { id, desc } = cellsTypes[j];
        const objKey = desc as keyof School;
        row.push({
          id,
          desc: sch.hasOwnProperty(objKey) ? sch[objKey] : objKey,
          linkTo: getLinkTo(objKey, sch)
        });
      }
      rows.push(row);
    }
  }

  return { headers, rows }
}