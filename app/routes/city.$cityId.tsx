import { Suspense } from "react";
import Map from "../components/map.client";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export const loader = async () => {
  return json({ mapboxToken: process.env.MAPBOX_ACCESS_TOKEN });
};

export default function City() {
  const { mapboxToken } = useLoaderData<typeof loader>();
  if (!mapboxToken) {
    throw new Error("Mapbox token is not defined");
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Map mapboxToken={mapboxToken} />
    </Suspense>
  );
}
