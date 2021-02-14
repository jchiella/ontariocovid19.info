import { ResponsiveLine } from '@nivo/line';

import ChartTooltip from './ChartTooltip';

export default function Chart({ data, enabledSeries, rangeStart, rangeEnd }) {
  return (
    <ResponsiveLine
        data={
          data
            .filter((series) => enabledSeries.includes(series.id))
            .map((series) => {
              return {
                id: series.id,
                data: series.data.map((item) => new Date(item.x) >= rangeStart /*&& new Date(item.x) <= rangeEnd*/),
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

        useMesh={true}

        tooltip={({point}) => {
          return <ChartTooltip series={point.serieId} date={point.data.xFormatted} value={point.data.yFormatted} />
        }}
      />
  )
}