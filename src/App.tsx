import { useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";

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
import ECommerce from "./pages/Dashboard/ECommerce";

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();
    const navigate = useNavigate();
    const cookie = Cookies.get('token');
  const [userDetails, setUserDetails] = useState<{
    name: string;
    type: string;
    email: string;
    phoneNumber:string;
    address:string;
  } | null>({
    name:'',
    email:'',
    type:'',
    phoneNumber:'',
    address:''
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
        
        setUserDetails({
          name: data.name || '',
          type: data.type || '',
          email: data.email || '',
          address:data.address || '',
          phoneNumber:data.phoneNumber ||''
        });
      } catch (err) {
      } finally {
        setLoading(false);
      }
    };

     if(cookie)fetchUserDetails();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
    if (!cookie) {
      navigate("/");
    }
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      {!cookie ? (
        <>
        <Routes>
        <Route
              index
              element={
                <>
                  <PageTitle title="eCommerce Dashboard | Library Management System" />
                  <ECommerce />
                </>
              }
            />
          <Route
            path="/auth/signin"
            element={
              <>
                <PageTitle title="Signin | Library Management System" />

                <SignIn />
              </>
            }
          />
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
      ) : (
        <DefaultLayout userDetails={userDetails}>
          <Routes>
            <Route
              index
              element={
                <>
                  <PageTitle title="eCommerce Dashboard | Library Management System" />
                 {userDetails?.type !== "User" ? <Dashboard/> :<ECommerce />}
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

     
    </>
  );
}

export default App;
