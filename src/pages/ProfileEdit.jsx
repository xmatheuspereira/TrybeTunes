import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser, updateUser } from '../services/userAPI';

class ProfileEdit extends Component {
  state = {
    name: '',
    email: '',
    image: '',
    description: '',
    isLoading: false,
    disabledButton: true,
    redirect: false,
  }

  async componentDidMount() {
    this.setState({ isLoading: true });
    const { name, email, image, description } = await getUser();
    this.setState({ name, email, image, description, isLoading: false },
      this.validateButton);
  }

  userApi = async () => {
    const {
      name,
      email,
      image,
      description,
    } = this.state;
    this.setState({ redirect: true });
    await updateUser(
      {
        name,
        email,
        image,
        description,
      },
    );
  }

  handleInputChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    }, this.validateButton);
  }

  validateButton = () => {
    const {
      name,
      email,
      image,
      description,
    } = this.state;

    if (!name || !email || !image || !description) {
      this.setState({ disabledButton: true });
    } else {
      this.setState({ disabledButton: false });
    }
  }

  render() {
    const {
      name,
      email,
      image,
      description,
      isLoading,
      disabledButton,
      redirect,
    } = this.state;

    return (
      <div data-testid="page-profile-edit">
        <Header />
        {
          redirect && <Redirect to="/profile" />
        }
        {
          isLoading ? <Loading /> : (
            <form>
              <br />
              Nome
              <br />
              <input
                name="name"
                type="text"
                data-testid="edit-input-name"
                value={ name }
                onChange={ this.handleInputChange }
              />
              <br />
              <br />
              Email
              <br />
              <input
                name="email"
                type="email"
                data-testid="edit-input-email"
                value={ email }
                onChange={ this.handleInputChange }
                placeholder="usuario@email.com"
              />
              <br />
              <br />
              Descrição
              <br />
              <textarea
                name="description"
                type="text"
                data-testid="edit-input-description"
                value={ description }
                onChange={ this.handleInputChange }
                placeholder="Sobre mim"
                style={ { resize: 'none' } }
              />
              <br />
              <br />
              <input
                name="image"
                type="text"
                data-testid="edit-input-image"
                value={ image }
                onChange={ this.handleInputChange }
                placeholder="Insira um link"
              />
              <br />
              <br />
              <button
                type="button"
                data-testid="edit-button-save"
                disabled={ disabledButton }
                onClick={ this.userApi }
              >
                Editar perfil
              </button>

            </form>
          )
        }
      </div>
    );
  }
}

export default ProfileEdit;
