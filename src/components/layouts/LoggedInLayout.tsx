import { Outlet } from "react-router-dom";
import Navbar from "../Navbar";

const LoggedInLayout = () => {
  return (
    <div className="flex flex-col gap-10">
      <Navbar />
      <div className="container">
        <Outlet /> 
      </div>
    </div>
  );
};

export default LoggedInLayout;
