import { json } from "@remix-run/node";
import {
  Form,
  Links,
  Meta,
  NavLink,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useNavigation,
  useSubmit,
} from "@remix-run/react";
import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";

import appStylesHref from "./app.css?url";

import { getAllData } from "./data";
import { useEffect } from "react";
import { Button, CssVarsProvider } from "@mui/joy";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: appStylesHref },
];

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  const allData = getAllData(q);
  return json({ allData, q });
};

export default function App() {
  const { allData, q } = useLoaderData<typeof loader>();
  const navigation = useNavigation();
  const submit = useSubmit();
  const searching =
    navigation.location &&
    new URLSearchParams(navigation.location.search).has("q");

  useEffect(() => {
    const searchField = document.getElementById("q");
    if (searchField instanceof HTMLInputElement) {
      searchField.value = q || "";
    }
  }, [q]);

  return (
    <CssVarsProvider>
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <Meta />
          <Links />
        </head>
        <body>
          <div id="sidebar">
            <h1>Data Sets</h1>
            <div>
              <Form
                id="search-form"
                role="search"
                onChange={(event) => {
                  const isFirstSearch = q === null;
                  submit(event.currentTarget, {
                    replace: !isFirstSearch,
                  });
                }}
              >
                <input
                  id="q"
                  defaultValue={q || ""}
                  aria-label="Search contacts"
                  className={searching ? "loading" : ""}
                  placeholder="Search"
                  type="search"
                  name="q"
                />
                <div id="search-spinner" aria-hidden hidden={!searching} />
              </Form>
            </div>
            <nav>
              <ul>
                {allData.map((data) => (
                  <li key={data.id}>
                    <NavLink
                      className={({ isActive, isPending }) =>
                        isActive ? "active" : isPending ? "pending" : ""
                      }
                      to={`data/${data.id}`}
                    >
                      <>{data.label}</>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <div
            id="detail"
            className={
              navigation.state === "loading" && !searching ? "loading" : ""
            }
          >
            <Outlet />
          </div>
          <ScrollRestoration />
          <Scripts />
        </body>
      </html>
    </CssVarsProvider>
  );
}