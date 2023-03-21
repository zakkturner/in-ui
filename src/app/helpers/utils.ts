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
    name: "create",
    url: "/posts/create",
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
    needsAuth: false,
  },
  {
    name: "login",
    url: "/auth/login",
    needsAuth: false,
  },
  {
    name: "contact",
    url: "/contact",
    needsAuth: false,
  },
];
