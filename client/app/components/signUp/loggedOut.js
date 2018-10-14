import React from 'react';
import {ActivityIndicator, StyleSheet, Text, View, Component} from 'react-native';
import {Input} from '../layout/signUpForm';
import {Button} from '../layout/button'
import {fireBaseApp} from '../../../../config/config';

export class loggedOut extends Component {
    state = {
        email:'',
        password:'',
        authenticating: false
    };

    renderHomePage(name){
        return(
            <View>Hello {name}</View>
        )
    }

    renderSignUpForm(){
        return(
            <View>
                <Text style={styles.welcome}>Please Sign Up</Text>
                <Input 
                    label='Email'
                    placeholder='Enter your email'
                    onChangeText={email => this.setState({email})}
                    value = {this.state.email}
                /> 
                <Input 
                    label='Password'
                    placeholder='Enter your password'
                    secureTextEntry={true}
                    onChangeText={password => this.setState({password})}
                    value = {this.state.password}
                /> 
                <Button 
                    label='Log In'
                    onPress = {() => {this.setState({authenticating: true})}}
                />
                {this.renderCurrentState()}
            </View>
        )
    }

    renderCurrentState(){
        if(this.state.authenticating){
            var email = this.state.email;
            var password = this.state.password;
            if(email!='' && password!=''){
                firebase.auth().createUserWithEmailAndPassword(email,password).then(function(user){
                    console.log(user);
                    this.setState({authenticating:'true', email: user.email, name: user.name})
                }).catch(function(err){
                    const {code, message} = err;
                    alert(code);
                    alert(message);
                });
                return this.renderHomePage(this.state.name);
            }
        }

        return this.renderSignUpForm()
    }

    render(){
        <View style={styles.container}>
            {this.renderCurrentState()}
        </View>
    }
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: '#F5FCFF',
    },
    welcome: {
      fontSize: 30,
      textAlign: 'center',
      margin: 10,
    }
});
  
