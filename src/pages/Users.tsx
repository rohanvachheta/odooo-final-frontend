import Breadcrumb from "../components/Breadcrumbs/Breadcrumb";
import Cookies from "js-cookie";
import { MdDelete } from "react-icons/md";
import { useEffect, useState } from "react";
import { API_URL } from "../constants";
import { Link } from "react-router-dom";

const Users = ({ userDetails }: any) => {
  const cookie = Cookies.get("token");
  const [userList, setUserList] = useState([]);

  const getUserList = async () => {
    const response = await fetch(`${API_URL}/users`, {
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
    setUserList(data);
  };

  useEffect(() => {
    getUserList();
  }, []);

  const dleteUser = async (userId) => {
    if (!confirm("Are you sure you want to delete this user")) return;
    const response = await fetch(`${API_URL}/users/${userId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${cookie}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user details");
    } else {
      getUserList();
      alert("User deleted successfully");
    }
  };

  return (
    <>
      <Breadcrumb pageName="Users" />

      <div className="flex flex-col gap-10">
        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
            Users List
          </h4>

          <div className="flex flex-col">
            <div className="grid grid-cols-4 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-4">
              <div className="p-2.5 xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">
                  User Name
                </h5>
              </div>
              <div className="p-2.5 text-center xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">
                  Email
                </h5>
              </div>
              <div className="p-2.5 text-center xl:p-5">
                <h5 className="text-sm font-medium uppercase xsm:text-base">
                  User Type
                </h5>
              </div>

              {userDetails?.type === "Admin" && (
                <div className="p-2.5 text-center xl:p-5">
                  <h5 className="text-sm font-medium uppercase xsm:text-base">
                    Actions
                  </h5>
                </div>
              )}
            </div>

            {userList.map((user, key) => (
              <div
                className={`grid grid-cols-3 sm:grid-cols-4 ${
                  key === userList.length - 1
                    ? ""
                    : "border-b border-stroke dark:border-strokedark"
                }`}
                key={key}
              >
                <div className="flex items-center gap-3 p-2.5 xl:p-5">
                  <Link className="font-medium" to={`/user/${user._id}`}>
                    <p className="hidden text-blue-600 dark:text-white sm:block">
                      {user.name}
                    </p>
                  </Link>
                </div>

                <div className="flex items-center justify-center p-2.5 xl:p-5">
                  <p className="text-black dark:text-white">{user.email}</p>
                </div>

                <div className="flex items-center justify-center p-2.5 xl:p-5">
                  <p className="text-black dark:text-white">{user.type}</p>
                </div>

                <div className="flex items-center justify-center p-2.5 xl:p-5">
                  <div className="ml-2 mr-2 cursor-pointer">
                    {userDetails?.type === "Admin" && user.type !== "Admin" ? (
                      <MdDelete
                        onClick={() => dleteUser(user._id)}
                        color="black"
                        size={20}
                      />
                    ) : (
                      "-"
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Users;
