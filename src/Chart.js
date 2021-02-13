import { ResponsiveLine } from '@nivo/line';

export default function Chart({ data }) {
  return (
    <ResponsiveLine
        data={data}
        margin={{
          'bottom': 30
        }}
        curve="natural"
        xScale={{ 
          type: 'time',
          format: '%Y-%m-%d'
        }}
        axisBottom={{
          format: '%Y-%m-%d',
        }}
        xFormat="time:%Y-%m-%d"
        enableGridX={false}
        enableGridY={false}
        lineWidth={2}
        enablePoints={false}
        enableArea={true}
        areaOpacity={0.3}
        useMesh={true}
        legends={[
            {
                anchor: 'top',
                direction: 'row',
                justify: false,
                translateX: 0,
                translateY: 0,
                itemsSpacing: 0,
                itemDirection: 'left-to-right',
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: 'circle',
                symbolBorderColor: 'rgba(0, 0, 0, .5)',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemBackground: 'rgba(0, 0, 0, .03)',
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
    />
  )
}