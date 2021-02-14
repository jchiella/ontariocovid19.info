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
    basicDataset(initialData, 'Total Cases', 'Total Cases'),
    basicDataset(initialData, 'Deaths', 'Deaths'),
  ];
}

export {
  fetchData,
};