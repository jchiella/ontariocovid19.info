import { useState, useEffect } from 'react';

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

import Chart from './Chart';

import { makeStyles } from '@material-ui/core/styles';

import { fetchData } from './data';

const useStyles = makeStyles({
  mainContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
  headerContainer: {
    padding: '1rem',
  },
  chartContainer: {
    height: '60vh',
    border: '1px solid black',
    padding: '1rem',
  },
});

export default function App() {
  const classes = useStyles();

  const [data, setData] = useState([]);
  const [enabledSeries, setEnabledSeries] = useState([]);
  const [seriesOptions, setSeriesOptions] = useState([]);

  useEffect(() => {
    fetchData().then((data) => {
      setData(data);
      setSeriesOptions(data.map((series) => series.id));
    });
  }, []);

  const updateSeries = (event, value, reason) => {
    setEnabledSeries(value);
  };

  return (
    <Container className={classes.mainContainer}>
      <Container className={classes.headerContainer}>
        <Typography variant="h2">
          Ontario COVID-19 Info
        </Typography>

        <Autocomplete
          multiple
          options={seriesOptions}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              label="Datasets"
            />
          )}
          onChange={updateSeries}
        />
      </Container>
      
      <Container className={classes.chartContainer}>
        <Chart data={data} enabledSeries={enabledSeries} />
      </Container>
    </Container>
  );
}