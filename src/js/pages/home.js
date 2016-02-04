import React from 'react';

const styles = {
  height: '100%'
};

class Homepage extends React.Component {
  render(){
    return (
      <div style={styles}>
        <h1 className='welcome-header'>Welcome to i see u!</h1>
      </div>
    )
  }
}

export default Homepage;