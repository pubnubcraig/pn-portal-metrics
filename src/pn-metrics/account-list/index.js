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

  const navigate = useNavigate();

  return (
    <>
      <PnAssetTable
        title="Accounts"
        dataTable={dataTableData(pnAccountContext.portalAccounts)}
      />

      <PnAssetTable
        title="Apps"
        dataTable={appsTableData(pnAccountContext.portalApps)}
      />

      <PnAssetTable
        title="Key Sets"
        dataTable={keysTableData(pnAccountContext.portalKeys)}
      />
    </>
  );
}

export default AccountList;


const PnAssetTable = ({ title, dataTable }) => {
  return (
    <ArgonBox my={3}>
      <Card>
        <ArgonBox display="flex" justifyContent="space-between" alignItems="flex-start" p={3}>
          <ArgonTypography variant="h5" fontWeight="medium">
            {title}
          </ArgonTypography>
        </ArgonBox>
        <DataTable
          table={dataTable}
          entriesPerPage={{ defaultValue: 5, entries: [1, 5, 10, 20, 50] }}
          canSearch
        />
      </Card>
    </ArgonBox>
  );
}