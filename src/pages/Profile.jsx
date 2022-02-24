import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';

class Profile extends React.Component {
  state = {
    name: '',
    email: '',
    image: '',
    description: '',
  };

  async componentDidMount() {
    const userProfile = await getUser();
    this.setState({ ...userProfile });
  }

  render() {
    const { name, email, image, description } = this.state;

    return (
      <>
        <Header />
        <div data-testid="page-profile">Profile</div>
        <img data-testid="profile-image" src={ image } alt={ name } />
        <p>{ name }</p>
        <p>{ email }</p>
        <p>{ description }</p>
        <Link to="/profile/edit">Editar perfil</Link>
      </>
    );
  }
}

export default Profile;
