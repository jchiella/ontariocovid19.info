import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Container from '@material-ui/core/Container';

import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  controls: {
    margin: '1rem',
  },
  control: {
    margin: '0.5rem',
  },
});

export default function Controls({
  rangeStart,
  rangeEnd,
  handleRangeStartChange,
  handleRangeEndChange,
  enabledSeries,
  setEnabledSeries,
  seriesOptions,
  setSeriesOptions,
  windowSize,
  setWindowSize,
}) {
  const classes = useStyles();

  const updateSeries = (event, value, reason) => {
    setEnabledSeries(value);
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Container className={classes.controls}>
        <Autocomplete
          className={classes.control}
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
          onChange={updateSeries}
        />

        <DatePicker
          className={classes.control}
          label="Start Date"
          value={rangeStart}
          onChange={handleRangeStartChange}
          minDate="2020-01-26"
          minDateMessage="Date cannot be before the start of the pandemic"
          maxDate={rangeEnd}
          maxDateMessage="Date cannot be after the end of the range"
        />

        <DatePicker
          className={classes.control}
          label="End Date"
          variant="outlined"
          value={rangeEnd}
          onChange={handleRangeEndChange}
          minDate={rangeStart}
          minDateMessage="Date cannot be before the start of the range"
          maxDate={new Date()}
          maxDateMessage="Date cannot be after today"
        />

        <TextField
          className={classes.control}
          label="Moving Average Window"
          type="number"
          value={windowSize}
          onChange={(e) => setWindowSize(e.target.value)}
          InputProps={{
            min: 1,
            max: 30,
            endAdornment: <InputAdornment position="end">days</InputAdornment>,
          }}
        />
      </Container>
    </MuiPickersUtilsProvider>
  );
}