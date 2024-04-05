import { matchSorter } from "match-sorter";

export interface DataOptionType {
  id: string;
  label: string;
  initialViewState: {
    longitude: number;
    latitude: number;
    zoom: number;
    pitch?: number;
    bearing?: number;
  };
  dataUrl: string;
}

const DATASET: DataOptionType[] = [
  {
    id: "nyc-tree",
    label: "NYC Tree Data",
    initialViewState: {
      longitude: -73.9710129,
      latitude: 40.7637567,
      zoom: 11,
      pitch: 40.5,
      bearing: -27,
    },
    dataUrl:
      "https://data.cityofnewyork.us/resource/5rq2-4hqu.json?$limit=10000&boroname=Manhattan",
  },
  {
    id: "la-active-business",
    label: "LA Active Business",
    initialViewState: {
      longitude: -118.4385022,
      latitude: 34.0825427,
      zoom: 11,
    },
    dataUrl:
      "https://data.lacity.org/resource/6rrh-rzua.json?$limit=150000&$WHERE=within_box(location_1, 33.7035, -118.6682, 34.8233, -117.6464) AND location_1 IS NOT NULL",
  },
  {
    id: "westchester-facilities",
    label: "W",
    initialViewState: {
      longitude: -73.88315357141246,
      latitude: 40.942970830130356,
      zoom: 10,
      pitch: 40.5,
      bearing: -27,
    },
    dataUrl: "https://health.data.ny.gov/resource/ba3n-bkk4.json",
  },
];

export function getData(dataId: string): DataOptionType | undefined {
  return DATASET.find((d) => d.id === dataId);
}

export function getAllData(query?: string | null): DataOptionType[] {
  if (query) {
    return matchSorter(DATASET, query, {
      keys: ["label"],
    });
  }
  return DATASET;
}
