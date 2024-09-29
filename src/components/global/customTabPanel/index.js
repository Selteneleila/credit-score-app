import React, { useState } from "react";
import { Tabs, Tab, Box } from "@mui/material";
function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

function CustomTabPanel(props) {
  const { tabs, initialTab, children } = props;
  const [selectedTab, setSelectedTab] = useState(initialTab);

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
      }}
    >
      <Box sx={{ width: "15rem" }}>
        <Tabs
          className="tabs-panel"
          value={selectedTab}
          onChange={handleChange}
          sx={{ borderColor: "divider" }}
          orientation="vertical"
        >
          {tabs.map((tab, index) => (
            <Tab
              key={index}
              label={tab.label}
              id={`tab-${index}`}
              aria-controls={`tabpanel-${index}`}
            />
          ))}
        </Tabs>
      </Box>

      <Box sx={{ width: "100%" }}>
        {tabs.map((tab, index) => (
          <TabPanel key={index} value={selectedTab} index={index}>
            {children[index]}
          </TabPanel>
        ))}
      </Box>
    </Box>
  );
}

export default CustomTabPanel;
