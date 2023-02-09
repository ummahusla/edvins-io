/** @jsx jsx */
import { jsx } from 'theme-ui';
import React from 'react';

const CarbonAds = () => {
  React.useEffect(() => {
    const script = document.createElement('script');
    script.src = '//cdn.carbonads.com/carbon.js?serve=CWYDT23L&placement=edvinsio';
    script.id = '_carbonads_js';
    script.async = true;

    document.querySelectorAll('#carbon-container')[0].appendChild(script);
  }, []);

  return <div id="carbon-container" />;
};

export default CarbonAds;
