import { ACCOUNT_TYPE } from "../utils/constants";

export const sidebarLinks = [
  {
    id: 1,
    name: "My Profile",
    path: "/dashboard/my-profile",
    icon: "VscAccount", // User Profile Icon
  },
  {
    id: 2,
    name: "Add Loan Applications",
    path: "/dashboard/add-loan-application",
    type: ACCOUNT_TYPE.CUSTOMER,
    icon: "VscChecklist", // Loan Application Form Icon
  },
  {
    id: 3,
    name: "My Loan Applications",
    path: "/dashboard/my-loan-applications",
    type: ACCOUNT_TYPE.CUSTOMER,
    icon: "VscServerProcess", //loan application management icon
  },
  {
    id: 4,
    name: "Wishlist",
    path: "/dashboard/wishlist",
    type: ACCOUNT_TYPE.CUSTOMER,
    icon: "VscHeart", // Wishlist (Favorites) Icon
  },
  {
    id: 5,
    name: "Purchase History",
    path: "/dashboard/purchase-history",
    type: ACCOUNT_TYPE.CUSTOMER,
    icon: "VscHistory", // Transaction History Icon
  },
  {
    id: 6,
    name: "Loan History",
    path: "/dashboard/loan-history",
    type: ACCOUNT_TYPE.CUSTOMER,
    icon: "VscNotebook", // Same as Loan History for Loan Provider
  },
  {
    id: 7,
    name: "Add Property",
    path: "/dashboard/add-property",
    type: ACCOUNT_TYPE.BROKER,
    icon: "VscAdd", // Add New Item Icon
  },
  {
    id: 8,
    name: "My Properties",
    path: "/dashboard/my-properties",
    type: ACCOUNT_TYPE.BROKER,
    icon: "VscHome", // Real Estate Property Icon
  },
  {
    id: 9,
    name: "Sold Properties",
    path: "/dashboard/sold-properties",
    type: ACCOUNT_TYPE.BROKER,
    icon: "VscChecklist", // Sold Property List Icon
  },
  {
    id: 10,
    name: "Add Loan Offers",
    path1: "loanOffers/property/:propertyID/add-loan-offer",
    path2:"loanOffers/loanapplication/:loanApplicationID/add-loan-offer",
    type: ACCOUNT_TYPE.LOANPROVIDER,
    icon: "VscDiffAdded", // Adding Loan Offers Icon
  },
  
  {
    id: 11,
    name: "My Loan Offers",
    path: "/dashboard/my-loan-offers",
    type: ACCOUNT_TYPE.LOANPROVIDER,
    icon: "VscServerProcess", // Loan Offer Management Icon
  },
  {
    id: 12,
    name: "Loan History",
    path: "/dashboard/loan-history",
    type: ACCOUNT_TYPE.LOANPROVIDER,
    icon: "VscNotebook", // Loan History / Records Icon
  },
  
  
];

