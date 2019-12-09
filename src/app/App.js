import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Main from './components/Main';
import About from './components/About';
import { Switch, Route } from 'react-router-dom'

import fetchUsers from '../services/usersApi';

class App extends Component {
  state = {
    users: [],
    useListLayout: true,
    searchValue: ""  
  };

  onToggleLayoutClick = () => { 
    this.setState((prevState) => {
      localStorage.setItem("isList", !this.state.useListLayout); 
      return { useListLayout: !prevState.useListLayout };
    });
  };

  loadUsers() {
    fetchUsers()
      .then((myUsers) => {
        this.setState({
          users: myUsers,
          useListLayout: JSON.parse(localStorage.getItem("isList"))    
        })
      })
  }

  onRefreshClick = () => {
    this.loadUsers()
  }

  onSearchType = (e) => { 
    this.setState({ searchValue: e.target.value });
  }

  componentDidMount() {   
    this.loadUsers();
  }

  render() {

    const { users, useListLayout, searchValue } = this.state;
    const filteredUsers = users.filter((user) => {    
      return `${user.name}${user.surname}`.toLowerCase().includes(searchValue.toLowerCase());
    })

    return (
      <>
        <Header onSwitchClick={this.onToggleLayoutClick} useListLayout={useListLayout} refresh={this.onRefreshClick} onAboutClick={this.onAboutClick} />
        <Switch>
          <Route exact path='/' render={() => (<Main users={users} searchValue={searchValue} searchValueUsers={filteredUsers} useListLayout={useListLayout} search={this.onSearchType} />)} />
          <Route path='/about' component={About} />
        </Switch>
        <Footer />
      </>);
  }
}

export default App;
