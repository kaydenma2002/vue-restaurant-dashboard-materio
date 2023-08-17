export default [
  {
    title: "Apps",
    icon: { icon: "mdi-package-variant" },
    children: [
      {
        title: "Email",
        icon: { icon: "mdi-email-outline" },
        to: "apps-email",
      },
      {
        title: "Chat",
        icon: { icon: "mdi-message-outline" },
        to: "apps-chat",
      },
      {
        title: "Calendar",
        to: "apps-calendar",
        icon: { icon: "mdi-calendar-blank" },
      },
      
      {
        title: "Order",
        icon: { icon: "mdi-history" },
        children: [
          { title: "List", to: "apps-order-list" },
          {
            title: "View",
            to: { name: "apps-order-view-id", params: { id: JSON.parse(localStorage.getItem("userData")).id } },
          },
          
        ],
      },
      {
        title: "Owner",
        icon: { icon: "mdi-account-outline" },
        children: [
          { title: "List", to: "apps-user-list" },
          {
            title: "View",
            to: {
              name: "apps-user-view-id",
              params: { id: JSON.parse(localStorage.getItem("userData")).id },
            },
          },
        ],
      },
      {
        title: "Restaurant",
        icon: { icon: "mdi-silverware-fork-knife" },
        children: [
          { title: "List", to: "apps-restaurant-list" },
          {
            title: "View",
            to: {
              name: "apps-restaurant-view-id",
              params: { id: JSON.parse(localStorage.getItem("userData")).id },
            },
          },
        ],
      },
      {
        title: "Claiming",
        icon: { icon: "mdi-check-all" },
        children: [
          { title: "List", to: "apps-claim-list" },
          {
            title: "View",
            to: {
              name: "apps-claim-view-id",
              params: { id: JSON.parse(localStorage.getItem("userData")).id },
            },
          },
        ],
      },
      {
        title: "Roles & Permissions",
        icon: { icon: "mdi-shield-account-outline" },
        children: [
          { title: "Roles", to: "apps-roles" },
          { title: "Permissions", to: "apps-permissions" },
        ],
      },
    ],
  },
];
