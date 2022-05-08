import React from "react";
const AdminTabsScreen = React.lazy(() => import("./AdminTabsScreen"));

const AdminScreen = () => {
  return <AdminTabsScreen index={0} />;
};

export default AdminScreen;
