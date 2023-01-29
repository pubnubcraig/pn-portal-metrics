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

import { useState, useEffect } from "react";

// react-router components
import { useLocation, Link } from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @mui core components
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Icon from "@mui/material/Icon";

// Argon Dashboard 2 PRO MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import ArgonInput from "components/ArgonInput";
import ArgonSelect from "components/ArgonSelect";

// Argon Dashboard 2 PRO MUI example components
import Breadcrumbs from "examples/Breadcrumbs";
import NotificationItem from "examples/Items/NotificationItem";

// Custom styles for DashboardNavbar
import {
  navbar,
  navbarContainer,
  navbarRow,
  navbarIconButton,
  navbarDesktopMenu,
  navbarMobileMenu,
} from "examples/Navbars/DashboardNavbar/styles";

// Argon Dashboard 2 PRO MUI context
import {
  useArgonController,
  setTransparentNavbar,
  setMiniSidenav,
  setOpenConfigurator,
} from "context";

// Images
// import team2 from "assets/images/team-2.jpg";
// import logoSpotify from "assets/images/small-logos/logo-spotify.svg";

import { usePnAccountData } from "PnAccountProvider";

function DashboardNavbar({ absolute, light, isMini }) {
  const [navbarType, setNavbarType] = useState();
  const [controller, dispatch] = useArgonController();
  const { miniSidenav, transparentNavbar, fixedNavbar, openConfigurator } = controller;
  const [openMenu, setOpenMenu] = useState(false);
  const route = useLocation().pathname.split("/").slice(1);
  const pnAccountContext = usePnAccountData();

  useEffect(() => {
    // Setting the navbar type
    if (fixedNavbar) {
      setNavbarType("sticky");
    } else {
      setNavbarType("static");
    }

    // A function that sets the transparent state of the navbar.
    function handleTransparentNavbar() {
      setTransparentNavbar(dispatch, (fixedNavbar && window.scrollY === 0) || !fixedNavbar);
    }

    /** 
     The event listener that's calling the handleTransparentNavbar function when 
     scrolling the window.
    */
    window.addEventListener("scroll", handleTransparentNavbar);

    // Call the handleTransparentNavbar function to set the state with the initial value.
    handleTransparentNavbar();

    // Remove event listener on cleanup
    return () => window.removeEventListener("scroll", handleTransparentNavbar);
  }, [dispatch, fixedNavbar]);

  useEffect(() => {
    updateCosts();
  }, [pnAccountContext.usage])

  const handleMiniSidenav = () => setMiniSidenav(dispatch, !miniSidenav);
  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);
  const handleOpenMenu = (event) => setOpenMenu(event.currentTarget);
  const handleCloseMenu = () => setOpenMenu(false);

  const timerAlert = () => {
    return;
  }

  const hideAlert = () => {
    return;
  }

  const handleSelectAccount = (e) => {
    console.log("handleSelectAccount: ", e);
    pnAccountContext.setPortalAccountId(e.value);

    // clear Apps list
    pnAccountContext.setPortalApps([]);
    pnAccountContext.setPortalKeys([]);
    
    fetchApps(e.value);
  };

  const fetchApps = (acctId) => {
    console.log("fetchApps");
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);
    timerAlert("Fetching your apps", "Please wait, while we fetch your apps...", 5000);

    let uri = `/apps?ownerid=${acctId}&token=${pnAccountContext.portalToken}`;
    console.log(`uri: ${uri}`);

    fetch(uri, {signal: controller.signal}).then(res => res.json()).then((result) => {
        console.log("result", result);
        pnAccountContext.setPortalApps(result.result);

        clearTimeout(timeoutId);
        hideAlert();
      },
      (error) => {
          hideAlert();
          console.log("Fetch apps error:", error);
          timerAlert("Fetch apps error", error + " (VPN enabled?)", 5000);
      }
    ).catch = (error) => {
      hideAlert();
      console.log("Fetch apps error:", error);
      timerAlert("fetch /apps", error, 5000);
    };
  }

  const handleSelectApp = (e) => {
    console.log("handleSelectApp: ", e);
    pnAccountContext.setPortalAppId(e.value);

    // clear Apps list
    pnAccountContext.setPortalKeys([]);

    fetchKeys(e.value);
  };

  const fetchKeys = (appId) => {
    console.log("fetchKeys");
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);
    timerAlert("Fetching your keys", "Please wait, while we fetch your keys...", 5000);

    let uri = `/keys?appid=${appId}&token=${pnAccountContext.portalToken}`;
    console.log(`uri: ${uri}`);

    fetch(uri, {signal: controller.signal}).then(res => res.json()).then((result) => {
        console.log("result", result);
        pnAccountContext.setPortalKeys(result);

        clearTimeout(timeoutId);
        hideAlert();
      },
      (error) => {
          hideAlert();
          console.log("Fetch keys error:", error);
          timerAlert("Fetch keys error", error + " (VPN enabled?)", 5000);
      }
    ).catch = (error) => {
      hideAlert();
      console.log("Fetch keys error:", error);
      timerAlert("fetch /keys", error, 5000);
    };
  }

  const handleSelectKey = (e) => {
    console.log("handleSelectKey: ", e);
    pnAccountContext.setPortalKeyId(e.value);
    fetchKeyUsage(e.value);
  };

  const fetchKeyUsage = (keyId) => {
    console.log("fetchKeyUsage");
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);
    timerAlert("Fetching your keys", "Please wait, while we fetch your keys...", 5000);

    let uri = `/key-usage?keyid=${keyId}&token=${pnAccountContext.portalToken}`;
    console.log(`uri: ${uri}`);

    fetch(uri, {signal: controller.signal}).then(res => res.json()).then((result) => {
        console.log("key usage results", result);
        pnAccountContext.setUsage(result);
        
        clearTimeout(timeoutId);
        hideAlert();
      },
      (error) => {
          hideAlert();
          console.log("Fetch keys error:", error);
          timerAlert("Fetch keys error", error + " (VPN enabled?)", 5000);
      }
    ).catch = (error) => {
      hideAlert();
      console.log("Fetch keys error:", error);
      timerAlert("fetch /keys", error, 5000);
    };
  }

  const updateCosts = () => {
    const usage = pnAccountContext.usage;
    const totSum = usage.replicated[Object.keys(usage.transactions_total)[0]].sum;
    const repSum = usage.replicated[Object.keys(usage.replicated)[0]].sum;
    const edgSum = usage.edge[Object.keys(usage.edge)[0]].sum;
    // const funSum = usage.edge[Object.keys(usage.functions)[0]].sum;
    const sigSum = usage.edge[Object.keys(usage.signals)[0]].sum;

    const repCost = repSum * pnAccountContext.rateRep;
    const edgCost = edgSum * pnAccountContext.rateEdg;
    // const funCost = funSum * pnAccountContext.rateFun;
    const sigCost = sigSum * pnAccountContext.rateSig;
    const totCost = repCost + edgCost + sigCost;
    // const totCost = repCost + edgCost + funCost + sigCost + totCost;

    pnAccountContext.setCostRep(repCost.toLocaleString(
      undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}));

    pnAccountContext.setCostEdg(edgCost.toLocaleString(
      undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}));  

    // pnAccountContext.setCostFun(funCost.toLocaleString(
    //   undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}));

    pnAccountContext.setCostSig(sigCost.toLocaleString(
      undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}));  

    pnAccountContext.setCostTot(totCost.toLocaleString(
      undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}));
  
  }

  // Render the notifications menu
  const renderMenu = () => (
    <Menu
      anchorEl={openMenu}
      anchorReference={null}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={Boolean(openMenu)}
      onClose={handleCloseMenu}
      sx={{ mt: 2 }}
    >
    </Menu>
  );

  return (
    <>
    <AppBar
      position={absolute ? "absolute" : navbarType}
      color="inherit"
      sx={(theme) => navbar(theme, { transparentNavbar, absolute, light })}
    >
      <Toolbar sx={(theme) => navbarContainer(theme, { navbarType })}>
        <ArgonBox
          color={light && transparentNavbar ? "white" : "dark"}
          mb={{ xs: 1, md: 0 }}
          sx={(theme) => navbarRow(theme, { isMini })}
        >
          <Breadcrumbs
            icon="home"
            title={route[route.length - 1]}
            route={route}
            light={transparentNavbar ? light : false}
          />
          <Icon fontSize="medium" sx={navbarDesktopMenu} onClick={handleMiniSidenav}>
            {miniSidenav ? "menu_open" : "menu"}
          </Icon>
        </ArgonBox>
        {isMini ? null : (
          <>
          <ArgonBox sx={(theme) => navbarRow(theme, { isMini })}>
            <ArgonBox color={light ? "white" : "inherit"}>
              <Link to="/authentication/sign-in/basic">
                <IconButton sx={navbarIconButton} size="small">
                  <Icon
                    sx={({ palette: { dark, white } }) => ({
                      color: light && transparentNavbar ? white.main : dark.main,
                    })}
                  >
                    account_circle
                  </Icon>
                  <ArgonTypography
                    variant="button"
                    fontWeight="medium"
                    color={light && transparentNavbar ? "white" : "dark"}
                  >
                    Sign in
                  </ArgonTypography>
                </IconButton>
              </Link>
              <IconButton
                size="small"
                color={light && transparentNavbar ? "white" : "dark"}
                sx={navbarMobileMenu}
                onClick={handleMiniSidenav}
              >
                <Icon>{miniSidenav ? "menu_open" : "menu"}</Icon>
              </IconButton>
              <IconButton
                size="small"
                color={light && transparentNavbar ? "white" : "dark"}
                sx={navbarIconButton}
                onClick={handleConfiguratorOpen}
              >
                <Icon>settings</Icon>
              </IconButton>
            </ArgonBox>
          </ArgonBox>
        </>
        )}
      </Toolbar>
    </AppBar>
    
    <AppBar
      position={absolute ? "absolute" : navbarType}
      color="inherit"
      sx={(theme) => navbar(theme, { transparentNavbar, absolute, light })}
    >
      <Toolbar sx={(theme) => navbarContainer(theme, { navbarType })}>
        <ArgonBox
          color={light && transparentNavbar ? "white" : "dark"}
          mb={{ xs: 1, md: 0 }}
          sx={(theme) => navbarRow(theme, { isMini })}
        >
          <AccountsDropdown
            options={pnAccountContext.portalAccounts} 
            handleSelectAccount={handleSelectAccount}
          />
          <AppsDropdown
            options={pnAccountContext.portalApps} 
            handleSelectApp={handleSelectApp}
          />
          <KeysDropdown
            options={pnAccountContext.portalKeys} 
            handleSelectKey={handleSelectKey}
          />
        </ArgonBox>
      </Toolbar>
    </AppBar>
    </>
  );
}

// Setting default values for the props of DashboardNavbar
DashboardNavbar.defaultProps = {
  absolute: false,
  light: true,
  isMini: false,
};

// Typechecking props for the DashboardNavbar
DashboardNavbar.propTypes = {
  absolute: PropTypes.bool,
  light: PropTypes.bool,
  isMini: PropTypes.bool,
};

export default DashboardNavbar;

const AccountsDropdown = ({options, handleSelectAccount}) => {
  console.log("AccountsDropdown: accounts", options);
  console.log("Array.isArray", Array.isArray(options));

  if (options == null || options.length ===0) return <><h2>No Options</h2></>;

  return (
    <>
      <ArgonSelect
        defaultValue={{ value: options[0].id, label: options[0].email }}
        options={options.map((entry) => ({ value: entry.id, label: entry.email }))}
        onChange={(e) => handleSelectAccount(e)}
        size="small"
      />
    </>
  );
}

const AppsDropdown = ({options, handleSelectApp}) => {
  console.log("AppsDropdown: apps", options);

  if (options == null || options.length ===0) return <><h2>No Options</h2></>;

  return (
    <>
      <ArgonSelect
        // defaultValue={{ value: "craig@pubnub.com", label: "craig@pubnub.com" }}
        options={options.map((entry) => ({ value: entry.id, label: entry.name }))}
        onChange={(e) => handleSelectApp(e)}
        size="small"
      />
    </>
  );
}

const KeysDropdown = ({options, handleSelectKey}) => {
  console.log("KeysDropdown: keys", options);

  if (options == null || options.length ===0) return <><h2>No Options</h2></>;

  return (
    <>
      <ArgonSelect
        // defaultValue={{ value: "craig@pubnub.com", label: "craig@pubnub.com" }}
        options={options.map((entry) => ({ value: entry.id, label: entry.properties.name + ": " + entry.subscribe_key }))}
        onChange={(e) => handleSelectKey(e)}
        size="small"
      />
    </>
  );
}