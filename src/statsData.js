import fetchJsonp from 'fetch-jsonp';

const apiUrl = 'https://data.ontario.ca/api/3/action/datastore_search?';
const params = {
  resource_id: '455fd63b-603d-4608-8216-7d8647f43350',
  limit: 1000,
};

const fetchCasesData = async () => {
  const res = await fetchJsonp(apiUrl + new URLSearchParams(params));
  return res.json()
    .then((data) => transformData(data));
};

const statsDataset = (data, name, field, values) => {
  return {
    name,
    data: values.map((val) => {
      return {
        'id': val,
        'value': data.filter((record) => record[field] === val).length
      };
    }).filter((point) => point.value !== 0),
  };
};

const transformData = (data) => {
  const initialData = data.result.records;

  return [
    statsDataset(initialData, 'Sex', 'Client_Gender', ['FEMALE', 'MALE']),
    statsDataset(initialData, 'Method of Exposure', 'Case_AcquisitionInfo', ['CC', 'No Epi-link', 'No Info-Missing', 'No Info-Unknown', 'OB', 'Travel']),
    statsDataset(initialData, 'Outcome', 'Outcome1', ['Resolved', 'Not Resolved', 'Fatal']),
  ];
};

export {
  fetchCasesData,
};