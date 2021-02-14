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

const transformData = (data) => {
  const initialData = data.result.records.sort((a, b) => {
    return convertToDate(a['Reported Date']) - convertToDate(b['Reported Date']);
  });
  const finalData = [];

  // Total Cases series
  finalData.push({
    id: 'Total Cases',
    data: initialData.map((record) => {
      return {
        x: record['Reported Date'].split('T')[0],
        y: record['Total Cases'],
      };
    })
  });

  // Deaths series
  finalData.push({
    id: 'Deaths',
    data: initialData.map((record) => {
      return {
        x: record['Reported Date'].split('T')[0],
        y: record['Deaths'],
      };
    })
  })

  return finalData;
}

export {
  fetchData,
};