import React, { useState } from "react";
import { Paper, Typography, Grid, Stack, Divider } from "@mui/material";
import { styled } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import CreditScoreReport from "../../components/scenes/creditScore/creditScoreReport";
import { setSearchId } from "../../redux/action/searchAction/setSearchId";
import { fetchClientByCIN } from "../../redux/action/clientActions/fetchClientByCIN";
import CustomInput from "../../components/global/customInput";
import CustomButton from "../../components/global/customButon";
import axios from "axios";
import { useEffect } from "react";
import { getScoreConfig } from "../../redux/action/scoreConfig/getScoreConfig";
import moment from "moment/moment";
import RadialChart from "../../components/charts/RadialChart";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";

const StyledPaper = styled(Paper)(() => {
  return {
    alignItems: "center",
    padding: "1.4rem",
    paddingTop: "2rem",
    boxShadow: "0px 3px 10px rgba(0, 0, 0, 0.2)",
    marginBottom: "1rem",
  };
});

const CreditScore = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const maxScore = 900;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [bankAccountInfo, setBankAccountInfo] = useState(null);
  const [fieldRequiredError, setFieldRequiredError] = useState(false);
  const searchedClient = useSelector(
    (state) => state.clientReducer.selectedClient
  );
  const scoreParams = useSelector((state) => state.config.scoreParams);

  const token = useSelector((state) => state.auth.token);
  const [clientScore, setClientScore] = useState({ total: 0 });

  const calculateAge = (value, maxScore) => {
    if (value >= 18 && value <= 30) {
      return (maxScore / 100) * 80;
    } else if (value >= 31 && value <= 50) {
      return (maxScore / 100) * 50;
    } else if (value >= 51 && value <= 70) {
      return (maxScore / 100) * 30;
    } else if (value > 70) {
      return maxScore;
    }
  };

  const calculateSalary = (value, maxScore) => {
    if (value >= 5000) {
      return (maxScore / 100) * 80;
    } else if (value >= 2500 && value <= 5000) {
      return (maxScore / 100) * 60;
    } else if (value >= 1200 && value <= 2500) {
      return (maxScore / 100) * 30;
    } else if (value >= 700 && value <= 1200) {
      return maxScore;
    }
  };

  const calculateAccountBalance = (value, maxScore) => {
    if (value >= 45000) {
      return (maxScore / 100) * 100;
    } else if (value >= 30000 && value <= 45000) {
      return (maxScore / 100) * 60;
    } else if (value >= 15000 && value <= 30000) {
      return (maxScore / 100) * 25;
    } else if (value >= 10000 && value <= 15000) {
      return maxScore;
    }
  };

  const calculatePaymentHistory = (value, maxScore) => {
    if (value >= 7) {
      return (maxScore / 100) * 100;
    } else if (value >= 3 && value <= 7) {
      return (maxScore / 100) * 70;
    } else if (value >= 1 && value <= 3) {
      return (maxScore / 100) * 40;
    } else if (value >= 0) {
      return maxScore;
    }
  };

  const calculatePreviousCredit = (value, maxScore) => {
    if (value >= 8) {
      return (maxScore / 100) * 100;
    } else if (value >= 3 && value <= 7) {
      return (maxScore / 100) * 60;
    } else if (value >= 1 && value <= 3) {
      return (maxScore / 100) * 40;
    } else if (value >= 0) {
      return maxScore;
    }
  };

  const calculatePenalties = (value, maxScore) => {
    if (value >= 1) {
      return (maxScore / 100) * 100;
    } else if (value >= 1 && value <= 5) {
      return (maxScore / 100) * 55;
    } else if (value >= 5 && value <= 9) {
      return (maxScore / 100) * 25;
    } else if (value >= 10) {
      return maxScore;
    }
  };

  useEffect(() => {
    let ageScore = 0;
    let salaryScore = 0;
    let accountBalanceScore = 0;
    let pyamentHistoryScore = 0;
    let previousCreditScore = 0;
    let penaltiesScore = 0;
    if (bankAccountInfo && scoreParams) {
      if (JSON.parse(scoreParams.age).selected) {
        let maxScoreAge = (maxScore / 100) * JSON.parse(scoreParams.age).value;
        ageScore = calculateAge(
          moment
            .duration(moment(new Date()).diff(moment(searchedClient.birthDate)))
            .asYears()
            .toFixed(0),
          parseInt(maxScoreAge)
        );
      }
      if (JSON.parse(scoreParams.salary).selected) {
        let maxScoreSalary =
          (maxScore / 100) * JSON.parse(scoreParams.salary).value;
        salaryScore = calculateSalary(
          parseInt(bankAccountInfo.salary),
          maxScoreSalary
        );
      }
      if (JSON.parse(scoreParams.accountBalance).selected) {
        let maxScoreAccountBalance =
          (maxScore / 100) * JSON.parse(scoreParams.accountBalance).value;
        accountBalanceScore = calculateAccountBalance(
          parseInt(bankAccountInfo.accountBalance),
          maxScoreAccountBalance
        );
      }
      if (JSON.parse(scoreParams.paymentHistory).selected) {
        let maxScorePaymentHisotry =
          (maxScore / 100) * JSON.parse(scoreParams.paymentHistory).value;
        pyamentHistoryScore = calculatePaymentHistory(
          parseInt(bankAccountInfo.paymentHistory),
          maxScorePaymentHisotry
        );
      }
      if (JSON.parse(scoreParams.previousCredit).selected) {
        let maxScorePreviousCredit =
          (maxScore / 100) * JSON.parse(scoreParams.previousCredit).value;
        previousCreditScore = calculatePreviousCredit(
          parseInt(bankAccountInfo.previousCredit),
          maxScorePreviousCredit
        );
      }
      if (JSON.parse(scoreParams.penalties).selected) {
        let maxScorePenalties =
          (maxScore / 100) * JSON.parse(scoreParams.penalties).value;
        penaltiesScore = calculatePenalties(
          parseInt(bankAccountInfo.penalties),
          maxScorePenalties
        );
      }

      setClientScore({
        total:
          ageScore +
          salaryScore +
          accountBalanceScore +
          pyamentHistoryScore +
          previousCreditScore +
          penaltiesScore,
        ageScore,
        salaryScore,
        accountBalanceScore,
        pyamentHistoryScore,
        previousCreditScore,
        penaltiesScore,
      });
    }
  }, [bankAccountInfo]);

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
    setFieldRequiredError(false);
  };

  const handleSearch = () => {
    if (!searchQuery) {
      setFieldRequiredError(true);
      return;
    }
    dispatch(setSearchId(searchQuery));
    dispatch(fetchClientByCIN(searchQuery, token))
      .then((response) => {
        if (!response) {
          toast.error("Client not found");
        } else {
          // Fetch bank account info
          axios
            .get(
              `http://localhost:8080/api/client-bank-details?cin.equals=${searchQuery}`,
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            )
            .then((bankAccountResponse) => {
              setBankAccountInfo(bankAccountResponse.data[0]);
            })
            .catch((error) => {
              console.error("Error fetching bank account info:", error);
              toast.error("Error fetching bank account info");
            });
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error("Error fetching client"); // Display toast notification for general error
      });
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleCheckSolvabilityClick = () => {
    if (!searchQuery) {
      setFieldRequiredError(true);
      return;
    }
    if (searchedClient) {
      const clientId = searchedClient.id;
      navigate(
        `/dashboard/credit-score/client-solvability?id=${clientId}&cin=${searchQuery}`,
        {
          state: {
            total: clientScore,
            ageScore: clientScore.ageScore,
            salaryScore: clientScore.salaryScore,
            accountBalanceScore: clientScore.accountBalanceScore,
            previousCreditScore: clientScore.previousCreditScore,
            penaltiesScore: clientScore.penaltiesScore,
            paymentHistoryScore: clientScore.paymentHistoryScore,
          },
        }
      );
    }
  };

  useEffect(() => {
    dispatch(getScoreConfig(token));
  }, []);

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={5}>
          <Typography variant="h2"> Credit Score </Typography>
        </Grid>
        <Grid container justifyContent="flex-end" item xs={12}>
          <Stack direction="row" spacing={2}>
            <CustomButton
              onClick={() => navigate("/dashboard/clients")}
              className="admin-form-add-btn"
            >
              Back
            </CustomButton>
            <CustomButton
              variant="contained"
              className="admin-form-add-btn"
              onClick={handleCheckSolvabilityClick}
            >
              Check Solvability
            </CustomButton>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <CustomInput
            label="Search"
            value={searchQuery}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            type="search"
            error={fieldRequiredError}
            helperText={fieldRequiredError ? "Field required" : ""}
          />
        </Grid>
        {searchedClient ? (
          <>
            {true && (
              <Grid item lg={6} md={5} xs={12}>
                <StyledPaper>
                  <Typography
                    variant="h3"
                    style={{ color: colors.blueAccent[500] }}
                  >
                    Client Score
                  </Typography>
                  <Typography variant="h5">
                    Client solvabillity increases as their credit score
                    approches 900.
                  </Typography>
                  <RadialChart
                    age={clientScore.ageScore}
                    salary={clientScore.salaryScore}
                    accountBalance={clientScore.accountBalanceScore}
                    paymentHistory={clientScore.pyamentHistoryScore}
                    previousCredit={clientScore.previousCreditScore}
                    penalties={clientScore.penaltiesScore}
                    total={clientScore.total}
                  />
                </StyledPaper>
                <div>
                  <StyledPaper>
                    <Typography
                      variant="h3"
                      style={{ color: colors.blueAccent[500] }}
                    >
                      Client Informations
                    </Typography>
                    <Grid container>
                      <Grid item xs style={{ padding: "1rem" }}>
                        <div className="user-info-content">
                          <Typography variant="h6" className="user-info-title">
                            Name:
                          </Typography>
                          {`${searchedClient?.firstName} ${searchedClient?.lastName}`}
                        </div>
                        <div className="user-info-content">
                          <Typography variant="h6" className="user-info-title">
                            CIN:
                          </Typography>
                          {searchedClient?.cin}
                        </div>
                        <Typography variant="h6" className="user-info-content">
                          <Typography variant="h6" className="user-info-title">
                            Birth Date:
                          </Typography>
                          {searchedClient?.birthDate}
                        </Typography>
                      </Grid>
                      <Divider orientation="vertical" flexItem />
                      <Grid item xs style={{ padding: "1rem" }}>
                        <div>
                          <div className="user-info-content">
                            <Typography
                              variant="h6"
                              className="user-info-title"
                            >
                              Email:
                            </Typography>
                            {searchedClient?.email}
                          </div>
                          <div className="user-info-content">
                            <Typography
                              variant="h6"
                              className="user-info-title"
                            >
                              Phone:
                            </Typography>
                            {searchedClient?.phone}
                          </div>

                          <div className="user-info-content">
                            <Typography
                              variant="h6"
                              className="user-info-title"
                            >
                              Address:
                            </Typography>
                            {`${searchedClient?.address?.street}, ${searchedClient?.address?.postalCode} ${searchedClient?.address?.city}`}
                          </div>
                        </div>
                      </Grid>
                    </Grid>
                    <></>
                    {/* <div className="show-more-btn">
                      <CustomButton
                        endIcon={
                          showMore ? <KeyboardArrowUp /> : <KeyboardArrowDown />
                        }
                        className="btn"
                        onClick={() => setShowMore(!showMore)}
                      >
                        {showMore ? "Show less" : "Show more"}
                      </CustomButton>
                    </div> */}
                  </StyledPaper>
                </div>
              </Grid>
            )}
            <Grid item lg={6} md={7} xs={12}>
              <StyledPaper>
                <Typography
                  variant="h3"
                  style={{ color: colors.blueAccent[500] }}
                >
                  Credit Score Report
                </Typography>
                <CreditScoreReport client={bankAccountInfo} />
              </StyledPaper>
            </Grid>
          </>
        ) : (
          <Grid item xs={12}>
            <StyledPaper>
              <Typography variant="h5">Client not found</Typography>
            </StyledPaper>
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default CreditScore;
