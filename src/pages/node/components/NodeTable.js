import React, { useEffect, useState } from "react";

import Paper from "@mui/material/Paper";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useNavigate } from "react-router-dom";
import { NodeFirebase } from "../utils/nodeMockData";
import swal from "sweetalert";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";

import { getUserInfo } from "../../../recoil/selector";
import { useRecoilValue } from "recoil";

import StickyHeadTable from "./StickyHeader";
import "../NodeStyle.scss";

const NodeTable = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const navigate = useNavigate();

  const [nodeTableDataList, setNodeTableDataList] = useState([]);

  const nodeTableData = NodeFirebase();
  const userValue = useRecoilValue(getUserInfo);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - nodeTableDataList.length)
      : 0;

  const onClickNodeDetail = (nodeName) => {
    if (userValue.node) {
      swal("노드 세부페이지로 이동합니다");
      navigate(`/node/${nodeName}`);
    } else {
      swal("권한이 없습니다. 관리자에게 요청하십시오.", "", "error");
    }
  };

  const onClickBlockDetail = (blockNumber) => {
    alert("블록 세부페이지로 이동합니다");
    navigate(`/block/${blockNumber}`);
  };

  useEffect(() => {
    if (nodeTableData.length > 0) {
      setNodeTableDataList(nodeTableData);
    } else {
      console.log("nodeTableData length : 0");
    }
  }, [nodeTableData]);

  return (
    <Box>
      <Paper>
        <TableContainer>
          <Table className="boxLayout1">
            <Paper sx={{ width: "100%", overflow: "hidden" }}>
              <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                  <StickyHeadTable />

                  <TableBody sx={{ lineHeight: "2.5rem", fontSize: "0.9rem" }}>
                    {nodeTableDataList
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((node) => {
                        return (
                          <TableRow hover tabIndex={-1} key={node.nodeName}>
                            <TableCell
                              align="center"
                              onClick={() => onClickNodeDetail(node.nodeName)}
                            >
                              {node.serviceName}
                            </TableCell>
                            <TableCell
                              align="center"
                              onClick={() => onClickNodeDetail(node.nodeName)}
                            >
                              {node.status}
                            </TableCell>
                            <TableCell
                              align="center"
                              onClick={() => onClickNodeDetail(node.nodeName)}
                            >
                              {node.nodeName}
                            </TableCell>
                            <TableCell
                              align="center"
                              onClick={() => onClickNodeDetail(node.nodeName)}
                            >
                              {node.type}
                            </TableCell>
                            <TableCell
                              align="center"
                              onClick={() => onClickNodeDetail(node.nodeName)}
                            >
                              {node.serviceNameE}
                            </TableCell>
                            {userValue.node ? (
                              <TableCell
                                align="center"
                                onClick={() => onClickNodeDetail(node.nodeName)}
                              >
                                {node.IP}
                              </TableCell>
                            ) : (
                              <TableCell align="center">www.xxx.xxx</TableCell>
                            )}
                            <TableCell
                              align="center"
                              onClick={() =>
                                onClickBlockDetail(node.blockNumber)
                              }
                            >
                              {node.newBlockNum}
                            </TableCell>
                            <TableCell
                              align="center"
                              onClick={() =>
                                onClickBlockDetail(node.blockNumber)
                              }
                            >
                              {node.newBlockTime}
                            </TableCell>
                            {userValue.node && (
                              <TableCell align="center">{node.TPS}</TableCell>
                            )}
                            {userValue.node && (
                              <TableCell align="center">
                                {node.latency}
                              </TableCell>
                            )}
                          </TableRow>
                        );
                      })}
                    {emptyRows > 0 && (
                      <TableRow
                        style={{
                          height: 50 * emptyRows,
                        }}
                      >
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 10, 20]}
                component="div"
                count={nodeTableDataList.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default NodeTable;
