import { Card, Typography } from "@mui/material";
import "./index.css";

const CustomCard = ({ cardTitle, cardSubtitle, cardChart }) => {
  return (
    <Card className="cards-container" elevation={2}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h3" style={{ marginLeft: "10px" }}>
          {cardTitle}
        </Typography>

        <Typography variant="h2" style={{ marginLeft: "10px" }}>
          {cardSubtitle}
        </Typography>

        <div style={{ display: "flex", alignItems: "center" }}>{cardChart}</div>
      </div>
    </Card>
  );
};

export default CustomCard;
