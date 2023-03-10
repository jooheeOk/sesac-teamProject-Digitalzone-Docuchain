import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  doc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  where,
} from "firebase/firestore";
import swal from "sweetalert";
import { Button } from "@mui/material";
import { getTheme } from "../../../recoil/selector";
import { useRecoilValue } from "recoil";
const UserInfo = (props) => {
  // users 데이터 담기
  const [users, setUsers] = useState([]);
  // 데이터 불러오기
  const { userData } = props;
  const isDark = useRecoilValue(getTheme);
  useEffect(() => {
    async function getUsersRef() {
      const data = await getDocs(userData);
      console.log(data);
      setUsers(
        data.docs.map((item) => ({
          ...item.data(),
        }))
      );
    }

    getUsersRef();
  }, []);
  const { id } = useParams();

  const [userName, setUserName] = useState();
  const [userTeam, setUserTeam] = useState();
  const [userEmail, setUserEmail] = useState();
  const [userRole, setUserRole] = useState();
  //체크박스
  const [userDashboard, setUserDashboard] = useState("");
  const [userBlock, setUserBlock] = useState("");
  const [userTrans, setUserTrans] = useState("");
  const [userNode, setUserNode] = useState("");
  const [userService, setUserService] = useState("");

  // 이전 페이지 이동
  const navigate = useNavigate();
  const toUsers = () => {
    navigate(`/usermanaging`);
  };

  useEffect(() => {
    async function getUsers() {
      const data = await query(userData, where("name", "==", id));
      const querySnapshot = await getDocs(data);

      querySnapshot.forEach((item) => {
        setUserName(item.data().name);
        setUserTeam(item.data().team);
        setUserEmail(item.data().email);
        setUserDashboard(item.data().dashboard);
        setUserBlock(item.data().block);
        setUserTrans(item.data().trans);
        setUserNode(item.data().node);
        setUserService(item.data().service);
        setUserRole(item.data().role);
      });
    }
    getUsers();
  }, []);

  //삭제
  async function deleteData() {
    swal({
      text: "삭제하시겠습니까?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        deleteDoc(doc(userData, userName));
        swal("삭제되었습니다", {
          icon: "success",
        });
        navigate(`/usermanaging`);
      } else {
        swal("취소하였습니다");
      }
    });
  }

  //업데이트
  async function updateData() {
    await updateDoc(doc(userData, userName), {
      dashboard: userDashboard,
      block: userBlock,
      trans: userTrans,
      node: userNode,
      service: userService,
    });

    alert("수정완료");
    navigate(`/usermanaging`);
  }

  //submithandler
  function submitHandler(e) {
    e.preventDefault();
    updateData();
  }
  //checkbox state변경
  const changeDashboardHandler = (e) => {
    if (e.target.checked == true) {
      setUserDashboard(true);
    } else {
      setUserDashboard(false);
    }
  };
  const changeBlockHandler = (e) => {
    if (e.target.checked == true) {
      setUserBlock(true);
    } else {
      setUserBlock(false);
    }
  };
  const changeTransHandler = (e) => {
    if (e.target.checked == true) {
      setUserTrans(true);
    } else {
      setUserTrans(false);
    }
  };
  const changeNodeHandler = (e) => {
    if (e.target.checked == true) {
      setUserNode(true);
    } else {
      setUserNode(false);
    }
  };
  const changeServiceHandler = (e) => {
    if (e.target.checked == true) {
      setUserService(true);
    } else {
      setUserService(false);
    }
  };
  console.log(userTrans);

  return (
    <div
      className={isDark ? "boxLayout1 boxShadowBlack" : "boxLayout1 boxShadow"}
    >
      <div className="Myinfo">
        <h2>USER INFO</h2>
        <form onSubmit={submitHandler} style={{ marginBottom: "20px" }}>
          <label>
            <h5>이름 : {userName}</h5>
          </label>

          <label>
            <h5>소속 : {userTeam}</h5>
          </label>

          <label>
            <h5>이메일(아이디) : {userEmail}</h5>
          </label>

          <label>
            <h5 className="myinfo__detailauth">
              <input
                type="checkbox"
                checked={userDashboard}
                onChange={changeDashboardHandler}
                disabled
              />
              대시보드
              <input
                type="checkbox"
                checked={userBlock}
                onChange={changeBlockHandler}
                disabled
              />
              블록
              <input
                type="checkbox"
                checked={userTrans}
                onChange={changeTransHandler}
              />
              트랜잭션
              <input
                type="checkbox"
                checked={userNode}
                onChange={changeNodeHandler}
              />
              노드
              <input
                type="checkbox"
                checked={userService}
                onChange={changeServiceHandler}
              />
              서비스
            </h5>
          </label>

          <label>
            <h5>유형 : {userRole}</h5>
          </label>

          <Button
            style={{ marginRight: "20px" }}
            variant="outlined"
            href="#contained-buttons"
            onClick={toUsers}
          >
            취소
          </Button>
          <Button
            style={{ marginRight: "20px" }}
            variant="outlined"
            href="#contained-buttons"
            onClick={updateData}
          >
            정보 변경
          </Button>
          <Button
            variant="outlined"
            href="#contained-buttons"
            onClick={deleteData}
          >
            사용자 삭제
          </Button>
        </form>
      </div>
    </div>
  );
};

export default UserInfo;
