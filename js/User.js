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
    StyleSheet,
    View,
} from 'react-native';
import {Button, Avatar, Card, Header, ListItem} from "react-native-elements";
import {WhiteSpace} from "antd-mobile";
import {NavigationActions} from "react-navigation";


export default class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items:[]
        }
    }

    componentWillMount() {
        this.Auth();
        this.getUserData();
    }

    Auth = () => {
        const {navigation} = this.props;
        // fetch('http://10.0.2.2:8000/alive', {
        fetch('http://119.23.231.235/api/alive', {
            method: 'GET',
            headers:{
                'Accept': 'application/json',
            },
        }).then(res => res.json())
            .then(result => {
                if(result.answer==='success') {
                   return null;
                } else {
                    const navigateAction = NavigationActions.navigate({
                        routeName: 'Login',

                        params: {},

                        action: NavigationActions.navigate({ routeName: 'Login' }),
                    });
                    navigation.dispatch(navigateAction);
                }
            }).catch(err=>{
            alert("error!:"+err);
        })

    };

    logout = () => {
        const {navigation} = this.props;
        // fetch('http://10.0.2.2:8000/logout',
            fetch('http://119.23.231.235/api/logout',
            {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                }
            })
            .then(res => res.json())
            .then(result => {
                        const navigateAction = NavigationActions.navigate({
                            routeName: 'Login',
                            params: {},
                            action: NavigationActions.navigate({ routeName: 'Login' }),
                        });
                        navigation.navigate(navigateAction);
                }
            ).catch(err => {
            alert(err);
        });
    };

    getUserData = () => {
        // fetch('http://10.0.2.2:8000/user',
        fetch('http://119.23.231.235/api/user',
            {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                }
            })
            .then(res => res.json())
            .then(result => {
                    if(result.data.length!==0) {
                        this.setState({
                            items: result.data
                        });
                    } else {
                        alert("logout!")
                    }
                }
            ).catch(err => {
            alert(err);
        });
    };

    render() {
        const len = this.state.items.userProject ?  this.state.items.userProject.length : 0;
        return (
            <View style={styles.container}>
                <Header
                    leftComponent={{ icon: 'menu', color: '#fff' }}
                    centerComponent={{ text: '个人中心', style: { color: '#fff' } }}
                    rightComponent={{ icon: 'home', color: '#fff' }}
                />
                <Card title="PERSONAL INFO">
                    <View>
                        <View style={styles.card}>
                            <Avatar
                                large
                                rounded
                                source={require('../res/image/geek.d40f9769.png')}
                                activeOpacity={0.7}
                            />
                        </View>
                    </View>
                </Card>
                <Card containerStyle={{padding: 0}}>
                    <View>
                        <View>
                            <ListItem
                                leftIcon={{name: 'account-circle', color:"#45a8ff"}}
                                title={"用户ID"}
                                rightTitle={this.state.items.userId}
                            />
                            <ListItem
                                leftIcon={{name: 'account-box', color:"#45a8ff"}}
                                title={"用户名"}
                                rightTitle={this.state.items.userName}
                            />
                            <ListItem
                                leftIcon={{name: 'account-balance', color:"#45a8ff"}}
                                title={"公钥地址"}
                                rightTitle={this.state.items.address}
                            />
                            <ListItem
                                leftIcon={{name: 'md-cash', type:'ionicon', color:"#45a8ff"}}
                                title={" 账户余额"}
                                rightTitle={this.state.items.fortune+""}
                            />
                            <ListItem
                                leftIcon={{name: 'book', color:"#45a8ff"}}
                                title={"参与项目"}
                                rightTitle={len+""}

                            />
                            <ListItem
                                leftIcon={{name: 'lightbulb-outline', color:"#45a8ff"}}
                                title={"发起项目"}
                                rightTitle={this.state.items.projectInitiate+""}
                            />

                        </View>
                    </View>
                </Card>
                    <View>
                    <WhiteSpace />
                    <WhiteSpace />
                        <View>
                            <Button
                                type={"primary"}
                                title={"LOG OUT"}
                                buttonStyle={{
                                    backgroundColor:"#fc693a"
                                }}
                                onPress={
                                    () => {
                                        this.logout()
                                    }
                                }
                            />
                        </View>
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
    h1:{
        fontSize:30
    },
    card:{
        alignItems:'center',
        justifyContent:"center"
    }
});

