import React from "react";
import UsersVsBooks from "../components/Charts/UsersVsBooks";
import NewBooks from "../components/Charts/NewBooks";

const Dashboard: React.FC = () => {
  return (
    <>
      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <UsersVsBooks
          dayWiseUsers={[23, 11, 22, 27, 13, 22, 37]}
          dayWiseBooksBorrowed={[30, 25, 36, 30, 45, 35, 64]}
        />
        <NewBooks newBooks={[44, 55, 41, 67, 22, 43, 65]} />
      </div>
    </>
  );
};

export default Dashboard;
