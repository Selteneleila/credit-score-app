import React from "react";
import UpdateProfile from "../updateProfile";
import ChangePassword from "../changePassword";
import { Typography } from "@mui/material";
import "./index.css";
import CustomTabPanel from "../../../global/customTabPanel";
function ProfileSettings() {
  const tabs = [{ label: "General Informations" }, { label: "Password" }];

  const content = [
    <div>
      <UpdateProfile />
    </div>,
    <div>
      <ChangePassword />
    </div>,
  ];

  return (
    <div>
      <Typography className="title" variant="h2">
        Profile Settings
      </Typography>
      <Typography className="subtitle" variant="h5">
        Manage and update your profile informations.
      </Typography>
      <CustomTabPanel tabs={tabs} initialTab={1}>
        {content}
      </CustomTabPanel>
    </div>
  );
}

export default ProfileSettings;
