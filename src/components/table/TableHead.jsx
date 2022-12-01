import { useState } from "react";
import ArrowUpImage from '../../images/up_arrow.png';
import ArrowDownImage from '../../images/down_arrow.png';
import defaultArrowUpImage from '../../images/default.png';
const icons = {
  "up": ArrowUpImage,
  "down": ArrowDownImage,
  "default": defaultArrowUpImage
}
const TableHead = ({ columns, handleSorting, sortField, sortOrder }) => {

  const handleSortingChange = (accessor) => {
    const order =
      accessor === sortField && sortOrder === "asc" ? "desc" : "asc";
    handleSorting(accessor, order);
  };

  return (
    <thead>
      <tr>
        {columns.map(({ label, accessor, sortable }) => {
          const cl = sortable 
            ? sortField === accessor && sortOrder === "asc"
              ? "up"
              : sortField === accessor && sortOrder === "desc"
                ? "down"
                : "default"
            : "";
          return (
            <th
              key={accessor}
              onClick={sortable ? () => handleSortingChange(accessor) : null}
              className={`${cl} border-bottom`}
            >
              {label}
              <span><img src={icons[cl]}></img></span>
            </th>
          );
        })}
      </tr>
    </thead >
  );
};

export default TableHead;