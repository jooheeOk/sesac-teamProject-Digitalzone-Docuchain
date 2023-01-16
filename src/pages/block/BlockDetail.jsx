import React, { useEffect, useState } from "react";
// import Stack from "@mui/material/Stack";
import BlockDetailTable from "./utils/blockDetailTable";
import BlockDetailTitle from "./utils/blockDetailItitle";

export default function BlockDetail() {
  const [data, setData] = useState([]);

  const fetchdata = async () => {
    try {
      const res = await fetch(
        "https://docuchain-a7ae3-default-rtdb.asia-southeast1.firebasedatabase.app/docu.json"
      );
      const result = await res.json();
      setData([...result]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchdata();
  }, []);
  return (
    <div>
      <BlockDetailTitle />
      <div>
        <BlockDetailTable data={data} fetchdata={fetchdata} />
      </div>
    </div>
  );
}
