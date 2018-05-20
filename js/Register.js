/**
 *    Created by tomokokawase
 *    On 2018/5/8
 *    阿弥陀佛，没有bug!
 */

import React, {Component} from 'react';
import {
    Image, KeyboardAvoidingView, Navigator,
    Platform, ScrollView, Alert,
    StyleSheet,
    Text,
    View,
    Clipboard
} from 'react-native';
import {InputItem, List, WhiteSpace, WingBlank, Button, Tabs} from "antd-mobile";
import SegmentedControl from "antd-mobile/es/segmented-control/index";
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'


export default class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            password: "",
            address: "",
            code: "",
            type: 0,
            userName: "Sample user",
            content: "this is sample content",
            content2: "this is sample content2",
            storage: "",
            privateKey: "",
            PublicAddress: ""
        }

    }

    register = () => {
        fetch('http://119.23.231.235/api/signup', {
        // fetch('http://10.0.2.2:8000/signup', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: this.state.id,
                userPassword: this.state.password,
                userType: this.state.type,
                userName: this.state.userName,
                verifyNum: this.state.code,
                verifyAddress: this.state.address
            })
        }).then(res => res.json())
            .then(result => {
                    if (result.answer === 'success') {
                        this.setState({
                            privateKey: result.privateKey,
                            PublicAddress: result.address
                        });
                        this.save("privateKey", this.state.id, result.privateKey);
                        this.save("address", this.state.id, result.address);
                        Alert.alert(
                            '注册成功，您的公钥地址和私钥账号如下,并已为您保存至本地',
                            this.state.privateKey + "\n" + this.state.PublicAddress,
                            [
                                {
                                    text: '复制到剪贴板', onPress: () => {
                                    this._setClipboardContent.bind(this)(result.privateKey + "\n" + result.address);
                                }
                                },
                            ]
                        );
                    } else {
                        alert("注册失败")
                    }
                }
            ).catch(err => {
            alert(err);
        });
    };

    handleChange = (key, val) => {
        this.setState({
            [key]: val
        })
    };

    async _setClipboardContent(v) {
        Clipboard.setString(v);
        try {
            let v = await Clipboard.getString();
            alert(v);
        } catch (e) {
            alert("保存失败!");
        }
    }

    save = (k, name = "data", v) => {
        storage.save({
            key: k,  // 注意:请不要在key中使用_下划线符号!
            data: {
                [name]: v
            },
            id: name,

            // 如果不指定过期时间，则会使用defaultExpires参数
            // 如果设为null，则永不过期
            expires: null
        });
    };

    load = (k, name) => {
        storage.load({
            key: k,
            id: name,

            // autoSync(默认为true)意味着在没有找到数据或数据过期时自动调用相应的sync方法
            autoSync: false,

            // syncInBackground(默认为true)意味着如果数据过期，
            // 在调用sync方法的同时先返回已经过期的数据。
            // 设置为false的话，则等待sync方法提供的最新数据(当然会需要更多时间)。
            syncInBackground: true,

            // 你还可以给sync方法传递额外的参数
            syncParams: {
                extraFetchOptions: {
                    // 各种参数
                },
                someFlag: true,
            },
        }).then(ret => {
            // 如果找到数据，则在then方法中返回
            // 注意：这是异步返回的结果（不了解异步请自行搜索学习）
            // 你只能在then这个方法内继续处理ret数据
            // 而不能在then以外处理
            // 也没有办法“变成”同步返回
            // 你也可以使用“看似”同步的async/await语法
            alert(ret[name]);
            this.setState({storage: ret[name]});
        }).catch(err => {
            //如果没有找到数据且没有sync方法，
            //或者有其他异常，则在catch中返回
            alert(err.message);
            switch (err.name) {
                case 'NotFoundError':
                    // TODO;
                    alert(err.name);
                    break;
                case 'ExpiredError':
                    // TODO
                    alert(err.name);
                    break;
            }
        })
    };

    render() {
        const tabs = [
            {title: "捐赠者"},
            {title: "筹款机构"},
            {title: "测试剪贴板"},
        ];


        return (
            <View style={styles.container}>
                <KeyboardAwareScrollView>
                    <View style={{alignItems: "center"}}>
                        <Image
                            style={styles.logo}
                            source={require('../res/image/logo_02.png')}
                        />
                        <Text style={styles.h1}>注册</Text>

                        <View style={{flex: 1}}>
                            <Tabs tabs={tabs} style={{height:358}}>
                                <View style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flex: 1,
                                    backgroundColor: '#fafafa'
                                }}>
                                    <WingBlank style={{paddingTop: 0}}>
                                        <WhiteSpace/>
                                        <WhiteSpace/>
                                        <ScrollView>
                                            <List style={styles.inputArea}>
                                                <InputItem
                                                    placeholder="请输入用户名"
                                                    onChange={v => {
                                                        this.handleChange('id', v);
                                                        this.handleChange('type', 0)
                                                    }}
                                                >用户名</InputItem>
                                                <InputItem
                                                    placeholder="请输入密码"
                                                    onChange={v => this.handleChange('password', v)}
                                                >密码</InputItem>
                                                <InputItem
                                                    placeholder="请输入昵称"
                                                    onChange={v => this.handleChange('userName', v)}
                                                >昵称</InputItem>
                                            </List>
                                            <WhiteSpace/>
                                            <Button type={"primary"}
                                                    onClick={
                                                        () => {
                                                            this.register();
                                                        }
                                                    }
                                            >注册</Button>
                                        </ScrollView>
                                    </WingBlank>
                                </View>
                                <View style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flex: 1,
                                    backgroundColor: '#fafafa'
                                }}>
                                    <WingBlank style={{paddingTop: 0}}>
                                        <WhiteSpace/>
                                        <WhiteSpace/>
                                        <ScrollView>
                                            <List style={styles.inputArea}>
                                                <InputItem
                                                    placeholder="请输入用户名"
                                                    onChange={v => {
                                                        this.handleChange('id', v);
                                                        this.handleChange('type', 1)
                                                    }}
                                                >用户名</InputItem>
                                                <InputItem
                                                    placeholder="请输入密码"
                                                    onChange={v => this.handleChange('password', v)}
                                                >密码</InputItem>
                                                <InputItem
                                                    placeholder="请输入昵称"
                                                    onChange={v => this.handleChange('userName', v)}
                                                >昵称</InputItem>
                                                <InputItem
                                                    placeholder="请输入慈善机构编号"
                                                    onChange={v => this.handleChange('code', v)}
                                                >编号</InputItem>
                                                <InputItem
                                                    placeholder="请输入机构地址"
                                                    onChange={v => this.handleChange('address', v)}
                                                >地址</InputItem>
                                            </List>
                                            <WhiteSpace/>
                                            <Button type={"primary"}
                                                    onClick={
                                                        () => {
                                                            this.register();
                                                        }
                                                    }>注册</Button>
                                        </ScrollView>
                                    </WingBlank>
                                </View>
                                <View style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flex: 1,
                                    backgroundColor: '#fafafa'
                                }}>
                                    <Button onClick={
                                        () => {
                                            this.load("address", "tom233")
                                        }
                                    }>获取存储</Button>
                                    <Text style={{color: 'red', marginTop: 20}}>
                                        {this.state.storage}
                                    </Text>
                                </View>
                            </Tabs>
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
        alignItems: 'center'
    },
    h1: {
        textAlign: "center",
        fontSize: 30,
        marginTop: 20,
        marginBottom: 20
    },
    logo: {
        marginTop: 20,
        width: 192,
        height: 150
    },
    input: {
        // width:200
    },
    inputArea: {
        width: 350
    },
    icon: {
        width: 50
        // flex: 1
    }
});
