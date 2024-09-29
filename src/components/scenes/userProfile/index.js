import { Typography, styled } from "@material-ui/core";
import userAvatar from "../../../assets/userAvatar.svg";

const UserProfile = ({ user }) => {
  const Img = styled("img")({
    display: "block",
    Width: "7.5rem",
    height: "7.5rem",
  });
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <div style={{ marginRight: "1rem" }}>
        <Img src={userAvatar} alt="user avatar" />
      </div>
      <div>
        <Typography variant="h5">{user.name}</Typography>
        <Typography variant="h5">{user.address}</Typography>
        <Typography variant="h5">{user.dateOfBirth}</Typography>
        <Typography variant="h5">{user.cin}</Typography>
        <Typography variant="h5">{user.passport}</Typography>
      </div>
    </div>
  );
};
export default UserProfile;
