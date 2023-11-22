import React, { Component } from "react";
import { connect } from "react-redux";
import "./UserManager.scss";
import { getAllUser } from "../../services/userService";
class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrUser: [],
    };
  }
  state = {};

  async componentDidMount() {
    let res = await getAllUser("ALL");
    if (res && res.errCode === 0) {
      this.setState({
        arrUser: res.users,
      });
    }
  }

  handleAddNewUser = () => {
    alert("click me");
  };
  render() {
    let arrUser = this.state.arrUser;
    return (
      <div className="users-container">
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
                        <button className="btn-edit">
                          <i className="fas fa-edit"></i>
                        </button>{" "}
                        |{" "}
                        <button className="btn-trash">
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
