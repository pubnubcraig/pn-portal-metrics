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

// react-router-dom components
import { Link, useNavigate, route } from "react-router-dom";
import { useState, useEffect } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";

// Argon Dashboard 2 PRO MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import ArgonButton from "components/ArgonButton";

// Argon Dashboard 2 PRO MUI example components
import DataTable from "examples/Tables/DataTable";

// Data
import dataTableData from "./data/dataTableData";
import appsTableData from "./data/appsTableData";
import keysTableData from "./data/keysTableData";
import { usePnAccountData } from "PnAccountProvider";

function AccountList() {
  const pnAccountContext = usePnAccountData();
  console.log('pnAccountContext', pnAccountContext);

  useEffect(() => {
  }, [pnAccountContext.portalAccounts])

  useEffect(() => {
  }, [pnAccountContext.portalApps])

  useEffect(() => {
  }, [pnAccountContext.portalKeys])

  const navigate = useNavigate();

  return (
    <>
      <ArgonBox>
        <Card>
          <ArgonBox display="flex" justifyContent="space-between" alignItems="flex-start" p={3}>
            <ArgonBox lineHeight={1}>
              <ArgonTypography variant="h5" fontWeight="medium">
                PubNub Accounts
              </ArgonTypography>
              {/* <ArgonTypography variant="button" fontWeight="regular" color="text">
                A lightweight, extendable, dependency-free javascript HTML table plugin.
              </ArgonTypography> */}
            </ArgonBox>
            <Stack spacing={1} direction="row">
              {/* <Link to="/ecommerce/products/new-product">
                <ArgonButton variant="gradient" color="info" size="small">
                  + New Product
                </ArgonButton>
              </Link>
              <ArgonButton variant="outlined" color="info" size="small">
                Import
              </ArgonButton>
              <ArgonButton variant="outlined" color="info" size="small">
                Export
              </ArgonButton> */}
            </Stack>
          </ArgonBox>
          <DataTable
            table={dataTableData(pnAccountContext.portalAccounts)}
            entriesPerPage={{
              defaultValue: 5,
              entries: [1, 5, 10, 20, 50],
            }}
            canSearch
          />
        </Card>
      </ArgonBox>

      <ArgonBox my={3}>
        <Card>
          <ArgonBox display="flex" justifyContent="space-between" alignItems="flex-start" p={3}>
            <ArgonBox lineHeight={1}>
              <ArgonTypography variant="h5" fontWeight="medium">
                Apps
              </ArgonTypography>
            </ArgonBox>
            <Stack spacing={1} direction="row">
            </Stack>
          </ArgonBox>
          <DataTable
            table={appsTableData(pnAccountContext.portalApps)}
            entriesPerPage={{
              defaultValue: 5,
              entries: [1, 5, 10, 20, 50],
            }}
            canSearch
          />
        </Card>
      </ArgonBox>
      
      <ArgonBox my={3}>
        <Card>
          <ArgonBox display="flex" justifyContent="space-between" alignItems="flex-start" p={3}>
            <ArgonBox lineHeight={1}>
              <ArgonTypography variant="h5" fontWeight="medium">
                Key Sets
              </ArgonTypography>
            </ArgonBox>
            <Stack spacing={1} direction="row">
            </Stack>
          </ArgonBox>
          <DataTable
            table={keysTableData(pnAccountContext.portalKeys)}
            entriesPerPage={{
              defaultValue: 5,
              entries: [1, 5, 10, 20, 50],
            }}
            canSearch
          />
        </Card>
      </ArgonBox>
    </>
  );
}

export default AccountList;
