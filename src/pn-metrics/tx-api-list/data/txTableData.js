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

import { usePnAccountData } from "PnAccountProvider";

const txTableData = (data, txRate) => {
  console.log("in txTableData", data)
  const pnAccountContext = usePnAccountData();

  if (data != null) {
    const rows = data.map((row, index) => (
      {
        api: row.api, 
        sum: row.sum.toLocaleString(),
        cost: (row.sum * row.rate).toLocaleString(
          undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}),
      } 
    ));

    const dataTable = {};
    dataTable.columns = tableColumns.columns;
    dataTable.rows = rows;
    
    return dataTable;
  }
  else return [];
}

const tableColumns = {
  columns: [
    { Header: "api", accessor: "api"},
    { Header: "tx sum", accessor: "sum", align: "right" },
    { Header: "cost", accessor: "cost", align: "right"  },
  ],
  // rows : [{...}] // replaced actual dynamic data
};

export default txTableData;
