/**
 *    Created by tomokokawase
 *    On 2018/5/8
 *    阿弥陀佛，没有bug!
 */
'use strict'
import React,{Component} from 'react';
import { TabNavigator } from "react-navigation";
import {
    AppRegistry,
    Text,
} from 'react-native';
class RecentChatsScreen extends React.Component {
    render() {
        return <Text>List of recent chats</Text>
    }
}

class AllContactsScreen extends React.Component {
    render() {
        return <Text>List of all contacts</Text>
    }
}

const MainScreenNavigator = TabNavigator({
    Recent: { screen: RecentChatsScreen },
    All: { screen: AllContactsScreen },
});
export default MainScreenNavigator;




