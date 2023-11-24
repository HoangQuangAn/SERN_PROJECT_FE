import React, { Component } from "react";
import { connect } from "react-redux";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
class ModalUser extends Component {
  state = {};

  componentDidMount() {}

  toggle = () => {
    this.props.toggleFromParent();
  };

  render() {
    console.log(this.props);
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
              <input type="text" name="" id="" />
            </div>
            <div className="input-container">
              <label htmlFor="">Password</label>
              <input type="text" name="" id="" />
            </div>
          </div>
          <div className="modal-user-body">
            <div className="input-container">
              <label htmlFor="">First Name</label>
              <input type="text" name="" id="" />
            </div>
            <div className="input-container">
              <label htmlFor="">Last Name</label>
              <input type="text" name="" id="" />
            </div>
          </div>
          <div className="modal-user-body">
            <div className="input-container">
              <label htmlFor="">Address</label>
              <input type="text" name="" id="" />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => this.toggle()}>
            Do Something
          </Button>{" "}
          <Button color="secondary" onClick={() => this.toggle()}>
            Cancel
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
