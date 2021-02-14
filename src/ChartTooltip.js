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

export default function ChartTooltip({ date, points }) {
  const classes = useStyles();

  return (
    <section className={classes.tooltip}>
      <em>{new Date(date).toDateString()}</em><br />
      {
        points.map((point, i) => {
          return (
            <div key={i}>
              <strong>{point.serieId}:&nbsp;</strong>
              {point.data.yFormatted.toLocaleString()}
            </div>
          );
        })
      }
      
    </section>
  );
}