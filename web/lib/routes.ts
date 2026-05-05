export const ROUTES = {
  HOME: "/",
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",
  DASHBOARD: "/dashboard",
  DASHBOARD_INITIATE: "/dashboard/initiate",
  DASHBOARD_HISTORY: "/dashboard/history",
  DASHBOARD_PROFILE: "/dashboard/profile",
} as const;

export type Route = (typeof ROUTES)[keyof typeof ROUTES];
