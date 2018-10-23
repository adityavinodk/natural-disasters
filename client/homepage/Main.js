import React from 'react'
import { StyleSheet, Button, Text, View, Linking } from 'react-native'
import firebase from 'react-native-firebase'
const auth = firebase.auth();
const firestore = firebase.firestore();
const users = firestore.collection("users");

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: auth.currentUser.email,
    }
    this.enableEmergency = this.enableEmergency.bind(this)
    this.disableEmergency = this.disableEmergency.bind(this)
    this.componentDidMount = this.componentDidMount.bind(this)
  }

  componentDidMount() {
    const { currentUser } = firebase.auth();
    this.setState({ currentUser });
    var self = this;
    users.where("email", "==", auth.currentUser.email).get().then(function (querySnapshot) {
      var user_data = querySnapshot.docs[0].data()
      self.setState({
        emergency: user_data.emergency,
        name: user_data.name
      })
      if (user_data.emergency) console.log("Emergency Enabled! ")
    }).catch((err) => {
      console.log("Error: Document not found ", err);
    })
  }

  handleLogout() {
    auth.signOut().then(function () {
      this.props.navigation.navigate('LoginScreen');
    }).catch(function (err) {
      console.log(err);
    })
  }

  enableEmergency() {
    users.where("email", "==", this.state.email).get().then(function (querySnapshot) {
      var id = querySnapshot.docs[0].id
      console.log(id + ' clicked Emergency')
      users.doc(id).set({
        emergency: true
      }, { merge: true }).then(() => {
        console.log("Emergency activated");
      }).catch((err) => {
        console.log("Error writing document: ", error);
      })
    }).catch((err) => {
      console.log("Error: Document not found ", error);
    })

    // this.forceUpdate();
  }

  disableEmergency() {
    users.where("email", "==", this.state.email).get().then(function (querySnapshot) {
      var id = querySnapshot.docs[0].id
      console.log(id + ' disabled Emergency')
      users.doc(id).set({
        emergency: false
      }, { merge: true }).then(() => {
        console.log("Emergency disabled");
      }).catch((err) => {
        console.log("Error writing document: ", error);
      })
    }).catch((err) => {
      console.log("Error: Document not found ", error);
    })

    // this.forceUpdate();

  }

  handleDial() {
    call_url = "tel:9004245501"
    Linking.openURL(call_url).catch(err => console.error('An error occurred', err));
  }
  // Linking.openURL(url).catch(err => console.error('An error occurred', err));

  render() {
    const enable_emergency = (
      <Button
        // style={styles.abc}
        title="Enable Emergency"
        onPress={this.enableEmergency}
      />
    )

    const disable_emergency = (
      <Button
        // style={styles.abc}
        title="Disable Emergency"
        onPress={this.disableEmergency}
      />
    )


    return (
      <View style={styles.container}>
        <Text style={styles.heading}>
          {this.state.name ? "Hi " + this.state.name + "!" : null}
        </Text>
        {this.state.emergency ? disable_emergency : enable_emergency}
        <Button
          title="Call Helpline"
          onPress={this.handleDial}
        />
        <Button
          title="Logout"
          onPress={this.handleLogout}
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
  heading: {
    fontSize: 25,
  }
})