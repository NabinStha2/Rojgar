import React, { useEffect, useState } from "react";
import { Box, Grow, Tab, Tabs, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { makeStyles } from "@mui/styles";
import { useNavigate, useLocation } from "react-router-dom";

const PostScreen = React.lazy(() => import("./PostScreen"));
const Freelancer = React.lazy(() => import("./FreelancerList"));
const EmployerList = React.lazy(() => import("./EmployerList"));

const PaymentList = React.lazy(() => import("../components/PaymentList"));
const ProjectLists = React.lazy(() => import("../components/ProjectLists"));
const TalentLists = React.lazy(() => import("../components/TalentLists"));
const EmployerLists = React.lazy(() => import("../components/EmployerLists"));

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
}

const TabsScreen = (props) => {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const isAdmin = location.pathname.split("/")[1] === "admin";

  const handleChange = (event, newValue) => {
    setValue(newValue);
    !isAdmin
      ? newValue === 1
        ? navigate("/freelancer/page/1")
        : newValue === 2
        ? navigate("/employerList/page/1")
        : navigate("/projects/all/page/1")
      : newValue === 1
      ? navigate("/admin/talentList")
      : newValue === 2
      ? navigate("/admin/employerList")
      : newValue === 3
      ? navigate("/admin/paymentList")
      : navigate("/admin/projectList");
  };

  useEffect(() => {
    if (props.index === 1) {
      setValue(1)
    } else if (props.index === 2) {
      setValue(2);
    } else if (props.index === 3) {
      setValue(3);
    } else {
      setValue(0)
    }
  }, [props.index])

  return (
    <Grow in>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider",padding: "0px 100px", }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Project" />
            <Tab label="Freelancer" />
            <Tab label="Employer" />
            {isAdmin && <Tab label="Payment" />}
          </Tabs>
        </Box>
        {!isAdmin ? (
          <>
            <TabPanel value={value} index={0}>
              <PostScreen />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Freelancer />
            </TabPanel>
            <TabPanel value={value} index={2}>
              <EmployerList />
            </TabPanel>
          </>
        ) : (
          <>
            <TabPanel value={value} index={0}>
              <ProjectLists />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <TalentLists />
            </TabPanel>
            <TabPanel value={value} index={2}>
              <EmployerLists />
            </TabPanel>
            <TabPanel value={value} index={3}>
              <PaymentList />
            </TabPanel>
          </>
        )}
      </Box>
    </Grow>
  )
}

export default TabsScreen
