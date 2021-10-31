import BaseTable from "./BaseTable";

const Table = ({ children, ...props }) => {
  return <BaseTable {...props} />;
};

Table.propTypes = {};

export default Table;
