import Home from "../pages/Home";
import About from "../pages/About";
import React from "react";

interface RouteItem {
  path: string,
  element: React.FC,
  exact: boolean
}

export const publicRoutes: RouteItem[] = [
  {path: '/', element: Home, exact: true},
  {path: '/about', element: About, exact: true},
  {path: '*', element: Home, exact: true},
]
