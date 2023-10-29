import React from "react";
import { filterNotices } from '../../organisms/noticeboard/helper';

function DropdownFilterMenu(notices) {
  return (
    <div style={{paddingRight: "30px"}}>
      <ul>
        <li onClick={() => {filterNotices(notices, "Date", 1990, 2000)}}>1990-2000</li>
        <li onClick={() => {filterNotices(notices, "Date", 2000, 2010)}}>2000-2010</li>
        <li onClick={() => {filterNotices(notices, "Date", 2010, 2020)}}>2010-2020</li>
        <li onClick={() => {filterNotices(notices, "Date", 2020, 2030)}}>2020-2030</li>
      </ul>
    </div>
  );
};

export default DropdownFilterMenu;