import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

import { ResponsiveLine } from '@nivo/line';

import { makeStyles } from '@material-ui/core/styles';

import data from './data.json';

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
  },
});

export default function App() {
  const classes = useStyles();

  return (
    <Container className={classes.mainContainer}>
      <Container className={classes.headerContainer}>
        <Typography variant="h2">
          Ontario COVID-19 Info
        </Typography>
      </Container>
      
      <Container className={classes.chartContainer}>
        <ResponsiveLine data={data} />
      </Container>
    </Container>
  );
}