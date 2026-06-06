import type { ReactNode } from "react";

const dash = '/dashboard'

export const ROUTES = {
  CASH: `${dash}/cash`,
  HOME: `${dash}`,
  PROFILE: `${dash}/profile`
} as const;

export const CASH_ROUTES = {
  HARDCODE: `${dash}/cash/hardcode`,
  SCAN: `${dash}/cash/scan`
} as const

export type RouteItem = {
    label: string | null;
    route: (typeof ROUTES)[keyof typeof ROUTES];
    icon: ReactNode;
}

type Roles = "user" | "admin";