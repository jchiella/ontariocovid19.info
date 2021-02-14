import fetchJsonp from 'fetch-jsonp';

const apiUrl = 'https://data.ontario.ca/api/3/action/datastore_search?';
const params = {
  resource_id: 'ed270bb8-340b-41f9-a7c6-e8ef587e6d11',
  limit: 100000,
};

const fetchData = async () => {
  const res = await fetchJsonp(apiUrl + new URLSearchParams(params));
  return res.json()
    .then((data) => transformData(data));
}

const convertToDate = (str) => new Date(str.split('T')[0]);

const basicDataset = (data, oldName, newName) => {
  return {
    id: newName,
    data: data.map((record) => {
      return {
        x: record['Reported Date'].split('T')[0],
        y: record[oldName],
      };
    })
  };
};

const transformData = (data) => {
  const initialData = data.result.records.sort((a, b) => {
    return convertToDate(a['Reported Date']) - convertToDate(b['Reported Date']);
  });

  return [
    basicDataset(initialData, 'Confirmed Positive', 'Active Cases'),
    basicDataset(initialData, 'Resolved', 'Cumulative Resolved Cases'),
    basicDataset(initialData, 'Deaths', 'Cumulative Deaths'),
    basicDataset(initialData, 'Total Cases', 'Cumulative Cases'),
    basicDataset(initialData, 'Total tests completed in the last day', 'Tests Completed in Previous 24h'),
    basicDataset(initialData, 'Under Investigation', 'Pending Tests'),
    basicDataset(initialData, 'Number of patients hospitalized with COVID-19', 'Current Hospitalizations'),
    basicDataset(initialData, 'Number of patients in ICU with COVID-19', 'Current ICU Patients'),
    basicDataset(initialData, 'Number of patients in ICU on a ventilator with COVID-19', 'Current Patients on a Ventilator'),
  ];
}

export {
  fetchData,
};