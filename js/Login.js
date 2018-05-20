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
    Image, Navigator,
    Platform,
    StyleSheet,
    Text, TextInput,
    View
} from 'react-native';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import {InputItem, List, WhiteSpace, WingBlank} from "antd-mobile";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {StackActions, NavigationActions} from "react-navigation";
import {Button} from 'react-native-elements'



export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id:"",
            password:""
        }
    }


    componentWillMount() {
        this.Auth();
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
                    let resetAction = StackActions.reset({
                        index: 0,
                        actions: [
                            NavigationActions.navigate({routeName:'DrawerNav'})//要跳转到的页面名字
                        ]
                    });
                    navigation.dispatch(resetAction);
                } else {
                    return null;
                }
            }).catch(err=>{
                alert("error!:"+err);
        })

    };


    handleChange = (key, val) => {
        this.setState({
            [key]: val
        })
    };

    login = () => {
        const {navigation} = this.props;
        // fetch('http://10.0.2.2:8000/login', {
        fetch('http://119.23.231.235/api/login', {
            method: 'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                userId:this.state.id,
                userPassword: this.state.password,
            })
        }).then(res => res.json())
            .then(result => {
                if(result.answer==='success') {
                    let resetAction = StackActions.reset({
                        index: 0,
                        params:{},
                        actions: [
                            NavigationActions.navigate({routeName:'DrawerNav'})//要跳转到的页面名字
                        ]
                    });
                    navigation.dispatch(resetAction);
                } else {
                    alert("登录失败")
                }
            }
            ).catch(err => {
                alert(err);
            });
    };

    render() {
        const {navigation} = this.props;
        return (
            <View style={styles.container}>
            <KeyboardAwareScrollView >
            <View style={{alignItems:'center'}}>
                <Image
                    style={styles.logo}
                    source={require('../res/image/logo_01.png')}
                />
                <Text style={styles.h1}>登录</Text>
                <View style={{flex:1}}>
                    <WingBlank>
                        <List style={styles.inputArea}>
                            <InputItem
                                placeholder="请输入用户名"
                                onChange={v=>this.handleChange('id',v)}
                            >用户名</InputItem>
                            <InputItem
                                placeholder="请输入密码"
                                onChange={v=>this.handleChange('password',v)}
                            >密码</InputItem>
                        </List>
                        <WhiteSpace />
                    </WingBlank>
                    <Button type={"primary"}
                            title={"LOG IN"}
                            buttonStyle={{
                            backgroundColor: "#167ffc",
                            height: 45,
                            }}
                            onPress={
                                () => {
                                    this.login();
                                }
                            }
                    />
                    <WhiteSpace />
                    {/*<Button type={"primary"}*/}
                            {/*title={"LOG IN"}*/}
                            {/*buttonStyle={{*/}
                                {/*backgroundColor: "#167ffc",*/}
                                {/*height: 45,*/}
                            {/*}}*/}
                            {/*onPress={*/}
                                {/*() => {*/}
                                    {/*let resetAction = StackActions.reset({*/}
                                        {/*index: 0,*/}
                                        {/*actions: [*/}
                                            {/*NavigationActions.navigate({routeName:'DrawerNav'})//要跳转到的页面名字*/}
                                        {/*]*/}
                                    {/*});*/}
                                    {/*navigation.dispatch(resetAction);*/}
                                {/*}*/}
                            {/*}*/}
                    {/*/>*/}
                </View>
            </View>
            </KeyboardAwareScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
        alignItems:'center'
    },
    h1:{
        textAlign: "center",
        fontSize:30,
        marginTop:20,
        marginBottom:20
    },
    logo:{
        marginTop: 70,
        width: 140,
        height: 133
    },
    input:{
        // width:200
    },
    inputArea:{
        width: 350
    },
    icon:{
        width:50
        // flex: 1
    }
});
