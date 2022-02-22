import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends React.Component {
  state = {
    isLoading: false,
    name: '',
  }

  async componentDidMount() {
    this.setState({ isLoading: true });
    const { name } = await getUser();
    this.setState({
      isLoading: false,
      name,
    });
  }

  render() {
    const { isLoading, name } = this.state;

    return (
      <header data-testid="header-component">
        <nav>
          {
            isLoading
              ? <Loading />
              : <div data-testid="header-user-name">{name}</div>
          }
          <Link data-testid="link-to-search" to="/search">Search</Link>
          <Link data-testid="link-to-favorites" to="/favorites">Favorites</Link>
          <Link data-testid="link-to-profile" to="/profile">Profile</Link>
        </nav>
      </header>
    );
  }
}

export default Header;
