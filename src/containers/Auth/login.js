import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import "../Auth/login.scss";
import { handleLogin } from "../../services/userService";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      isShowPassword: false,
      errMessage: "",
    };
  }

  handleOnchangeUsernameInput = (event) => {
    this.setState({
      username: event.target.value,
    });
  };
  handleOnchangePasswordInput = (event) => {
    this.setState({
      password: event.target.value,
    });
  };

  // xử lí Login
  handleLogin = async () => {
    this.setState({
      errMessage: "",
    });
    try {
      let data = await handleLogin(this.state.username, this.state.password);
      if (data && data.errCode !== 0) {
        this.setState({
          errMessage: data.errMessage,
        });
      }
      if(data && data.errCode===0){
        this.props.userLoginSuccess(data.user)
        console.log('Login success');
      }
    } catch (error) {
      if (error.response) {
        if (error.response.data) {
          this.setState({
            errMessage: error.response.data.message,
          });
        }
      } else {
      }
    }
  };

  handleShowHidePassword = () => {
    this.setState({
      isShowPassword: !this.state.isShowPassword,
    });
  };
  render() {
    return (
      <div className="login-backgroung">
        <div className="login-container">
          <div className="login-content row">
            <div className="col-12 text-center text-login">Login</div>
            <div className="col-12 form-group login-input">
              <label>Username:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Your Username"
                value={this.state.username}
                onChange={(event) => this.handleOnchangeUsernameInput(event)}
              />
            </div>
            <div className="col-12 form-group login-input">
              <label>Password:</label>
              <div className="custom-password">
                <input
                  type={this.state.isShowPassword ? "text" : "password"}
                  className="form-control"
                  placeholder="Enter Your Password"
                  onChange={(event) => this.handleOnchangePasswordInput(event)}
                />
                <i
                  className={
                    this.state.isShowPassword === true
                      ? "far fa-eye"
                      : "far fa-eye-slash"
                  }
                  onClick={() => {
                    this.handleShowHidePassword();
                  }}></i>
              </div>
            </div>
            <div className="col-12 text-center" style={{ color: "red" }}>
              {this.state.errMessage}
            </div>
            <div className="col-12 login-button">
              <button
                className="btn-login"
                onClick={() => {
                  this.handleLogin();
                }}>
                Login
              </button>
            </div>
            <div className="col-12 forgot-password">
              <span className="">Forgot your password?</span>
            </div>
            <div className="col-12 text-center mt-3">
              <span className="text-other-login">Or Login with</span>
            </div>
            <div className="col-12 social-login">
              <i className="fab fa-google-plus-g google"></i>
              <i className="fab fa-facebook-f facebook"></i>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    // userLoginFail: () => dispatch(actions.adminLoginFail()),
    userLoginSuccess: (userInfo) => dispatch(actions.userloginSuccess(userInfo))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
