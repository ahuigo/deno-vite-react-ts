import { useState, useCallback } from 'react';
import { createRoot } from 'react-dom/client';
import Map from 'react-map-gl';

import DrawControl from './draw-control';
import { conf } from '@/conf';

type FeaturesObject = { features: { id: string; }[]; };

export default function App() {
  const [features, setFeatures] = useState({});

  const onUpdate = useCallback((e: FeaturesObject) => {
    setFeatures(currFeatures => {
      const newFeatures = { ...currFeatures } as any;
      for (const f of e.features) {
        newFeatures[f.id] = f;
      }
      return newFeatures;
    });
  }, []);

  const onDelete = useCallback((e: FeaturesObject) => {
    setFeatures(currFeatures => {
      const newFeatures = { ...currFeatures } as any;
      for (const f of e.features) {
        delete newFeatures[f.id];
      }
      return newFeatures;
    });
  }, []);

  return (
    <>
      <Map
        initialViewState={{
          longitude: -91.874,
          latitude: 42.76,
          zoom: 12
        }}
        mapStyle="mapbox://styles/mapbox/satellite-v9"
        mapboxAccessToken={conf.mapbox.accessToken}
      >
        <DrawControl
          position="top-left"
          displayControlsDefault={false}
          controls={{
            polygon: true,
            trash: true
          }}
          defaultMode="draw_polygon"
          onCreate={onUpdate!}
          onUpdate={onUpdate!}
          onDelete={onDelete!}
        />
      </Map>
      <div>feats:{JSON.stringify(features)}</div>
    </>
  );
}

// function renderToDom(container: any) {
//   createRoot(container).render(<App />);
// }