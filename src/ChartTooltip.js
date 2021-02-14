import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  tooltip: {
    backgroundColor: 'white',
    fontFamily: 'Roboto, sans-serif',
    padding: '0.5rem',
    borderRadius: '0.3rem',
    border: '1px solid black',
  },
});

export default function ChartTooltip({ series, date, value }) {
  const classes = useStyles();

  return (
    <section className={classes.tooltip}>
      <strong>{series}</strong><br />
      <em>{new Date(date).toDateString()}</em><br />
      {value}
    </section>
  );
}