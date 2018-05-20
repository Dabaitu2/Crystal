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
    Image, Navigator,
    Platform,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import  TabNavigator  from 'react-native-tab-navigator'

// type Props = {};
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
                <Text>Hello</Text>
                <Button title="go to profile"
                        onPress={()=>{
                            navigation.navigate('Profile', {name:"Profile"});
                        }}
                />
                <Button title="go to page2"
                        onPress={()=>{
                            navigation.navigate('Page2', {title:"Page2"});
                        }}
                />
                <Button title="go to page3"
                        onPress={()=>{
                            navigation.navigate('Page3');
                        }}
                />
                <Button title="go to TabNav"
                        onPress={()=>{
                            navigation.navigate('TabNav');
                        }}
                />
                <Button title="DrawerToggle"
                        onPress={()=>{
                            navigation.navigate('DrawerNav');
                        }}
                />
                {/*<TabNavigator>*/}
                    {/*<TabNavigator.Item*/}
                        {/*selected={this.state.selectedTab === 'home'}*/}
                        {/*selectedTitleStyle={styles.red}*/}
                        {/*title="Home"*/}
                        {/*renderIcon = {() => <Image style={styles.Icon} source={require('../res/image/ic_polular.png')} />}*/}
                        {/*renderSelectedIcon = {() => <Image style={[styles.Icon,{tintColor:"red"}]} source={require('../res/image/ic_polular.png')} />}*/}
                        {/*badgeText = "1"*/}
                        {/*onPress = {() => this.setState({selectedTab: 'home'})}>*/}
                        {/*<View style={styles.page1} />*/}
                        {/*<h1>我是HOMEPAGE</h1>*/}
                    {/*</TabNavigator.Item>*/}
                    {/*<TabNavigator.Item*/}
                        {/*selected={this.state.selectedTab === 'profile'}*/}
                        {/*selectedTitleStyle={styles.blue}*/}
                        {/*title="Profile"*/}
                        {/*renderIcon = {() => <Image style={styles.Icon} source={require('../res/image/ic_trending.png')} />}*/}
                        {/*renderSelectedIcon = {() => <Image style={[styles.Icon,{tintColor:"#5daafa"}]} source={require('../res/image/ic_trending.png')} />}*/}
                        {/*badgeText = "1"*/}
                        {/*onPress = {() => this.setState({selectedTab: 'profile'})}>*/}
                        {/*<View style={styles.page2} />*/}
                        {/*<h1>我是HOMEPAGE</h1>*/}
                    {/*</TabNavigator.Item>*/}
                {/*</TabNavigator>*/}
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
