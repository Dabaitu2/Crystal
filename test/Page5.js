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
    Text,
    View,
} from 'react-native';
import * as MKButton from "react-native-material-kit/lib/mdl/Button";
const ColoredRaisedButton = MKButton.coloredButton()
    .withText('BUTTON')
    .withOnPress(() => {
        alert("Hi, it's a colored button!");
    })
    .build();




export default class Page5 extends Component {
    render() {
        const {navigation} = this.props;
        return (
            <View style={styles.container}>
                <Text>This is page5</Text>
                <ColoredRaisedButton />
                <Button title="Open draw"
                        onPress={
                            ()=>{navigation.navigate('Page4');}
                        }
                />
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
    }
});
