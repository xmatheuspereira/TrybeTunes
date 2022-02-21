import React from 'react';
import { Redirect } from 'react-router-dom';
import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';

class Login extends React.Component {
  state = {
    name: '',
    isDisabled: true,
    isLoading: false,
    isLogged: false,
  }

  minCharValidation = ({ target: { value } }) => {
    const minChar = 3;
    this.setState({
      isDisabled: value.length < minChar,
      name: value,
    });
  };

  login = async () => {
    const { name } = this.state;

    this.setState({ isLoading: true });
    await createUser({ name });
    this.setState({ isLoading: false, isLogged: true });
  };

  render() {
    const { isDisabled, isLoading, isLogged } = this.state;

    return (
      <div data-testid="page-login">
        Login
        { isLogged && <Redirect to="/search" /> }
        { isLoading ? <Loading /> : (
          <div>
            <br />
            <input
              type="text"
              data-testid="login-name-input"
              onChange={ this.minCharValidation }
            />
            <br />
            <button
              type="submit"
              data-testid="login-submit-button"
              disabled={ isDisabled }
              onClick={ this.login }
            >
              Entrar
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default Login;
