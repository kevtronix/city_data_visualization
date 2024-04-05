import Map from "../components/map.client";
import { json, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import { getData } from "~/data";
import { ClientOnly } from "remix-utils/client-only";

export const loader = ({ params }: LoaderFunctionArgs) => {
  invariant(params.dataId, "Missing dataId param");
  const data = getData(params.dataId);
  if (!data) {
    throw new Response("Not Found", { status: 404 });
  }
  return json({ data, mapboxToken: process.env.MAPBOX_ACCESS_TOKEN });
};

export default function Data() {
  const { mapboxToken, data } = useLoaderData<typeof loader>();
  if (!mapboxToken) {
    throw new Error("Mapbox token is not defined");
  }

  return (
    <ClientOnly fallback={<div>Loading...</div>}>
      {() => <Map mapboxToken={mapboxToken} data={data} />}
    </ClientOnly>
  );
}
