import React, {Component} from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import firebase from 'firebase';
import config from './config/config';
import loggedIn from './client/app/components/signUp/loggedIn';
import loggedOut from './client/app/components/signUp/loggedOut';
export const firebaseApp = firebase.initializeApp(config);

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
    };
  }

  componentDidMount(){
    this.authSubscription = firebase.auth().onAuthStateChanged(function(user){
      this.setState({
        loading: false,
        user_name: user.name,
      })
    })
  }
  
  render() {
    if(this.state.loading) return null;
    if(this.state.user_name) return <loggedIn name={this.state.user_name}/>;
    return <loggedOut />
  }
}
