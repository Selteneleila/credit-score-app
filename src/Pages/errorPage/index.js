import { React } from "react";
import notFound from "./../../assets/not_found.svg";
import CustomPaper from "../../components/global/customPaper";

const PageNotFound = () => {
  return (
    <CustomPaper>
      <div className="page_not-found">
        <img src={notFound} alt="" />
      </div>
    </CustomPaper>
  );
};

export default PageNotFound;
