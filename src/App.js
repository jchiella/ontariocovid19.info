import React from 'react';
import { useState, useEffect } from 'react';

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

import format from 'date-fns/format';
import formatDistance from 'date-fns/formatDistance';

import Chart from './Chart';

import { makeStyles } from '@material-ui/core/styles';

import { fetchData } from './data';

import Header from './Header';
import Controls from './Controls';

const useStyles = makeStyles({
  mainContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  chartContainer: {
    height: '40rem',
    border: '1px solid black',
    padding: '1rem',
  },
});

export default function App() {
  const classes = useStyles();

  const [data, setData] = useState([]);
  const [enabledSeries, setEnabledSeries] = useState([]);
  const [seriesOptions, setSeriesOptions] = useState([]);

  const [rangeStart, handleRangeStartChange] = useState(new Date('2020-01-26'));
  const [rangeEnd, handleRangeEndChange] = useState(new Date());

  const [windowSize, setWindowSize] = useState(5);

  useEffect(() => {
    if (windowSize > 0) {
      fetchData(windowSize).then((data) => {
        setData(data);
        setSeriesOptions(data.map((series) => series.id));
      });
    }
  }, [windowSize]);

  return (
    <Container className={classes.mainContainer}>
      <Header />

      <Controls 
        rangeStart={rangeStart}
        rangeEnd={rangeEnd}
        handleRangeStartChange={handleRangeStartChange}
        handleRangeEndChange={handleRangeEndChange}
        setEnabledSeries={setEnabledSeries}
        seriesOptions={seriesOptions}
        windowSize={windowSize}
        setWindowSize={setWindowSize}
      />
      
      <Container className={classes.chartContainer}>
        <Typography variant="h5">
          {format(rangeStart, 'MMM dd, yyyy')} - {format(rangeEnd, 'MMM dd, yyyy')} ({formatDistance(rangeStart, rangeEnd)})
        </Typography>
        <Chart data={data} enabledSeries={enabledSeries} rangeStart={rangeStart} rangeEnd={rangeEnd} />
      </Container>
    </Container>
  );
}