import React, { useEffect, useState } from "react";
import { Box, Grow, Tab, Tabs, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
import EmployerList from "./EmployerList";

const PostScreen = React.lazy(() => import("./PostScreen"));
const Freelancer = React.lazy(() => import("./FreelancerList"));

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

const TabsScreen = (props) => {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);
    newValue === 1
      ? navigate("/freelancer/page/1")
      : newValue === 2
      ? navigate("/employerList/page/1")
      : navigate("/projects/all/page/1");
  };

  useEffect(() => {
    if (props.index === 1) {
      setValue(1);
    } else if (props.index === 2) {
      setValue(2);
    } else {
      setValue(0);
    }
  }, [props.index]);

  return (
    <Grow in>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Project" />
            <Tab label="Freelancer" />
            <Tab label="Employer" />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <PostScreen />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Freelancer />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <EmployerList />
        </TabPanel>
      </Box>
    </Grow>
  );
};

export default TabsScreen;
