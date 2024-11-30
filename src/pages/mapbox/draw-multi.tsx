import { useEffect, useState } from "react";
import { MapboxContainer, MapboxContext } from "./mapbox-container";
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import mapboxgl from "mapbox-gl";

export default function App() {
  const [map, setMapbox] = useState(null as any as mapboxgl.Map);
  const [ploter, setPloter] = useState<any>(null);
  let answer = '';
  useEffect(() => {
    if (!map) return;
    console.log('mapbox', map);
    function updateArea(e: any) {
      const data = draw1.getAll();
      // const answer = document.getElementById('calculated-area');
      if (data.features.length > 0) {
        console.log(data);
        // const area = data;
        // const area = turf.area(data);
        // Restrict the area to 2 decimal points.
        // const rounded_area = Math.round(area * 100) / 100;
        answer = `<p><strong>xxx</strong></p><p>square meters</p>`;
      } else {
        answer = '';
        if (e.type !== 'draw.delete')
          alert('Click the map to draw a polygon.6');
      }
    }
    // map.removeControl(draw1);
    const draw1 = new MapboxDraw({
      displayControlsDefault: false,
      // Select which mapbox-gl-draw control buttons to add to the map.
      controls: {
        polygon: true,
        trash: true
      },
      // Set mapbox-gl-draw to draw by default.
      // The user does not have to click the polygon control button first.
      defaultMode: 'draw_polygon'
    });
    map.addControl(draw1);
    setPloter(draw1);

    map.on('draw.create', updateArea);
    map.on('draw.delete', updateArea);
    map.on('draw.update', updateArea);
  }, [map]);
  console.log(answer);
  const addMore = () => {
    ploter.changeMode('draw_polygon');
  };

  return <MapboxContainer setMapbox={setMapbox}>
    <div className="APP">App </div>
    <div id="calculated-area" onClick={addMore}>add more polygon</div>
  </MapboxContainer>;
}