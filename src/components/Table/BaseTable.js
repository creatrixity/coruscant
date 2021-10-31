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
import { useState } from "react";
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
      }
    } else {
      setSortByColumn(column);
      setSortOrder("desc");
    }
  };

  return (
    <Table variant="simple">
      <TableCaption>All characters in this episode</TableCaption>
      <Thead>
        <Tr>
          {schema.map(({ name, accessor }) => (
            <Th
              key={accessor}
              isNumeric={accessor === "height"}
              onClick={() => sortColumn(accessor)}
              style={{ cursor: "pointer" }}
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
        {data.map((item) => (
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
