import React from "react";
import { Link } from "react-router-dom";
const menuBar = () => {
  return (
    <div className="menubar">
      <span className="menubar__link">
        <Link to="/">대시보드</Link>
      </span>
      <span className="menubar__link">
        <Link to="/block">블록</Link>
      </span>
      <span className="menubar__link">
        <Link to="/trans">트랜잭션</Link>
      </span>
      <span className="menubar__link">
        <Link to="/node">노드</Link>
      </span>
      <span className="menubar__link">
        <Link to="/service">서비스</Link>
      </span>
    </div>
  );
};

export default menuBar;