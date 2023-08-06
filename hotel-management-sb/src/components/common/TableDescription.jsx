import React from "react";
import Td from "./Td";

const TableDescription = ({ index, trData = [], children }) => (
  <tr>
    <th scope="row" className="text-capitalize px-3">
      {index + 1}
    </th>

    {trData.map((item, innerIndex) => (
      <Td key={innerIndex}>{item}</Td>
    ))}

    {children && children}
  </tr>
);

export default TableDescription;
