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

export default class Page4 extends Component {
    render() {
        const {navigation} = this.props;
        return (
            <View style={styles.container}>
                <Text>This is page4</Text>
                <Button
                    title="Drawer Open"
                    onPress={() => {
                        navigation.toggleDrawer()
                    }}
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
