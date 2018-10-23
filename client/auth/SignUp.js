import React from 'react'
import { StyleSheet, Text, TextInput, View, Button } from 'react-native'
import firebase from 'react-native-firebase'
const auth = firebase.auth();
const firestore = firebase.firestore();
const users = firestore.collection("users");

export default class SignUp extends React.Component {
  state = { email: '', password: '', name:'', errorMessage: null }

  handleSignUp = () => {
    const { email, password, name } = this.state
    auth.createUserWithEmailAndPassword(email, password)
      .then(user => {
        users.add({
          emergency: false,
          email: email,
          name: name,
          location: new firebase.firestore.GeoPoint(0,0)
        }).then(function(doc){
          console.log("User is added to DB "+doc.id);
          this.props.navigation.navigate('MainScreen');
        }).catch(function(err){
          console.error("Error adding document: ", err);
        })
      })
      .catch(error => this.setState({ errorMessage: error.message }))
  }

  render() {
    return (
      <View style={styles.container}>
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
        <Button title="Sign Up" onPress={this.handleSignUp} />
        <Button
          title="Already have an account? Login"
          onPress={() => this.props.navigation.navigate('LoginScreen')}
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