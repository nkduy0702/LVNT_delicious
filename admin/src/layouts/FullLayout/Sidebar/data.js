import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import PriceCheckSharpIcon from "@mui/icons-material/PriceCheckSharp";
import InventorySharpIcon from "@mui/icons-material/InventorySharp";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import LocalMallIcon from "@mui/icons-material/LocalMall";

const Menuitems = [
  {
    title: "Users Manager",
    icon: ManageAccountsIcon,
    href: "/users-manager",
  },
  {
    title: "Revenue Manager",
    icon: PriceCheckSharpIcon,
    href: "/sales-manager",
  },
  {
    title: "Ingredients Manager",
    icon: InventorySharpIcon,
    href: "/ingredients-manager",
  },
  {
    title: "Recipes Manager",
    icon: AutoStoriesIcon,
    href: "/recipes-manager",
  },
  {
    title: "Orders Manager",
    icon: LocalMallIcon,
    href: "/orders-manager",
  },
];

export default Menuitems;
