import { ReactComponent as dashBoardIconActive } from "./assests/dashboard-icon.svg";
import { ReactComponent as propertiesIconActive } from "./assests/properties-active.svg";
import { ReactComponent as paymentsIcon } from "./assests/project-inactive.svg";
import { ReactComponent as projectIconActive } from "./assests/projects.svg";
import { ReactComponent as contractorsIcon } from "./assests/contractors.svg";
import { ReactComponent as procurementIcon } from "./assests/procurement.svg";
import { ReactComponent as logisticsIcon } from "./assests/logistics.svg";
import { ReactComponent as storageIcon } from "./assests/storage.svg";
import { ReactComponent as clientsIcon } from "./assests/clients.svg";
import { ReactComponent as storageIconActive } from "./assests/storage-active.svg";
import { ReactComponent as clientsIconActive } from "./assests/client-active.svg";
import { ReactComponent as dashBoardIcon } from "./assests/overview-inactive.svg";
import { ReactComponent as propertiesIcon } from "./assests/properties-icon.svg";
import { ReactComponent as projectIcon } from "./assests/payment-inactive.svg";
import { ReactComponent as paymentsIconActive } from "./assests/money_bag.svg";
import { ReactComponent as contractorsIconActive } from "./assests/contractor-active.svg";
import { ReactComponent as logisticsIconActive } from "./assests/logistics-active.svg";
import { ReactComponent as procurementIconActive } from "./assests/procurement-active.svg";

export const SideBarLinks = [
  { id: 1, name: "Overview", to: "/dashboard", icon: dashBoardIcon, activeIcon: dashBoardIconActive },
  { id: 4, name: "Projects", to: "/projects", icon: projectIcon, activeIcon: projectIconActive },
  { id: 9, name: "Clients", to: "/clients", icon: clientsIcon, activeIcon: clientsIconActive },
  { id: 3, name: "Payments", to: "/payments", icon: paymentsIcon, activeIcon: paymentsIconActive },
  { id: 6, name: "Procurements", to: "/procurements", icon: procurementIcon, activeIcon: procurementIconActive },
  { id: 7, name: "Logistics", to: "/logistics", icon: logisticsIcon, activeIcon: logisticsIconActive },
  { id: 8, name: "Storage", to: "/storage", icon: storageIcon, activeIcon: storageIconActive },
  { id: 5, name: "Contactors", to: "/contractors", icon: contractorsIcon, activeIcon: contractorsIconActive },
  { id: 10, name: "Settings", to: "/settings", icon: logisticsIcon, activeIcon: logisticsIconActive },
];
