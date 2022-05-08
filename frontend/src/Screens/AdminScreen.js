import React from "react";
const TabsScreen = React.lazy(() => import("./TabsScreen"));

const AdminScreen = () => {
  return <TabsScreen index={0} />;
};

export default AdminScreen;
