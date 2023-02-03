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

/* eslint-disable react/prop-types */
// Argon Dashboard 2 PRO MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";

// @mui material components
import Icon from "@mui/material/Icon";
import Tooltip from "@mui/material/Tooltip";
import Checkbox from "@mui/material/Checkbox";
import { useHistory } from "react-router-dom";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

import { usePnAccountData } from "PnAccountProvider";

const keysTableData = (keys) => {
  console.log("in keysTableData", keys)
  const pnAccountContext = usePnAccountData();

  const handleChildren = (val) => {
    console.log("keysTableData handleChildren", val);
    pnAccountContext.handleSelectKey(val);
  }

  if (keys != null) {
    const rows = keys.map((row, index) => (
      {
        name: [`${row.properties.name}`, { checked: false }],
        id: row.id,
        status: row.status,
        // created: row.created,
        // modified: row.modified,
        action: <ActionCell id={row.id} handleChildren={handleChildren}/>,
      }
    ));

    const dataTable = {};
    dataTable.columns = data.columns;
    dataTable.rows = rows;

    return dataTable;
  }
  else return [];
}

const data = {
  columns: [
    {
      Header: "key name",
      accessor: "name",
      width: "40%",
      Cell: ({ value: [name, data] }) => (
        <ProductCell  name={name} checked={data.checked} />
      ),
    },
    { Header: "key id", accessor: "id" },
    { Header: "status", accessor: "status" },
    // { Header: "created", accessor: "created" },
    // { Header: "modified", accessor: "modified" },
    { Header: "action", accessor: "action" },
  ],
};
export default keysTableData;

function ProductCell({ image, name, checked }) {
  return (
    <ArgonBox display="flex" alignItems="center">
      <Checkbox defaultChecked={checked} />
      <ArgonTypography variant="button" fontWeight="medium">
        {name}
      </ArgonTypography>
    </ArgonBox>
  );
}

// Setting default value for the props of ProductCell
ProductCell.defaultProps = {
  checked: false,
};

// Typechecking props for the ProductCell
ProductCell.propTypes = {
  // image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  checked: PropTypes.bool,
};

const ActionCell = ({id, handleChildren}) => {
  console.log("Keys ActionCell id", id);

  return (
    <ArgonBox display="flex" alignItems="center">
      <ArgonTypography 
        variant="body1" 
        color="secondary" 
        sx={{ cursor: "pointer", lineHeight: 0 }}
        onClick={(e) => handleChildren(id)}
      >
        <Tooltip title="Children" placement="top">
          <Icon>list</Icon>
        </Tooltip>
      </ArgonTypography>
      <ArgonBox mx={2}>
        <ArgonTypography
          variant="body1"
          color="secondary"
          sx={{ cursor: "pointer", lineHeight: 0 }}
          // onClick={(e) => history.push("/admin/key-set")}
        >
          <Tooltip title="Costs" placement="top">
            <Icon>money</Icon>
          </Tooltip>
        </ArgonTypography>
      </ArgonBox>
    </ArgonBox>
  );
}
