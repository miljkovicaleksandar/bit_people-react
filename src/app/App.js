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
    searchValue: ""  //mora biti ova vrednost u state-u kako bi je kasnije izmenili prilikom unosa vrednosti u input
  };

  onToggleLayoutClick = () => { //mora biti anonimna func kad novi state zavisi od prethodnog stanja state-a // kad se prosledi arrow func njen this je referenca na okruzenje gde je kreirana, a kad je obicna func njen this se vezuje na onaj nod nad kojim je pozvana
    this.state.searchValue = "";
    this.setState((prevState) => {
      localStorage.setItem("isList", !this.state.useListLayout); // <= pitati da li je ovo ispravno fitur za local storage
      return { useListLayout: !prevState.useListLayout };
    });
  };

  loadUsers() {
    fetchUsers()
      .then((myUsers) => {
        this.setState({
          users: myUsers,
          useListLayout: JSON.parse(localStorage.getItem("isList"))     //mora parse ici zato sto je vrednost uneta u stringu(false,true)
        })
      })
  }

  onRefreshClick = () => {  //ovde mora biti arrow func, refreshuje usere
    this.loadUsers()
  }

  onSearchType = (e) => { //event argument koji se kreira prilikom unosenja vrednosi u search, func se pokrece na promenu vrednosti  u searchu
    this.setState({ searchValue: e.target.value });
  }

  componentDidMount() {   //funkcija koja se aktivira tik pred renderovanje stranice
    this.loadUsers();
  }

  render() {

    const { users, useListLayout, searchValue } = this.state;
    const filteredUsers = users.filter((user) => {      //odradi mapiranje usera ponovo nakon novog unosa inputa 
      return `${user.name}${user.surname}`.toLowerCase().includes(searchValue.toLowerCase());
    })
    // ako koristim render to iskljucuje component props !!! gledaj route componente
    return (
      <>
        <Header onSwitchClick={this.onToggleLayoutClick} useListLayout={useListLayout} refresh={this.onRefreshClick} onAboutClick={this.onAboutClick} />
        <Switch>
          <Route exact path='/' render={() => (<Main users={users} searchValue={searchValue} searchValueUsers={filteredUsers} useListLayout={useListLayout} search={this.onSearchType} />)} />
          <Route path='/about' component={About} />
        </Switch>
        <Footer />
      </>);
    //render ima return Main kao celu komponentu koju renderuje sa svim propsima
  }
}

export default App;
