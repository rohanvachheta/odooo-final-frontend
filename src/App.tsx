import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import Loader from "./common/Loader";
import PageTitle from "./components/PageTitle";
import SignIn from "./pages/Authentication/SignIn";
import SignUp from "./pages/Authentication/SignUp";
import Calendar from "./pages/Calendar";
import ECommerce from "./pages/Dashboard/ECommerce";
import FormElements from "./pages/Form/FormElements";
import FormLayout from "./pages/Form/FormLayout";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Tables from "./pages/Tables";
import Alerts from "./pages/UiElements/Alerts";
import Buttons from "./pages/UiElements/Buttons";
import DefaultLayout from "./layout/DefaultLayout";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import { API_URL } from "./constants";

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const cookie = Cookies.get('token');
  const [userDetails, setUserDetails] = useState<{
    name: string;
    type: string;
    email: string;
  } | null>({
    name:'',
    email:'',
    type:''
  });

  useEffect(() => {
    // Fetch user details
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(`${API_URL}/users/current`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${cookie}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user details');
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
                  <ECommerce />
                </>
              }
            />
            <Route
              path="/calendar"
              element={
                <>
                  <PageTitle title="Calendar | Library Management System" />
                  <Calendar />
                </>
              }
            />
            <Route
              path="/profile"
              element={
                <>
                  <PageTitle title="Profile | Library Management System" />
                  <Profile  userDetails={userDetails} setUserDetails={setUserDetails}/>
                </>
              }
            />
            <Route
              path="/forms/form-elements"
              element={
                <>
                  <PageTitle title="Form Elements | Library Management System" />
                  <FormElements />
                </>
              }
            />
            <Route
              path="/forms/form-layout"
              element={
                <>
                  <PageTitle title="Form Layout | Library Management System" />
                  <FormLayout />
                </>
              }
            />
            <Route
              path="/tables"
              element={
                <>
                  <PageTitle title="Tables | Library Management System" />
                  <Tables />
                </>
              }
            />
            <Route
              path="/settings"
              element={
                <>
                  <PageTitle title="Settings | Library Management System" />
                  <Settings />
                </>
              }
            />
            <Route
              path="/ui/alerts"
              element={
                <>
                  <PageTitle title="Alerts | Library Management System" />
                  <Alerts />
                </>
              }
            />
            <Route
              path="/ui/buttons"
              element={
                <>
                  <PageTitle title="Buttons | Library Management System" />
                  <Buttons />
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
