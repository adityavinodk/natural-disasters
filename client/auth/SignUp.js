import React from 'react'
import { TouchableOpacity, StyleSheet, Text, TextInput, View } from 'react-native'
import firebase from 'react-native-firebase'
const auth = firebase.auth();
const firestore = firebase.firestore();
const users = firestore.collection("users");

export default class SignUp extends React.Component {
  state = { email: '', password: '', name: '', errorMessage: null }

  handleSignUp = () => {
    const { email, password, name } = this.state
    auth.createUserWithEmailAndPassword(email, password)
      .then(user => {
        users.add({
          emergency: false,
          email: email,
          name: name,
          location: new firebase.firestore.GeoPoint(0, 0),
          role: 'user'
        }).then(function (doc) {
          console.log("User is added to DB " + doc.id);
          this.props.navigation.navigate('MainScreen');
        }).catch(function (err) {
          console.error("Error adding document: ", err);
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
          placeholder="Name"
          style={styles.textInput}
          onChangeText={name => this.setState({ name })}
          value={this.state.name}
        />
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
        <TouchableOpacity style={styles.buttonStyle1} onPress={this.handleSignUp}><Text>Sign Up</Text></TouchableOpacity>
        <TouchableOpacity style={styles.buttonStyle2} onPress={() => this.props.navigation.navigate('LoginScreen')}><Text>Already have an account? Login</Text></TouchableOpacity>
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