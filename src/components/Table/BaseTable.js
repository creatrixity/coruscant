import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
} from "@chakra-ui/react";
import { useMemo, useState } from "react";
import { cm2Feet, cm2Inches } from "../../utils";

const BaseTable = ({ data, schema }) => {
  const [sortByColumn, setSortByColumn] = useState();
  const [sortOrder, setSortOrder] = useState();
  const totalHeight = data.reduce((acc, curr) => acc + Number(curr.height), 0);

  const sortColumn = (column) => {
    if (sortByColumn) {
      if (sortOrder === "desc") {
        setSortOrder("asc");
      } else {
        setSortByColumn(null);
        setSortOrder();
      }
    } else {
      setSortByColumn(column);
      setSortOrder("desc");
    }
  };

  const sortByCriteria = (a, b) => {
    if (sortOrder === "desc") {
      if (isNaN(a[sortByColumn]))
        return a[sortByColumn].localeCompare(b[sortByColumn]);

      return b[sortByColumn] - a[sortByColumn];
    } else {
      if (isNaN(a[sortByColumn]))
        return b[sortByColumn].localeCompare(a[sortByColumn]);

      return a[sortByColumn] - b[sortByColumn];
    }
  };

  const tableData = sortByColumn ? [...data].sort(sortByCriteria) : data;

  return (
    <Table variant="simple">
      <TableCaption>All characters in this episode</TableCaption>
      <Thead>
        <Tr>
          {schema.map(({ name, accessor, isNumeric = false }) => (
            <Th
              key={accessor}
              isNumeric={isNumeric}
              onClick={() => sortColumn(accessor)}
              style={{ cursor: "pointer", userSelect: "none" }}
            >
              {name}
              {sortByColumn === accessor
                ? sortOrder === "asc"
                  ? " 🔽"
                  : " 🔼"
                : null}
            </Th>
          ))}
        </Tr>
      </Thead>
      <Tbody>
        {tableData.map((item) => (
          <Tr key={item.name}>
            <Td>
              <b>{item.name}</b>
            </Td>
            <Td>{item.gender}</Td>
            <Td isNumeric>{item.height} cm</Td>
          </Tr>
        ))}
        <Tr>
          <Td>Stats</Td>
          <Td>{data.length}</Td>
          <Td isNumeric>
            {totalHeight} cm ({cm2Feet(totalHeight).toFixed(2)} ft /{" "}
            {cm2Inches(totalHeight).toFixed(2)} in)
          </Td>
        </Tr>
      </Tbody>
      <Tfoot>
        <Tr>
          <Th>For nerds</Th>
          <Th>Total number</Th>
          <Th isNumeric>Total height</Th>
        </Tr>
      </Tfoot>
    </Table>
  );
};

BaseTable.propTypes = {};

export default BaseTable;
