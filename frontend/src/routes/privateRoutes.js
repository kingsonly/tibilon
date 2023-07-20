import Dashboard from "../components/Dashboard/Dashboard";
import ComposeInternalLayouts from "../components/HOC/ComposeInternalLayout";
import Payment from "../pages/payments/Payment";
import Properties from "../pages/Properties/Properties";
import DashboardPage from "../pages/dashboardCard";
import ProjectCardPage from "../pages/projectCardDisplay";
import RecentActivityPage from "../pages/recentActivityCard";
import Projects from "../pages/projects/Projects";
import Contractors from "../pages/Contractors/Contractors";
import Procurements from "../pages/procurements/Procurements";
import Logistics from "../pages/Logistics/Logistics";
import Storage from "../pages/storage/Storage";
import Clients from "../pages/clients/Clients";
import ProjectActions from "../pages/projects/ProjectActions";
import BudgetAndPlanning from "../pages/projects/budgetAndPlanning/BudgetAndPlanning";
import PaymentSchedule from "../pages/projects/PaymentSchedule";
import ProjectProperties from "../pages/projects/ProjectProperties";
import Employee from "../pages/Employee/Employee";
import Affiliates from "../pages/Affiliates/Affiliates";
import ProjectTasks from "../pages/projects/ProjectTasks";
import ProjectMaterials from "../pages/projects/ProjectMaterials";
import ProjectPropertiesDetails from "../pages/projects/ProjectPropertiesDetails";
import CreateContractor from "../pages/Contractors/CreateContractor";
import ProjectDocuments from "../pages/projects/ProjectDocuments";
import Settings from "../pages/Settings/Settings";
import Materials from "../pages/Settings/Materials";
import Amenities from "../pages/Settings/Amenities";
import Unit from "../pages/Settings/Units";
import ProjectPayment from "../pages/projects/ProjectPayment/ProjectPayment";

export const privateRoutes = [
  {
    title: "Affiliate",
    path: "/affiliate",
    component: ComposeInternalLayouts(Affiliates),
    exact: true,
  },
  {
    title: "Overview",
    path: "/dashboard",
    component: ComposeInternalLayouts(Dashboard),
    exact: true,
  },

  {
    title: "Properties",
    path: "/properties",
    component: ComposeInternalLayouts(Properties),
    exact: true,
  },
  {
    title: "Payments Details",
    path: "/payments",
    component: ComposeInternalLayouts(Payment),
    exact: true,
  },

  {
    title: "Projects",
    path: "/projects",
    component: ComposeInternalLayouts(Projects),
    exact: true,
  },
  {
    title: "Projects",
    path: "/projects/actions/:id/:name",
    component: ComposeInternalLayouts(ProjectActions),
    exact: true,
  },
  {
    title: "Projects",
    path: "/projects/actions/budget-planning",
    component: ComposeInternalLayouts(BudgetAndPlanning),
    exact: true,
  },
  {
    title: "Projects",
    path: "/projects/actions/payment-schedule",
    component: ComposeInternalLayouts(PaymentSchedule),
    exact: true,
  },
  {
    title: "Projects",
    path: "/projects/actions/documents/:id",
    component: ComposeInternalLayouts(ProjectDocuments),
    exact: true,
  },
  {
    title: "Projects",
    path: "/projects/actions/project-properties/:id",
    component: ComposeInternalLayouts(ProjectProperties),
    exact: true,
  },
  {
    title: "Projects",
    path: "/projects/actions/project-properties/details/:id",
    component: ComposeInternalLayouts(ProjectPropertiesDetails),
    exact: true,
  },
  {
    title: "Projects",
    path: "/projects/:id/actions/project-properties/details/payments/:timer/:propertyId",
    component: ComposeInternalLayouts(ProjectPayment),
    exact: true,
  },
  {
    title: "Employee",
    path: "/employee",
    component: ComposeInternalLayouts(Employee),
    exact: true,
  },
  {
    title: "Projects",
    path: "/affiliates",
    component: ComposeInternalLayouts(Affiliates),
    exact: true,
  },
  {
    title: "Projects",
    path: "/projects/project-tasks",
    component: ComposeInternalLayouts(ProjectTasks),
    exact: true,
  },
  {
    title: "Projects",
    path: "/projects/project-materials",
    component: ComposeInternalLayouts(ProjectMaterials),
    exact: true,
  },

  {
    title: "Contractors",
    path: "/contractors",
    component: ComposeInternalLayouts(Contractors),
    exact: true,
  },
  {
    title: "Contractors",
    path: "/contractors/contractors-create",
    component: ComposeInternalLayouts(CreateContractor),
    exact: true,
  },
  {
    title: "Procurements",
    path: "/procurements",
    component: ComposeInternalLayouts(Procurements),
    exact: true,
  },
  {
    title: "Logistics",
    path: "/logistics",
    component: ComposeInternalLayouts(Logistics),
    exact: true,
  },
  {
    title: "Storage",
    path: "/storage",
    component: ComposeInternalLayouts(Storage),
    exact: true,
  },
  {
    title: "Clients",
    path: "/clients",
    component: ComposeInternalLayouts(Clients),
    exact: true,
  },
  {
    title: "Overview",
    path: "/test",
    component: ComposeInternalLayouts(DashboardPage),
    exact: true,
  },

  {
    title: "Overview",
    path: "/project",
    component: ComposeInternalLayouts(ProjectCardPage),
    exact: true,
  },

  {
    title: "Overview",
    path: "/project/1",
    component: ComposeInternalLayouts(DashboardPage),
    exact: true,
  },
  {
    title: "Overview",
    path: "/project/2",
    component: ComposeInternalLayouts(Properties),
    exact: true,
  },
  {
    title: "Overview",
    path: "/project/3",
    component: ComposeInternalLayouts(DashboardPage),
    exact: true,
  },
  {
    title: "Overview",
    path: "/recent-activity",
    component: ComposeInternalLayouts(RecentActivityPage),
    exact: true,
  },
  {
    title: "Settings",
    path: "/Settings",
    component: ComposeInternalLayouts(Settings),
    exact: true,
  },
  {
    title: "Settings",
    path: "/Settings/materials",
    component: ComposeInternalLayouts(Materials),
    exact: true,
  },
  {
    title: "Settings",
    path: "/Settings/amenities",
    component: ComposeInternalLayouts(Amenities),
    exact: true,
  },
  {
    title: "Settings",
    path: "/Settings/units",
    component: ComposeInternalLayouts(Unit),
    exact: true,
  },
  
];
