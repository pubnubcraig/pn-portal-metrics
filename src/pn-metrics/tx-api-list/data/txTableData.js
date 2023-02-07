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

const txTableData = (txRate, data) => {
  console.log("in txTableData", txRate, data);
  const pnAccountContext = usePnAccountData();

  const sumMetric = (metric) => {
    const keys = Object.keys(pnAccountContext.usage.current[metric]);

    let sum = 0;
    keys.forEach((key, index) => {
        sum = sum + pnAccountContext.usage.current[metric][key].sum;
    });

    return sum;
  }

  if (data != null) {
    const rows = data.map((row, index) => (
      {
        key: row.metric,
        feature: row.feature,
        action: row.action,
        sum: (sumMetric(row.metric)).toLocaleString(),
        cost: (sumMetric(row.metric) * txRate).toLocaleString(
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
    { Header: "feature", accessor: "feature"},
    { Header: "action", accessor: "action"},
    { Header: "tx sum", accessor: "sum", align: "right" },
    { Header: "cost", accessor: "cost", align: "right"  },
  ],
};

export default txTableData;
