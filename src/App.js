import { useState, useEffect } from 'react';

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import FormGroup from '@material-ui/core/FormGroup';

import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

import format from 'date-fns/format';
import formatDistance from 'date-fns/formatDistance';

import Chart from './Chart';

import { makeStyles } from '@material-ui/core/styles';

import { fetchData } from './data';

const useStyles = makeStyles({
  mainContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '98vh',
  },
  headerContainer: {
    padding: '1rem',
  },
  chartContainer: {
    height: '60vh',
    border: '1px solid black',
    padding: '1rem',
  },
  card: {
    margin: '1rem auto',
    textAlign: 'center',
    width: '50%',
  },
  controls: {
    flexDirection: 'row',
    width: '100%',
    margin: 'auto',
  }
});

export default function App() {
  const classes = useStyles();

  const [data, setData] = useState([]);
  const [enabledSeries, setEnabledSeries] = useState([]);
  const [seriesOptions, setSeriesOptions] = useState([]);

  const [rangeStart, handleRangeStartChange] = useState(new Date('2020-01-26'));
  const [rangeEnd, handleRangeEndChange] = useState(new Date());

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
        <Card className={classes.card}>
          <CardContent>
            <Typography variant="h3">
              Ontario COVID-19 Info
            </Typography>
            <Typography variant="body1" style={{ marginBottom: '2rem' }}>
              Welcome to this interactive dashboard of COVID-19 data for the province of Ontario.
              All data shown here is sourced from the&nbsp;
              <a href="https://data.ontario.ca/en/group/2019-novel-coronavirus" target="_blank">Government of Ontario's Data Catalogue</a>, 
              which contains a number of datasets which provide information on the status of the COVID-19 pandemic.
            </Typography>
            <Typography variant="body2">
              Made with 💙 by <a href="jameschiella.ca">james chiella</a>
            </Typography>
          </CardContent>
        </Card>

        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <FormGroup className={classes.controls}>
            <DatePicker
              label="Start Date"
              value={rangeStart}
              onChange={handleRangeStartChange}
              minDate="2020-01-26"
              minDateMessage="Date cannot be before the start of the pandemic"
              maxDate={rangeEnd}
              maxDateMessage="Date cannot be after the end of the range"
            />

            <Autocomplete
              multiple
              fullWidth={false}
              options={seriesOptions}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Datasets"
                />
              )}
              style={{
                margin: 'auto 2rem',
                flexGrow: 1,
              }}
              onChange={updateSeries}
            />

            <DatePicker
              label="End Date"
              value={rangeEnd}
              onChange={handleRangeEndChange}
              minDate={rangeStart}
              minDateMessage="Date cannot be before the start of the range"
              maxDate={new Date()}
              maxDateMessage="Date cannot be after today"
            />
          </FormGroup>
        </MuiPickersUtilsProvider>
        
      </Container>
      
      <Container className={classes.chartContainer}>
        <Typography variant="h5">
          {format(rangeStart, 'MMM dd, yyyy')} - {format(rangeEnd, 'MMM dd, yyyy')} ({formatDistance(rangeStart, rangeEnd)})
        </Typography>
        <Chart data={data} enabledSeries={enabledSeries} rangeStart={rangeStart} rangeEnd={rangeEnd} />
      </Container>
    </Container>
  );
}