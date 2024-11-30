import React, { useState, useEffect, useContext } from 'react';
// import * as turf from '@turf/turf';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"

import { conf } from '@/conf';

// {/* <link href="https://api.mapbox.com/mapbox-gl-js/v3.2.0/mapbox-gl.css" rel="stylesheet"> */}
// <link href='https://api.mapbox.com/mapbox-gl-js/v2.8.1/mapbox-gl.css' rel='stylesheet' />
// import { IControl, Map as MapboxMap } from 'mapbox-gl';
// function Heatmap() {
//   const { mapbox} = useContext(MapboxContext);
//   return (
//     <MapboxContainer>
//       <legend>Heatmap</legend> <p>{mapbox}</p>
//       <MapboxContext.Consumer>{({ mapbox }) => <div>{mapbox}</div>}</MapboxContext.Consumer>
//     </MapboxContainer>
//   );
// }

export const MapboxContext = React.createContext<{
  mapbox: mapboxgl.Map;
}>({
  mapbox: null as any,
});

interface Props {
  children: React.ReactNode;
  setMapbox: (mapbox: mapboxgl.Map) => void;
}

export function MapboxContainer(props: Props) {
  const { children } = props;
  const [mapbox, setMapbox] = useState(null as any as mapboxgl.Map);
  // const mapRef = React.useRef<HTMLDivElement>(null);
  useEffect(() => {
    mapboxgl.accessToken = conf.mapbox.accessToken;
    const mapbox = new mapboxgl.Map({
      container: 'mapboxdiv',
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-74.5, 40],
      zoom: 9,
    });
    props.setMapbox(mapbox);
    console.log('mapbx36', mapbox);
    setMapbox(mapbox);
  }, []);

  // const children2 = React.memo(ch ildren);
  return (<>
    <div id="mapboxdiv" className='flex flex-1 h-96 w-72' />
    {mapbox && children}
    {/* <MapboxContext.Provider value={{ mapbox: 2 }}>
        <Heatmap />
      </MapboxContext.Provider> */}

  </>
  );
};
