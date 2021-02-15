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

const statsDataset = (data, name, field) => {
  const counts = {};

  data.map((record) => {
    if (counts[record[field]] === undefined) {
      counts[record[field]] = 0;
    } else {
      counts[record[field]] += 1;
    }
  });

  console.log(counts);

  return {
    name,
    data: Object.entries(counts).map(([countName, countVal]) => {
      return {
        id: countName,
        value: countVal,
      };
    }),
  };
};

const transformData = (data) => {
  const initialData = data.result.records;

  return [
    statsDataset(initialData, 'By Sex', 'Client_Gender'),
    statsDataset(initialData, 'By Method of Exposure', 'Case_AcquisitionInfo'),
    statsDataset(initialData, 'By Outcome', 'Outcome1'),
    statsDataset(initialData, 'By Public Health Unit', 'Reporting_PHU'),
    statsDataset(initialData, 'By Age Group', 'Age_Group'),
  ];
};

export {
  fetchCasesData,
};