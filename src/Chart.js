import React from 'react';
import PropTypes from 'prop-types';
import { ResponsiveLine } from '@nivo/line';

import ChartTooltip from './ChartTooltip';

import isWithinInterval from 'date-fns/isWithinInterval';

export default function Chart({ data, enabledSeries, rangeStart, rangeEnd }) {
  return (
    <ResponsiveLine
      data={
        data
          .filter((series) => enabledSeries.includes(series.id))
          .map((series) => {
            return {
              id: series.id,
              data: series.data.filter((item) => isWithinInterval(new Date(item.x), { start: rangeStart, end: rangeEnd })),
            };
          })
      }
      margin={{
        'bottom': 80,
        'left': 40,
        'right': 40,
      }}
      curve="natural"
      xScale={{
        type: 'time',
        format: '%Y-%m-%d'
      }}
      axisBottom={{
        format: '%b %d',
        tickRotation: 90,
      }}
      xFormat="time:%Y-%m-%d"
      enableGridX={false}
      enableGridY={false}
      lineWidth={2}
      enablePoints={false}
      enableArea={true}
      areaOpacity={0.3}

      enableSlices="x"

      sliceTooltip={({ slice }) => {
        return <ChartTooltip date={slice.points[0].data.xFormatted} points={slice.points} />;
      }}
    />
  );
}

Chart.propTypes = {
  data: PropTypes.array,
  enabledSeries: PropTypes.array,
  rangeStart: PropTypes.object,
  rangeEnd: PropTypes.object,
};