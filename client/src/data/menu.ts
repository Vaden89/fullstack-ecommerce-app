import { ClipboardCheck, Home, Store } from "lucide-react";

export const AdminMenu = [
  {
    title: "Home",
    icon: Home,
    url: "/admin",
  },
  {
    title: "Products",
    icon: Store,
    url: "/admin/products",
  },
  {
    title: "Orders",
    icon: ClipboardCheck,
    url: "/admin/orders",
  },
];
