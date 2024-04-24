import GLMap from "react-map-gl";
import { DeckGL } from "@deck.gl/react";
import { AmbientLight, PointLight, LightingEffect } from "@deck.gl/core";
import { HexagonLayer } from "@deck.gl/aggregation-layers";
import { DataOptionType } from "~/data";
import { getPositions } from "../utils/map.utils";

const ambientLight = new AmbientLight({
  color: [255, 255, 255],
  intensity: 1.0,
});

const pointLight1 = new PointLight({
  color: [255, 255, 255],
  intensity: 0.8,
  position: [-0.144528, 49.739968, 80000],
});

const pointLight2 = new PointLight({
  color: [255, 255, 255],
  intensity: 0.8,
  position: [-3.807751, 54.104682, 8000],
});

const lightingEffect = new LightingEffect({
  ambientLight,
  pointLight1,
  pointLight2,
});

const MAP_STYLE =
  "https://basemaps.cartocdn.com/gl/dark-matter-nolabels-gl-style/style.json";

export default function Map({
  mapboxToken,
  data,
}: {
  mapboxToken: string;
  data: DataOptionType;
}) {
  const layers = [
    new HexagonLayer({
      id: data.id,
      colorRange: [
        [1, 152, 189],
        [73, 227, 206],
        [216, 254, 181],
        [254, 237, 177],
        [254, 173, 84],
        [209, 55, 78],
      ],
      coverage: 1,
      data: data.dataUrl,
      elevationRange: [0, 4000],
      // elevationScale: data ? 5 : 0,
      getPosition: getPositions(data.id),
      pickable: true,
      extruded: true,
      radius: 150,
      material: {
        ambient: 0.64,
        diffuse: 0.6,
        shininess: 32,
        specularColor: [51, 51, 51],
      },
      upperPercentile: 100,
      transitions: {
        elevationScale: 3000,
      },
    }),
  ];
  return (
    <div style={{ position: "relative", height: "100%" }}>
      <DeckGL
        initialViewState={data.initialViewState}
        effects={[lightingEffect]}
        controller={true}
        layers={layers}
      >
        <GLMap
          mapboxAccessToken={mapboxToken}
          reuseMaps={true}
          mapStyle={MAP_STYLE}
        />
      </DeckGL>
    </div>
  );
}
