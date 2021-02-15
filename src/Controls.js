import React from 'react';
import PropTypes from 'prop-types';

import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import InputLabel from '@material-ui/core/InputLabel';

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
  setEnabledSeries,
  seriesOptions,
  windowSize,
  setWindowSize,
}) {
  const classes = useStyles();

  const updateSeries = (_event, value) => {
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
          onChange={(e) => setWindowSize(parseInt(e.target.value))}
          InputProps={{
            min: 1,
            max: 30,
            endAdornment: <InputAdornment position="end">days</InputAdornment>,
            onKeyDown: (e) => e.preventDefault(),
            style: {
              caretColor: 'white',
            }
          }}
        />

        <section style={{display: 'inline-block'}}>
          <InputLabel>Common Moving Average Windows</InputLabel>
          <ButtonGroup size="small">
            <Button onClick={() => setWindowSize(5)}>5</Button>
            <Button onClick={() => setWindowSize(7)}>7</Button>
            <Button onClick={() => setWindowSize(10)}>10</Button>
            <Button onClick={() => setWindowSize(14)}>14</Button>
            <Button onClick={() => setWindowSize(21)}>21</Button>
          </ButtonGroup>
        </section>
      </Container>
    </MuiPickersUtilsProvider>
  );
}

Controls.propTypes = {
  rangeStart: PropTypes.object,
  rangeEnd: PropTypes.object,
  handleRangeStartChange: PropTypes.func,
  handleRangeEndChange: PropTypes.func,
  setEnabledSeries: PropTypes.func,
  seriesOptions: PropTypes.array,
  windowSize: PropTypes.number,
  setWindowSize: PropTypes.func,
};