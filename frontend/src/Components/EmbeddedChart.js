import React from 'react';

const EmbeddedChart = () => {
  return (
    <div className='mt-20 w-full  '>
      <iframe
        title="Stock Chart"
        src="/TaylorsStockChart/stockChart.html"  // Update the path to point to your app's HTML file
        height="1000px"
        className='w-full '
      />
    </div>
  );
};

export default EmbeddedChart;