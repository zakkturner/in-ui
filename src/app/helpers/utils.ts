interface MenuItems {
  name: string;
  url: string;
  needsAuth: boolean;
}

export const menuItems: MenuItems[] = [
  {
    name: "home",
    url: "/",
    needsAuth: false,
  },
  {
    name: "about",
    url: "/about",
    needsAuth: false,
  },
  {
    name: "create",
    url: "/post/create",
    needsAuth: true,
  },
  {
    name: "dashboard",
    url: "/dashboard",
    needsAuth: true,
  },
  {
    name: "register",
    url: "/auth/register",
    needsAuth: true,
  },
  {
    name: "login",
    url: "/auth/login",
    needsAuth: true,
  },
  {
    name: "contact",
    url: "/contact",
    needsAuth: false,
  },
];
