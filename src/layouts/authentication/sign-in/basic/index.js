/**
=========================================================
* Argon Dashboard 2 PRO MUI - v3.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-pro-mui
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState } from "react";

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";

// Argon Dashboard 2 PRO MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import ArgonInput from "components/ArgonInput";
import ArgonButton from "components/ArgonButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";
import Separator from "layouts/authentication/components/Separator";

// Images
import github from "assets/images/logos/github.svg";
import google from "assets/images/logos/google.svg";
const bgImage =
  "https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/signin-basic.jpg";

function Basic() {
  const [rememberMe, setRememberMe] = useState(false);
  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  const [portalUsername, setPortalUsername] = useState("redacted");
  const [portalPassword, setPortalPassword] = useState("recacted");
  const [portalUserId, setPortalUserId] = useState();
  const [portalToken, setPortalToken] = useState();
  const [portalAccountId, setPortalAccountId] = useState();
  const [portalAccounts, setPortalAccounts] = useState([]);
  // const [portalApps, setPortalApps] = useState([]);
  // const [portalKeys, setPortalKeys] = useState([]);

  const timerAlert = () => {
    return;
  }

  const hideAlert = () => {
    return;
  }


  const signIn = () => {
    console.log("signIn");
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);
    timerAlert("PN Dashboard Login", "Please wait, while we authenticate...", 5000);

    let uri = `/login?username=${portalUsername}&password=${portalPassword}`;
    // let uri = `https:/localhost:5000/login?username=${portalUsername}&password=${portalPassword}`;
    console.log(`uri: ${uri}`);

    fetch(uri, { signal: controller.signal }).then(res => res.json()).then(
    // fetch(uri).then(res => res.json()).then(
        (result) => {
            console.log("result", result);

            setPortalToken(result.session.token);
            setPortalUserId(result.session.userid);
            setPortalAccountId(result.session.accountid);
            setPortalAccounts(result.accounts);

            clearTimeout(timeoutId);
            hideAlert();
        },
        (error) => {
            hideAlert();
            console.log("PN Dashboard Login error:", error);
            timerAlert("PN Dashboard Login error", error + " (VPN enabled?)", 5000);
        }
    ).catch = (error) => {
        hideAlert();
        console.log("login error:", error);
        timerAlert("fetch /login", error, 5000);
    };
}

  return (
    <BasicLayout image={bgImage}>
      <Card>
        <ArgonBox p={3} textAlign="center">
          <ArgonTypography variant="h5" fontWeight="medium" sx={{ my: 2 }}>
            Sign in
          </ArgonTypography>
          <ArgonBox display="flex" justifyContent="center">
            <ArgonButton size="small" sx={{ mr: 1 }}>
              <ArgonBox component="img" src={github} alt="github" width="23px" height="23px" />
              &nbsp; Github
            </ArgonButton>
            <ArgonButton size="small">
              <ArgonBox component="img" src={google} alt="github" width="23px" height="23px" />
              &nbsp; Google
            </ArgonButton>
          </ArgonBox>
        </ArgonBox>
        <ArgonBox px={6} pb={3} textAlign="center">
          <ArgonTypography
            display="block"
            variant="button"
            color="secondary"
            fontWeight="regular"
            sx={{ mb: 3 }}
          >
            Or sign in with credentials
          </ArgonTypography>
          <ArgonBox component="form" role="form">
            <ArgonBox mb={2}>
              <ArgonInput type="email" placeholder="Email" 
                onChange={setPortalUsername}
              />
            </ArgonBox>
            <ArgonBox mb={2}>
              <ArgonInput type="password" placeholder="Password" 
                onChange={setPortalPassword}
              />
            </ArgonBox>
            <ArgonBox display="flex" alignItems="center">
              <Switch checked={rememberMe} onChange={handleSetRememberMe} />
              <ArgonTypography
                variant="button"
                fontWeight="regular"
                onClick={handleSetRememberMe}
                sx={{ cursor: "pointer", userSelect: "none" }}
              >
                &nbsp;&nbsp;Remember me
              </ArgonTypography>
            </ArgonBox>
            <ArgonBox mt={4} mb={1}>
              <ArgonButton color="info" fullWidth
                onClick={(e) => signIn(e)}>
                Sign In
              </ArgonButton>
            </ArgonBox>
            <Separator />
            <ArgonBox mt={1} mb={3}>
              <ArgonButton
                component={Link}
                to="/authentication/sign-up/basic"
                variant="gradient"
                color="dark"
                fullWidth
              >
                Sign Up
              </ArgonButton>
            </ArgonBox>
          </ArgonBox>
        </ArgonBox>
      </Card>
    </BasicLayout>
  );
}

export default Basic;
