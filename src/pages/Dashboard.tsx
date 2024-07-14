import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import UsersVsBooks from "../components/Charts/UsersVsBooks";
import NewBooks from "../components/Charts/NewBooks";
import { API_URL } from "../constants";

const Dashboard: React.FC = () => {
  const cookie = Cookies.get("token");
  const [userList, setUserList] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${API_URL}/dashboard/stats`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${cookie}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch user details");
      }
      const data = await response.json();
      console.log(data);

      setUserList(data);
    };
    fetchData();
  }, []);
  return (
    <>
      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <UsersVsBooks
          dayWiseUsers={userList?.userCreationStats?.map((d) => {
            return d?.count;
          })}
          dayWiseBooksBorrowed={userList?.bookBorrowStats?.map((d) => {
            return d?.count;
          })}
          data={userList?.bookAdditionStats?.map((d) => {
            return d?._id;
          })}
        />
        <NewBooks
          newBooks={userList?.bookAdditionStats?.map((d) => {
            return d?.count;
          })}
          data={userList?.bookAdditionStats?.map((d) => {
            return d?._id;
          })}
        />
      </div>
    </>
  );
};

export default Dashboard;
