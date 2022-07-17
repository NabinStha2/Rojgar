import React, { useEffect, useState } from "react";
import { Box, Grow, Tab, Tabs, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const PaymentList = React.lazy(() => import("../components/PaymentList"));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const AdminTabsScreen = (props) => {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);
    navigate("/admin/paymentList/page/1");
  };

  useEffect(() => {
    setValue(0);
  }, [props.index]);

  return (
    <Grow in>
      <Box sx={{ width: "100%" }}>
        <Box
          sx={{ borderBottom: 1, borderColor: "divider", padding: "0px 100px" }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Payment" />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <PaymentList />
        </TabPanel>
      </Box>
    </Grow>
  );
};

export default AdminTabsScreen;
