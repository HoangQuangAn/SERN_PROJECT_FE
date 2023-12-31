import React, { Component } from "react";
import { connect } from "react-redux";
import "./UserManager.scss";
import {
  getAllUser,
  createNewUserService,
  deleteUserService,
  editUserService,
} from "../../services/userService";
import ModalUser from "./ModalUser";
import { emitter } from "../../utils/emitter";
import ModalEditUser from "./ModalEditUser";

class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrUser: [],
      isOpenModalUser: false,
      isOpenModalEditUser: false,
      userEdit: {},
    };
  }
  state = {};

  async componentDidMount() {
    await this.getAllUserFromReact();
  }

  getAllUserFromReact = async () => {
    let res = await getAllUser("ALL");
    if (res && res.errCode === 0) {
      this.setState({
        arrUser: res.users,
      });
    }
  };

  handleAddNewUser = () => {
    this.setState({
      isOpenModalUser: true,
    });
  };

  toggle = () => {
    this.setState({
      isOpenModalUser: !this.state.isOpenModalUser,
    });
  };
  toggleEditUser = () => {
    this.setState({
      isOpenModalEditUser: !this.state.isOpenModalEditUser,
    });
  };
  createNewUser = async (data) => {
    try {
      let res = await createNewUserService(data);
      if (res.errCode === 0) {
        alert(res.message);
        await this.getAllUserFromReact();
        this.toggle();
        emitter.emit("EVENT_CLEAR_MODAL_DATA");
      }
    } catch (error) {
      console.log("🚀 ~ file: UserManage.js:45 ~ UserManage ~ error:", error);
    }
  };

  handleDeleteUser = async (user) => {
    try {
      await deleteUserService(user.id);
      await this.getAllUserFromReact();
    } catch (error) {
      console.log(
        "🚀 ~ file: UserManage.js:66 ~ UserManage ~ handleDeleteUser ~ error:",
        error
      );
    }
  };

  handleEditUser = async (user) => {
    this.setState({
      isOpenModalEditUser: true,
      userEdit: user,
    });
  };

  doEditUser = async (userForEdit) => {
    try {
      let res = await editUserService(userForEdit);
      if (res && res.errCode === 0) {
        this.setState({
          isOpenModalEditUser: false,
        });
        await this.getAllUserFromReact();
      }
    } catch (error) {
      console.log(
        "🚀 ~ file: UserManage.js:91 ~ UserManage ~ doEditUser= ~ error:",
        error
      );
    }
  };

  render() {
    let arrUser = this.state.arrUser;
    return (
      <div className="users-container">
        <ModalUser
          isOpen={this.state.isOpenModalUser}
          test={"abc"}
          toggleFromParent={this.toggle}
          createNewUser={this.createNewUser}
        />
        {this.state.isOpenModalEditUser && (
          <ModalEditUser
            isOpen={this.state.isOpenModalEditUser}
            toggleFromParent={this.toggleEditUser}
            createNewUser={this.createNewUser}
            currentUser={this.state.userEdit}
            editUser={this.doEditUser}
          />
        )}
        <div className="title text-center">Manage User With Hoang Quang An</div>
        <div className="mx-1">
          <button
            className="btn btn-primary px-4"
            onClick={() => this.handleAddNewUser()}>
            <i className="fa fa-plus"></i> Add new user
          </button>
        </div>
        <div className="users-table mt-4 mx-3">
          <table>
            <thead>
              <tr>
                <th>Email</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Address</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {arrUser &&
                arrUser.map((item, index) => {
                  return (
                    <tr key={item.id}>
                      <td>{item.email}</td>
                      <td>{item.firstName}</td>
                      <td>{item.lastName}</td>
                      <td>{item.address}</td>
                      <td>
                        <button
                          className="btn-edit"
                          onClick={() => this.handleEditUser(item)}>
                          <i className="fas fa-edit"></i>
                        </button>{" "}
                        |{" "}
                        <button
                          className="btn-trash"
                          onClick={() => this.handleDeleteUser(item)}>
                          <i className="fas fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
