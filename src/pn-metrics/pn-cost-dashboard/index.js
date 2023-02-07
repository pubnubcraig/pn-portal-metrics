/* eslint-disable no-unused-vars */
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

// @mui material components
import Grid from "@mui/material/Grid";

// Argon Dashboard 2 PRO MUI components
import ArgonBox from "components/ArgonBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DetailedStatisticsCard from "examples/Cards/StatisticsCards/DetailedStatisticsCard";
import ArgonTypography from "components/ArgonTypography";

import { usePnAccountData } from "PnAccountProvider";
import AccountList from "pn-metrics/account-list";
import ArgonSelect from "components/ArgonSelect";
import TxApiList from "pn-metrics/tx-api-list";
import metricsData from "pn-metrics/tx-api-list/data/metricsData";
import { getRepMetrics } from "pn-metrics/tx-api-list/data/metricsData";
import { getEdgMetrics } from "pn-metrics/tx-api-list/data/metricsData";
import { getSigMetrics } from "pn-metrics/tx-api-list/data/metricsData";
import { getFunMetrics } from "pn-metrics/tx-api-list/data/metricsData";
import { getMaMetrics } from "pn-metrics/tx-api-list/data/metricsData";
import { getAllMetrics } from "pn-metrics/tx-api-list/data/metricsData";

import dayjs from "dayjs";

function PnCostDashboard() {
  const pnAccountContext = usePnAccountData();

  useEffect(() => {
    // what to do here???
  }, [pnAccountContext.portalAccountId, pnAccountContext.portalAppId, pnAccountContext.portalKeyId])

  const [title, setTitle] = useState();
  const [txRate, setTxRate] = useState(0);
  const [metricsTableData, setMetricsTableData] = useState([]);

  const handleGroupByClick = (e) => {
    e.preventDefault();
    groupMetricsBy.current = e.value;
    // TODO: need to create new tiles for each feature
  }

  const handlePeriodChange = (e) => {
    // e.preventDefault();
    // set the start/end dates
    let start;
    let end;

    if (e.value == "p7") {
      start = dayjs().subtract(7, "day").format("YYYY-MM-DD");
      end = dayjs().format("YYYY-MM-DD");
    }
    else if (e.value == "p30") {
      start = dayjs().subtract(30, "day").format("YYYY-MM-DD");
      end = dayjs().format("YYYY-MM-DD");
    }
    else if (e.value == "p60") {
      start = dayjs().subtract(60, "day").format("YYYY-MM-DD");
      end = dayjs().format("YYYY-MM-DD");
    }
    else if (e.value == "p90") {
      start = dayjs().subtract(90, "day").format("YYYY-MM-DD");
      end = dayjs().format("YYYY-MM-DD");
    }
    else if (e.value == "mtd") {
      start = dayjs().date(1).format("YYYY-MM-DD");
      end = dayjs().format("YYYY-MM-DD");
    }
    else if (e.value == "pm") {
      start = dayjs().subtract(1, "month").date(1).format("YYYY-MM-DD");
      end = dayjs().subtract(1, "month").endOf('month').format("YYYY-MM-DD");
    }
    // else if (e.value == "qtd") {
    //   start = dayjs().date(1).format("YYYY-MM-DD");
    //   end = dayjs().format("YYYY-MM-DD");
    // }
    // else if (e.value == "lq") {
    //   start = dayjs().subtract(30, "day").format("YYYY-MM-DD");
    //   end = dayjs().format("YYYY-MM-DD");
    // }

    console.log("dates: ", start, end);
    pnAccountContext.startDate.current = start;
    pnAccountContext.endDate.current = end;
    pnAccountContext.fetchKeyUsage();
  }

  const handleTxTypeClick = (e, type) => {
    e.preventDefault();
    let txData = [];
    let rate = 0;
    let heading = "API Breakdown - All Tx Types";

    if (type == "rep") {
      heading = "API Breakdown - Replicated Tx Types";
      rate = pnAccountContext.rateRep;
      txData = getRepMetrics();
    }
    else if (type == "edg") {
      heading = "API Breakdown - Edge Tx Types";
      rate = pnAccountContext.rateEdg;
      txData = getEdgMetrics();
    }

    else if (type == "sig") {
      heading = "API Breakdown - Signal Tx Types";
      rate = pnAccountContext.rateSig;
      txData = getSigMetrics();
    }

    else if (type == "ma") {
      heading = "API Breakdown - Message Action Tx Types";
      rate = pnAccountContext.rateMa;
      txData = getMaMetrics();
    }

    else if (type == "fun") {
      heading = "API Breakdown - Function Tx Types";
      rate = pnAccountContext.rateFun;
      txData = getFunMetrics();
    }
    else { // "tot"
      heading = "API Breakdown - All Tx Types";
      rate = 0;
      txData = getAllMetrics();
    }

    console.log("rate", rate);
    setTitle(heading);
    setTxRate(rate);
    setMetricsTableData(txData);
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />

      <ArgonBox py={3} my={12}>
        <ArgonBox display="flex" alignItems="top" >
          <Grid container item={12}>
            
            <Grid item md={2}>
              <BreakdownType
                pnAccountContext={pnAccountContext}
                handleTxTypeClick={handleTxTypeClick}
              />
            </Grid>

            <Grid item md={10} my={3}>
              <ArgonBox mb={3} lineHeight={2} display="" >
                <ArgonTypography component="label" variant="caption" fontWeight="bold">
                  Date Range
                </ArgonTypography>
                <ArgonSelect
                  defaultValue={{ value: "p7", label: "Past 7 Days" }}
                  options={[
                    { "value": "p7",  "label": "Past 7 Days" },
                    { "value": "p30", "label": "Past 30 Days" },
                    { "value": "p60", "label": "Past 60 Days" },
                    { "value": "p90", "label": "Past 90 Days" },
                    { "value": "mtd", "label": "Month to Date" },
                    { "value": "pm",  "label": "Last Month" },
                    // { "value": "qtd", "label": "Quarter to Date" },
                    // { "value": "lq", "label": "Last Quarter" },
                  ]}
                  // defaultValue={{ value: options[0].id, label: options[0].email }}
                  // options={options.map((entry) => ({ value: entry.id, label: entry.email }))}
                  onChange={(e) => handlePeriodChange(e)}
                  size="large"
                />
              </ArgonBox>

              <TxApiList title={title} txRate={txRate} data={metricsTableData} />
            </Grid>
          </Grid>
        </ArgonBox>

        <AccountList />

      </ArgonBox>
      <Footer />
    </DashboardLayout>
  );
}

export default PnCostDashboard;

const BreakdownType = ({ pnAccountContext, handleTxTypeClick }) => {
  return (
    <>
      <ArgonBox my={3}>
        <Grid item md={12}>
          <ArgonBox lineHeight={2} display="inline-block">
            <ArgonTypography component="label" variant="caption" fontWeight="bold">
              Metrics Grouping
            </ArgonTypography>
            <ArgonSelect
              defaultValue={{ value: "tx", label: "by Tx Types" }}
              options={[{ "value": "tx", "label": "by Tx Types" }, { "value": "ft", "label": "Features" }]}
              // defaultValue={{ value: options[0].id, label: options[0].email }}
              // options={options.map((entry) => ({ value: entry.id, label: entry.email }))}
              // onChange={(e) => handleSelectAccount(e)}
              size="large"
              onClick={(e) => handleGroupByClick(e)}
            />
          </ArgonBox>
        </Grid>
      </ArgonBox>
      <ArgonBox my={3}
        onClick={(e) => handleTxTypeClick(e, "tot")}
      >
        <Grid item mr={2}>
          <DetailedStatisticsCard
            title="Total"
            count={pnAccountContext.costTot}
            icon={{ color: "info", component: <i className="ni ni-money-coins" /> }}
            percentage={{ color: "success", count: pnAccountContext.txTot, text: "" }}
          />
        </Grid>
      </ArgonBox>

      <ArgonBox my={3}
        onClick={(e) => handleTxTypeClick(e, "rep")}
      >
        <Grid item mr={2}>
          <DetailedStatisticsCard
            title="Replicated"
            count={pnAccountContext.costRep}
            icon={{ color: "error", component: <i className="ni ni-world" /> }}
            percentage={{ color: "success", count: pnAccountContext.txRep, text: "" }}
          />
        </Grid>
      </ArgonBox>

      <ArgonBox my={3}
        onClick={(e) => handleTxTypeClick(e, "edg")}
      >
        <Grid item mr={2}>
          <DetailedStatisticsCard
            title="Edge"
            count={pnAccountContext.costEdg}
            icon={{ color: "success", component: <i className="ni ni-paper-diploma" /> }}
            percentage={{ color: "success", count: pnAccountContext.txEdg, text: "" }}
          />
        </Grid>
      </ArgonBox>

      <ArgonBox my={3}
        onClick={(e) => handleTxTypeClick(e, "sig")}
      >
        <Grid item mr={2}>
          <DetailedStatisticsCard
            title="Signals"
            count={pnAccountContext.costSig}
            icon={{ color: "warning", component: <i className="ni ni-cart" /> }}
            percentage={{ color: "success", count: pnAccountContext.txSig, text: "" }}
          />
        </Grid>
      </ArgonBox>

      <ArgonBox my={3}
        onClick={(e) => handleTxTypeClick(e, "fun")}
      >
        <Grid item mr={2}>
          <DetailedStatisticsCard
            title="Functions"
            count={pnAccountContext.costFun}
            icon={{ color: "warning", component: <i className="ni ni-cart" /> }}
            percentage={{ color: "success", count: pnAccountContext.txFun, text: "" }}
          />
        </Grid>
      </ArgonBox>

      <ArgonBox my={3}
        onClick={(e) => handleTxTypeClick(e, "ma")}
      >
        <Grid item mr={2}>
          <DetailedStatisticsCard
            title="Message Action"
            count={pnAccountContext.costMa}
            icon={{ color: "warning", component: <i className="ni ni-cart" /> }}
            percentage={{ color: "success", count: pnAccountContext.txMa, text: "" }}
          />
        </Grid>
      </ArgonBox>

    </>
  );
}