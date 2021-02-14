import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  card: {
    margin: '1rem auto',
    textAlign: 'center',
    width: '60%',
  },
});

export default function Header() {
  const classes = useStyles();

  return (
    <Container>
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
    </Container>
  );
}