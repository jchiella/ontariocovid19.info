import React from 'react';
import PropTypes from 'prop-types';

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import StatsChart from './StatsChart';

const useStyles = makeStyles({
  statsContainer: {
    border: '1px solid black',
    margin: '1rem auto',
  },
});

export default function Stats({ stats }) {
  const classes = useStyles();

  return (
    <Container className={classes.statsContainer}>      
      {
        stats.map((stat, i) => (
          <section key={i} style={{ height: '40rem' }}>
            <Typography variant="h5">
              {stat.name}
            </Typography>
            <StatsChart data={stat.data} />
          </section>
        ))
      }
    </Container>
  );
}

Stats.propTypes = {
  stats: PropTypes.array,
};