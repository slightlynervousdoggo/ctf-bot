import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Landing extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: []
    };
  }

  componentDidMount = async () => {
    const res = await axios.get(`/api/auth`);
    const { data } = res;
    this.setState({ data });
  };

  render() {
    if (!this.state.data) {
      return <p>Loading...</p>;
    }
    return (
      <Fragment>
        <h1>CTF Leaderboard</h1>
        <table>
          <tr>
            <th>Rank</th>
            <th>Username</th>
            <th>Points</th>
          </tr>
          {this.state.data.map((user, index) => (
            <tr>
              <td>{index + 1}</td>
              <td>
                <Link className='App-link' to={`/profile/${user.user.id}`}>
                  {user.user.username}
                </Link>
              </td>
              <td>{user.points}</td>
            </tr>
          ))}
        </table>
      </Fragment>
    );
  }
}

export default Landing;
