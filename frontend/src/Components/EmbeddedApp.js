import React from 'react';

const EmbeddedApp = () => {
  return (
    <div className='mt-20absolute w-full left-0 mt-8'>
      <iframe
        title="Embedded App"
        src="/My%20Game/index.html"  // Update the path to point to your app's HTML file
        height="550px"
        className='w-full md:w-2/3 md:m-auto'
      />
    </div>
  );
};

export default EmbeddedApp;