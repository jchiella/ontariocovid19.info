import { ResponsiveLine } from '@nivo/line';

export default function Chart({ data }) {
  return (
    <ResponsiveLine
        data={data}
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
          return <div>{`${point.serieId} on ${point.data.xFormatted}: ${point.data.yFormatted}`}</div>;
        }}
        
      />
  )
}