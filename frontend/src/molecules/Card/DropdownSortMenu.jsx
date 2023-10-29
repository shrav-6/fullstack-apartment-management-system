import React from "react";
import { sortNotices } from '../../organisms/noticeboard/helper';

function DropdownSortMenu() {
  return (
    <div style={{paddingRight: "30px"}}>
      <ul>
        <li onClick={() => {filterNotices(notices, "Date")}}>Date</li>
        <li onClick={() => {filterNotices(notices, "Importance")}}>Priority</li>
      </ul>
    </div>
  );
};

export default DropdownSortMenu;