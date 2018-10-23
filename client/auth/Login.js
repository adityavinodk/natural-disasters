import React from 'react'
import { StyleSheet, Text, TextInput, View, Button } from 'react-native'
import firebase from 'react-native-firebase'
const auth = firebase.auth();
const firestore = firebase.firestore();
const users = firestore.collection("users");

export default class Login extends React.Component {
  constructor(props){
    super(props);
    this.state = { email: '', password: '', errorMessage: null }
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin = () => {
    const { email, password } = this.state
    auth.signInWithEmailAndPassword(email, password)
      .then(() => {
        users.where("email","==",email).get().then(function(querySnapshot){
          var user_data = querySnapshot.docs[0].data()
          console.log(user_data.name);
          this.props.navigation.navigate('MainScreen')
        }).catch((err)=>{
          console.log("Error: Document not found ", err);
        })
      })
      .catch(error => this.setState({ errorMessage: error.message }))
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Login</Text>
        {this.state.errorMessage &&
          <Text style={{ color: 'red' }}>
            {this.state.errorMessage}
          </Text>}
        <TextInput
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Email"
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
          secureTextEntry
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Password"
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        <Button title="Login" onPress={this.handleLogin} />
        <Button
          title="Don't have an account? Sign Up"
          onPress={() => this.props.navigation.navigate('SignUpScreen')}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textInput: {
    height: 40,
    width: '90%',
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 8
  }
})