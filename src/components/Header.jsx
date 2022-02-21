import React from 'react';
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
        {
          isLoading
            ? <Loading />
            : <div data-testid="header-user-name">{name}</div>
        }
      </header>
    );
  }
}

export default Header;
