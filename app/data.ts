import { matchSorter } from "match-sorter";

export interface DataOptionType {
  id: string;
  label: string;
  description: string;
  referenceUrl: string;
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
    label: "2015 NYC Tree Data",
    description:
      "Street tree data from the TreesCount! 2015 Street Tree Census, conducted by volunteers and staff organized by NYC Parks & Recreation and partner",
    referenceUrl:
      "https://data.cityofnewyork.us/Environment/2015-Street-Tree-Census-Tree-Data/pi5s-9p35",
    initialViewState: {
      longitude: -73.9710129,
      latitude: 40.7637567, 
      zoom: 10.8,
      pitch: 20,
      bearing: 0,
    },
    dataUrl:
      "https://data.cityofnewyork.us/resource/5rq2-4hqu.json?$limit=10000&boroname=Manhattan",
  },
  {
    id: "la-active-business",
    label: "LA Active Business",
    description:
      "Listing of all active businesses currently registered with the Office of Finance",
    referenceUrl:
      "https://data.lacity.org/Administration-Finance/Listing-of-Active-Businesses/6rrh-rzua/about_data",
    initialViewState: {
      longitude: -118.4385022,
      latitude: 34.0825427,
      zoom: 10.2,
    },
    dataUrl:
      "https://data.lacity.org/resource/6rrh-rzua.json?$limit=150000&$WHERE=within_box(location_1, 33.7035, -118.6682, 34.8233, -117.6464) AND location_1 IS NOT NULL",
  },
   {
    id: "nyc-wifi-hotspot",
    label: "NYC Wifi Hotspots",
    description:
      "Listing of all hotspot locations in NYC",
    referenceUrl:
      "https://data.cityofnewyork.us/City-Government/NYC-Wi-Fi-Hotspot-Locations/yjub-udmw/about_data",
    initialViewState: {
      longitude:  -73.9710129,
      latitude: 40.7637567,
      zoom: 11,
      pitch: 30,
    },
    dataUrl:
      "https://data.cityofnewyork.us/resource/yjub-udmw.json",
  },
  {
    id: "nyc-center-service",
    label: "NYC Employment and Buisness - Centers and Services",
    description:
      "Find a NYC Department of Small Business Services NYC Business Solutions Center, Workforce1 Career Center, or Employment Works Center.",
    referenceUrl:
      "https://data.cityofnewyork.us/dataset/Center-Service-Locations/6smc-7mk6/about_data",
    initialViewState: {
      longitude:  -73.9710129,
      latitude: 40.7637567,
      zoom: 10.5,
      pitch: 30 
    },
    dataUrl:
      "https://data.cityofnewyork.us/resource/6smc-7mk6.json",
  },
];

export function getAllData(query?: string | null): DataOptionType[] {
  if (query) {
    return matchSorter(DATASET, query, {
      keys: ["label"],
    });
  }
  return DATASET;
}

export function getData(dataId: string): DataOptionType | undefined {
  return DATASET.find((data) => data.id === dataId);
}