import React from 'react'
import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native'
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
        <Text style={{
          marginBottom:15,
          alignItems: 'center',
          fontSize: 40
        }}>Natural Disasters</Text>
        <Text>Sign Up</Text>
        {this.state.errorMessage &&
          <Text style={{ color: 'red' }}>
            {this.state.errorMessage}
          </Text>}
        <TextInput
          placeholder="Email"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
          secureTextEntry
          placeholder="Password"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        <TouchableOpacity style={styles.buttonStyle1} onPress={this.handleLogin}><Text>Login</Text></TouchableOpacity>
        <TouchableOpacity style={styles.buttonStyle2} onPress={() => this.props.navigation.navigate('SignUpScreen')}><Text>Don't have an account? Sign Up</Text></TouchableOpacity>
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
    // backgroundColor: "#cd5c5c",
    color: "black",
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 8,
    paddingLeft: 13,
    borderRadius: 50,
    marginTop: 8
  },
  buttonStyle1: {
    backgroundColor: '#00FA9A',
    padding: 10,
    marginBottom: 0,
    margin: 8,
    borderRadius: 50,
  },
  buttonStyle2: {
    backgroundColor: '#48D1CC',
    padding: 10,
    margin: 8,
    borderRadius: 50,
  }
})