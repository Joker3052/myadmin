import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { FetchAllUser } from '../Services/UserService';
import ModalEditUser from './ModalEditUser';
import ModalDeleteUser from './ModalDeleteUser';
import ModalAddNew from './ModalAddNew';
import './TableUser.scss';
import _, { debounce } from 'lodash';

function TableUsers() {
  const [listUsers, setListUsers] = useState([]);
  const [IsShowModalAddNew, SetIsShowModalAddNew] = useState(false);
  const [IsShowModalEdit, SetIsShowModalEdit] = useState(false);
  const [dataUserEdit, setDataUserEdit] = useState({});
  const [IsShowModalDelete, SetIsShowModalDelete] = useState(false);
  const [dataUserDelete, setDataUserDelete] = useState({});
  const [sortBy, setSortBy] = useState("asc");
  const [sortField, setSortField] = useState("id");
  //  const [keyWord, setKeyWord] = useState(""); //chỉ dùng khi muốn có button search
  const [originalListUsers, setOriginalListUsers] = useState([]); // Thêm biến tạm thời

  const handleEditUser = (user1) => {
    // console.log(user1)
    setDataUserEdit(user1)
    SetIsShowModalEdit(true)

  }
  const handleDeleteUser = (user1) => {
    // console.log(user1)
    setDataUserDelete(user1)
    SetIsShowModalDelete(true)

  }
  const handleClose = () => {
    SetIsShowModalAddNew(false);
    SetIsShowModalEdit(false);
    SetIsShowModalDelete(false);
    getUsers();
  }
  const handleSort = (sortBy, sortField) => {
    setSortBy(sortBy);
    setSortField(sortField);
    const sortedUsers = _.orderBy(listUsers, [sortField], [sortBy]);
    setListUsers(sortedUsers);
    // console.log(sortedUsers);
  }
  const handleSearch = debounce((event) => {
    console.log(event.target.value);
    let term = event.target.value;
    if (term) {
      let searchEmail = originalListUsers.filter((item) =>
        item.email.includes(term)
      );
      setListUsers(searchEmail);
    } else {
      setListUsers(originalListUsers); // Sử dụng dữ liệu gốc khi không có từ khóa tìm kiếm
    }
  }, 1000);
  useEffect(() => {
    getUsers();
    // Đặt một khoảng thời gian để gọi lại getUsers sau mỗi 5 giây
    // const intervalId = setInterval(getUsers, 5000);

    // // Trong useEffect, chúng ta cần trả về một hàm để xử lý khi component unmount
    // return () => clearInterval(intervalId);
  }, []);

  const getUsers = async () => {
    try {
      let res = await FetchAllUser();
      if (res && res.data) {
        setListUsers(res.data);
        setOriginalListUsers(res.data); // Lưu trữ dữ liệu gốc
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };
  // console.log("check sort: ", sortBy, sortField)
  return (
    <>
      <div className='my-3 add-new'>
        <span><b>List user:</b></span>
        <button className='btn btn-success'
          onClick={() => SetIsShowModalAddNew(true)}
        >Add new user</button>
      </div>
      <div className='col-4 my-3'>
        <input className='form-control'
          placeholder='search user by email'
        //  value={keyWord}
          onChange={(event) => handleSearch(event)}
        ></input>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>
              <div className='sort-header'>
                <span>ID</span>
                <span><i className="fa-solid fa-arrow-up"
                  onClick={() => handleSort("asc", "id")}
                ></i>
                  <i className="fa-solid fa-arrow-down"
                    onClick={() => handleSort("desc", "id")}
                  ></i></span>
              </div>
            </th>
            <th>
              <span>Email</span>
              <span><i className="fa-solid fa-arrow-up"></i>
                <i className="fa-solid fa-arrow-down"></i></span>
            </th>
            <th>
              <div className='sort-header'>
                <span>Users</span>
                <span><i className="fa-solid fa-arrow-up"
                  onClick={() => handleSort("asc", "username")}
                ></i>
                  <i className="fa-solid fa-arrow-down"
                    onClick={() => handleSort("desc", "username")}
                  ></i></span>
              </div>
            </th>
            <th>Password</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {listUsers &&
            listUsers.length > 0 &&
            listUsers.map((item, index) => {
              return (
                <tr key={`users-${index}`}>
                  <td>{item.id}</td>
                  <td>{item.email}</td>
                  <td>{item.username}</td>
                  <td>{item.password}</td>
                  <td>
                    <button className='btn btn-warning mx-3'
                      onClick={() => handleEditUser(item)}
                    >edit
                    </button>
                    <button className='btn btn-danger'
                      onClick={() => handleDeleteUser(item)}
                    >delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
      <ModalAddNew
        show={IsShowModalAddNew}
        handleClose={handleClose}
      />
      <ModalEditUser
        show={IsShowModalEdit}
        dataUserEdit={dataUserEdit}
        handleClose={handleClose}
      />

      <ModalDeleteUser
        show={IsShowModalDelete}
        dataUserDelete={dataUserDelete}
        handleClose={handleClose}
      />
    </>
  );
}

export default TableUsers;
