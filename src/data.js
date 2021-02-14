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

const transformData = (data) => {
  const finalData = [];

  // Total Cases series
  finalData.push({
    id: 'totalCases',
    data: data.result.records.map((record) => {
      return {
        x: record['Reported Date'].split('T')[0],
        y: record['Total Cases'],
      };
    })
  });

  return finalData;
}

export {
  fetchData,
};