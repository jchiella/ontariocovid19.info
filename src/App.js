import { useState, useEffect } from 'react';

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

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

  useEffect(() => {
    fetchData().then((data) => {
      console.log(data);
      setData(data);
    });
  } ,[]);

  return (
    <Container className={classes.mainContainer}>
      <Container className={classes.headerContainer}>
        <Typography variant="h2">
          Ontario COVID-19 Info
        </Typography>
      </Container>
      
      <Container className={classes.chartContainer}>
        <Chart data={data} />
      </Container>
    </Container>
  );
}