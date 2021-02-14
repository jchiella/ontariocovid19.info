import fetchJsonp from 'fetch-jsonp';

import parseISO from 'date-fns/parseISO';
import format from 'date-fns/format';
import compareAsc from 'date-fns/compareAsc';

import _ from 'lodash';

const apiUrl = 'https://data.ontario.ca/api/3/action/datastore_search?';
const params = {
  resource_id: 'ed270bb8-340b-41f9-a7c6-e8ef587e6d11',
  limit: 100000,
};

const fetchData = async (windowSize) => {
  const res = await fetchJsonp(apiUrl + new URLSearchParams(params));
  return res.json()
    .then((data) => transformData(data, windowSize));
}

const basicDataset = (data, newName, oldName) => {
  return {
    id: newName,
    data: data.map((record) => {
      return {
        x: format(parseISO(record['Reported Date']), 'yyyy-MM-dd'),
        y: record[oldName],
      };
    })
  };
};

const dailyDataset = (data, newName, oldName) => {
  let previousData = 0;
  return {
    id: newName,
    data: data.map((record) => {
      const result = {
        x: format(parseISO(record['Reported Date']), 'yyyy-MM-dd'),
        y: record[oldName] - previousData,
      };
      previousData = record[oldName];
      return result;
    })
  };
};

const sum = (nums) => _.reduce(nums, (a, b) => a + b, 0);
const average = (nums) => sum(nums) / (nums.length || 1);
const makeWindow = (before, after) => {
  return (_number, index, array) => {
    const start = Math.max(0, index - before);
    const end = Math.min(array.length, index + after + 1);
    return _.slice(array, start, end);
  };
};

const movingAverage = (nums, { before, after }) => _.chain(nums)
  .map(makeWindow(before, after))
  .map(average)
  .value();

const averageDataset = (data, windowSize, newName, oldName) => {
  const averagedData = movingAverage(
    data.map((record) => record[oldName]),
    {
      before: Math.ceil(windowSize / 2),
      after: Math.floor(windowSize / 2),
    }
  );

  return {
    id: newName,
    data: data.map((record, i) => {
      return {
        x: format(parseISO(record['Reported Date']), 'yyyy-MM-dd'),
        y: averagedData[i],
      };
    })
  };
};

const transformData = (data, windowSize) => {
  const initialData = data.result.records.sort((a, b) => {
    return compareAsc(parseISO(a['Reported Date']), parseISO(b['Reported Date']));
  });

  return [
    basicDataset(initialData, 'Daily Active Cases', 'Confirmed Positive'),
    basicDataset(initialData, 'Cumulative Resolved Cases', 'Resolved'),
    basicDataset(initialData, 'Cumulative Deaths', 'Deaths'),
    basicDataset(initialData, 'Cumulative Cases', 'Total Cases'),
    basicDataset(initialData, 'Daily Tests Completed in Previous 24h', 'Total tests completed in the last day'),
    basicDataset(initialData, 'Daily Pending Tests', 'Under Investigation'),
    basicDataset(initialData, 'Daily Hospitalizations', 'Number of patients hospitalized with COVID-19'),
    basicDataset(initialData, 'Daily ICU Patients', 'Number of patients in ICU with COVID-19'),
    basicDataset(initialData, 'Daily Patients on a Ventilator', 'Number of patients in ICU on a ventilator with COVID-19'),

    dailyDataset(initialData, 'Daily New Cases', 'Total Cases'),
    dailyDataset(initialData, 'Daily New Deaths', 'Deaths'),

    averageDataset(initialData, windowSize, 'Average Hospitalizations', 'Number of patients hospitalized with COVID-19'),
  ];
}

export {
  fetchData,
};