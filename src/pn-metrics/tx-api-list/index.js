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
import { useEffect } from "react";

// @mui material components
import Card from "@mui/material/Card";

// Argon Dashboard 2 PRO MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import DataTable from "examples/Tables/DataTable";

// Data
import txTableData from "./data/txTableData";
import { usePnAccountData } from "PnAccountProvider";

function TxApiList({title, txRate, data}) {
  // const pnAccountContext = usePnAccountData();
  console.log('TxApiList: txApiData', title, txRate, data);

  useEffect(() => {
    // what to do here 
  }, [data])

  return (
    <>
      <ArgonBox my={3}>
        <Card>
          <ArgonBox display="flex" justifyContent="space-between" alignItems="flex-start" p={3}>
            <ArgonTypography variant="h5" fontWeight="medium">
              {title}
            </ArgonTypography>
          </ArgonBox>
          <DataTable
            table={txTableData(data, txRate)}
            entriesPerPage={{ defaultValue: 5, entries: [1, 5, 10, 20, 50] }}
            canSearch
          />
        </Card>
      </ArgonBox>
    </>
  );
}

export default TxApiList;
