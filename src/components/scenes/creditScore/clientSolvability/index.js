import React, { useState } from "react";
import { Grid, Typography, Stack } from "@mui/material";
import CustomInput from "../../../global/customInput";
import CustomButton from "../../../global/customButon";
import { useNavigate, useLocation } from "react-router-dom";
import Invoice from "../invoice";
import "./index.css";
import { useEffect } from "react";
import ScoreGauge from "../../../charts/scoreGaugeChart";
import { useSelector } from "react-redux";

const ClientSolvability = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isInvoiceOpen, setisInvoiceOpen] = useState(false);
  const [status, setStatus] = useState("");
  const { total } = location.state;
  const [cin, setCIN] = useState("");
  const [score, setScore] = useState("");
  const token = useSelector((state) => state.auth.token);
  const searchParams = new URLSearchParams(location.search);
  const searchId = new URLSearchParams(location.search).get("id");
  const searchCIN = searchParams.get("cin");
  console.log("total:", total.total);
  const handleInvoiceClick = () => {
    const invoice = {
      id: searchId,
      cin: cin,
    };

    setisInvoiceOpen(true);
    navigate("/dashboard/credit-score/invoice", { state: [invoice] });
  };

  useEffect(() => {
    fetchUserData(searchId);
  }, [searchId]);

  const fetchUserData = (id) => {
    fetch(`http://localhost:8080/api/clients/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        setCIN(data.cin);
        setScore(data.creditScore.score);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  };

  const handleButtonClick = () => {
    if (total.total >= 698) {
      setStatus("approved");
    } else {
      setStatus("declined");
    }
  };

  return (
    <>
      {isInvoiceOpen ? (
        <Invoice />
      ) : (
        <>
          <Grid container spacing={2}>
            <Grid item xs={5}>
              <Typography variant="h2">Check client solvability</Typography>
            </Grid>
            <Grid container justifyContent="flex-end" item xs={7}>
              <Stack direction="column" spacing={2}>
                <Stack direction="row" spacing={2}>
                  <CustomButton
                    onClick={() => {
                      navigate("/dashboard/credit-score/");
                    }}
                  >
                    Cancel
                  </CustomButton>
                  <CustomButton
                    onClick={() => handleButtonClick("check")}
                    variant="contained"
                  >
                    Check
                  </CustomButton>
                </Stack>
                {status === "approved" && total.total >= 698 && (
                  <CustomButton onClick={handleInvoiceClick}>
                    Invoice
                  </CustomButton>
                )}
              </Stack>
            </Grid>
            <Grid item lg={6} style={{ padding: "2rem" }}>
              <Stack direction="column" spacing={2}>
                <CustomInput
                  name="id"
                  label="ID"
                  fullWidth
                  value={searchId}
                  disabled
                />
                <CustomInput label="CIN" value={searchCIN} disabled fullWidth />
              </Stack>
            </Grid>
            <Grid item lg={6} style={{ paddingLeft: "5rem" }}>
              <ScoreGauge score={total} />
              {status === "approved" && total.total >= 698 && (
                <span className="stamp is-approved">Approved</span>
              )}
              {(status === "declined" || total.total < 697) && (
                <span className="stamp is-declined">Declined</span>
              )}
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
};

export default ClientSolvability;
