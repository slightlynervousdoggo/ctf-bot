import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null
    };
  }

  componentDidMount = async () => {
    const res = await axios.get(
      `/api/profile/user/${this.props.match.params.id}`
    );
    const { data } = res;
    this.setState({ data });
  };

  render() {
    if (!this.state.data) {
      return <p>Loading...</p>;
    }
    return (
      <Fragment>
        <h5>
          <Link className='App-link' to='/'>
            ← Back to leaderboard
          </Link>
        </h5>
        <h1>{this.state.data.user.username}</h1>
        <h3>{this.state.data.points} Points</h3>
        <p>{this.state.data.flagsSubmitted.map(flag => `${flag.flag} ☑   `)}</p>
      </Fragment>
    );
  }
}

export default Profile;
