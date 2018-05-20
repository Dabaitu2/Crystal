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
import {MKTextField} from "react-native-material-kit";

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: "home"
        }
    }

    render() {
        const {navigation} = this.props;
        return (
            <View style={styles.container}>
                <Text>This is profile</Text>
                <Button title="go back"
                        onPress={
                            ()=>{
                                navigation.goBack();
                            }
                        }
                />
                <Button title="Open draw"
                        onPress={
                            ()=>{
                                navigation.navigate('DrawerOpen');
                            }
                        }
                />
                <View>
                    <Text>登录界面</Text>
                    <MKTextField
                        // tintColor={MKColor.Lime}
                        // textInputStyle={{color: MKColor.Orange}}
                        placeholder="Text…"
                        // style={styles.textfield}
                    />
                </View>
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
