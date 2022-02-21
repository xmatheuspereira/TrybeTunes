import React from 'react';

class Login extends React.Component {
  state = {
    isDisabled: true,
  }

  minCharValidation = ({ target: { value } }) => {
    const minChar = 3;
    this.setState({
      isDisabled: value.length < minChar,
    });
  };

  render() {
    const { isDisabled } = this.state;

    return (
      <div data-testid="page-login">
        Login
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
        >
          Entrar
        </button>
      </div>
    );
  }
}

export default Login;
