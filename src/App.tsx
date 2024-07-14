import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import Loader from "./common/Loader";
import PageTitle from "./components/PageTitle";
import SignIn from "./pages/Authentication/SignIn";
import SignUp from "./pages/Authentication/SignUp";
import Profile from "./pages/Profile";
import DefaultLayout from "./layout/DefaultLayout";
import Cookies from "js-cookie";
import { API_URL } from "./constants";
import Users from "./pages/Users";
import Books from "./pages/Books";
import CreateBook from "./pages/Create-Books";
import UserBooks from "./pages/UserBooks";
import Dashboard from "./pages/Dashboard";

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();
  const cookie = Cookies.get("token");
  const [userDetails, setUserDetails] = useState<{
    name: string;
    type: string;
    email: string;
  } | null>({
    name: "",
    email: "",
    type: "",
  });

  useEffect(() => {
    // Fetch user details
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(`${API_URL}/users/current`, {
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
        // const data={
        //   name: 'John Doe',
        //   type: 'Admin',
        //   email: 'johndoe@example.com',
        // }
        setUserDetails({
          name: data.name,
          type: data.type,
          email: data.email,
        });
      } catch (err) {
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
    // if (!cookie) {
    //   navigate("/auth/signin");
    // }
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      {!cookie ? (
        <Routes>
          <Route
            path="/auth/signin"
            element={
              <>
                <PageTitle title="Signin | Library Management System" />

                <SignIn />
              </>
            }
          />
        </Routes>
      ) : (
        <DefaultLayout userDetails={userDetails}>
          <Routes>
            <Route
              index
              element={
                <>
                  <PageTitle title="eCommerce Dashboard | Library Management System" />
                  <Dashboard />
                </>
              }
            />
            <Route
              path="/books"
              element={
                <>
                  <PageTitle title="Books | Library Management System" />
                  <Books userDetails={userDetails} />
                </>
              }
            />
            <Route
              path="/profile"
              element={
                <>
                  <PageTitle title="Profile | Library Management System" />
                  <Profile
                    userDetails={userDetails}
                    setUserDetails={setUserDetails}
                  />
                </>
              }
            />
            <Route
              path="/users"
              element={
                <>
                  <PageTitle title="Users | Library Management System" />
                  <Users userDetails={userDetails} />
                </>
              }
            />

            <Route
              path="/user/:id"
              element={
                <>
                  <PageTitle title="User books | Library Management System" />
                  <UserBooks />
                </>
              }
            />

            <Route
              path="/create-book"
              element={
                <>
                  <PageTitle title="Tables | Library Management System" />
                  <CreateBook />
                </>
              }
            />
          </Routes>
        </DefaultLayout>
      )}

      <Routes>
        <Route
          path="/auth/signup"
          element={
            <>
              <PageTitle title="SignUp | Library Management System" />
              <SignUp />
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;
