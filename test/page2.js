/**
 *    Created by tomokokawase
 *    On 2018/5/6
 *    阿弥陀佛，没有bug!
 */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    Button,
    StyleSheet,
    Text, TextInput,
    View,
} from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Content: ""
        }
    }

    render() {
        const {navigation} = this.props;
        const {state, setParams} = navigation;
        return (
            <View style={styles.container}>
                <Ionicons name="ios-home" />
                <Text>This is page2</Text>
                <Button title="go back"
                        onPress={
                            ()=>{
                                navigation.goBack();
                            }
                        }
                />
                <TextInput
                    style={styles.input}
                    onChangeText = {
                        text => {
                            setParams({
                                title: text
                            });
                        }
                    }
                />
                <Text>{this.state.Content}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    page1: {
        flex: 1,
        backgroundColor:'red',
    },
    page2: {
        flex: 1,
        backgroundColor:'blue',
    },
    Icon: {
        height: 22,
        width: 22
    },
    red:{
        color: 'red'
    },
    blue: {
        color: '#5daafa'
    },
    input: {
        height:50,
        width:200
    }
});
