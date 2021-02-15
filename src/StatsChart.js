import React from 'react';
import PropTypes from 'prop-types';

import { ResponsivePie } from '@nivo/pie';

export default function StatsChart({ data }) {
  return (
    <ResponsivePie
      data={data}
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      innerRadius={0.5}
      enableRadialLabels={false}
      enableSliceLabels={false}
      legends={[
        {
          anchor: 'left',
          direction: 'column',
          justify: false,
          itemsSpacing: 15,
          itemHeight: 10,
          symbolShape: 'circle',
        },
      ]}
    />
  );
}

StatsChart.propTypes = {
  data: PropTypes.array,
};