import React, { Component } from "react";
import { connect } from "react-redux";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
class ModalUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      address: "",
    };
  }
  state = {};

  componentDidMount() {}

  toggle = () => {
    this.props.toggleFromParent();
  };

  handleOnChangeInput = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  checkValidateInput = () => {
    let isValid = true;
    let arrInput = ["email", "password", "firstName", "lastName", "address"];
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        isValid = false;
        alert("Missing Parameter " + arrInput[i]);
        break;
      }
    }
    return isValid;
  };
  handleAddNewUser = () => {
    let isValid = this.checkValidateInput();
    if (isValid) {
      this.props.createNewUser(this.state);
    }
  };

  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        toggle={() => this.toggle()}
        className={"modal-user-container"}
        size="lg"
        centered>
        <ModalHeader toggle={() => this.toggle()}>Create New User</ModalHeader>
        <ModalBody>
          <div className="modal-user-body">
            <div className="input-container">
              <label htmlFor="">Email</label>
              <input
                type="text"
                name="email"
                id=""
                onChange={(event) => {
                  this.handleOnChangeInput(event);
                }}
                value={this.state.email}
              />
            </div>
            <div className="input-container">
              <label htmlFor="">Password</label>
              <input
                type="text"
                name="password"
                id=""
                onChange={(event) => {
                  this.handleOnChangeInput(event);
                }}
                value={this.state.password}
              />
            </div>
          </div>
          <div className="modal-user-body">
            <div className="input-container">
              <label htmlFor="">First Name</label>
              <input
                type="text"
                name="firstName"
                id=""
                onChange={(event) => {
                  this.handleOnChangeInput(event);
                }}
                value={this.state.firstName}
              />
            </div>
            <div className="input-container">
              <label htmlFor="">Last Name</label>
              <input
                type="text"
                name="lastName"
                id=""
                onChange={(event) => {
                  this.handleOnChangeInput(event);
                }}
                value={this.state.lastName}
              />
            </div>
          </div>
          <div className="modal-user-body">
            <div className="input-container">
              <label htmlFor="">Address</label>
              <input
                type="text"
                name="address"
                id=""
                onChange={(event) => {
                  this.handleOnChangeInput(event);
                }}
                value={this.state.address}
              />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => this.handleAddNewUser()}>
            Add new
          </Button>{" "}
          <Button color="secondary" onClick={() => this.toggle()}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
