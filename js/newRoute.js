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
    Text,
    View,Dimensions,Switch
} from 'react-native';
import {Button, Card, FormInput, FormLabel, FormValidationMessage} from "react-native-elements";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {DatePicker, InputItem, List, ListItem, Slider, TextareaItem, WhiteSpace} from "antd-mobile";
import forge from 'node-forge'



export default class Purchase extends Component {
    constructor(props) {
        super(props);
        const nowTimeStamp = Date.now();
        const now = new Date(nowTimeStamp);
        let nowDate = now.getFullYear()+"-"+(now.getMonth()+1)+"-"+now.getDate();
        this.state = {
            selectedTab: "home",
            storage:"",
            starter:"",
            cost:0,
            disableBtn:false,
            challenge:"",
            sign:"",
            ActualDate: nowDate,
            startDate:now,
            routeName:"",
            receiver:"",
            receiverProve:"",
            receiverRegister:"",
            disc:""
        }
    }


    componentWillMount() {
        this.getStarter();
    }


    getStarter = () => {
        const {navigation} = this.props;
        // fetch('http://10.0.2.2:8000/getStarter',{
            fetch('http://119.23.231.235/api/getStarter',{
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            }
        })
            .then(res => res.json())
            .then(result => {
                    if(result.answer==="success") {
                        this.setState({
                            starter: result.data[0].userId,
                        });
                    } else {
                        alert("ERROR!");
                        navigation.navigate('Login');
                    }
                }
            ).catch(err => {
            alert(err);
        });
    };

    signiture = () => {
        forge.options.usePureJavaScript = true;
        let text = this.state.challenge;
        let privateKey = forge.pki.privateKeyFromPem(this.state.storage.trim());
        let encrypted = forge.pki.rsa.encrypt(text, privateKey, 0x01);
        this.setState({
            sign: encrypted
        })
    };

    goTrade = () => {
        const {navigation} = this.props;
        // fetch("http://10.0.2.2:8000/cashRoute", {
            fetch('http://119.23.231.235/api/cashRoute',{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                projectId: navigation.getParam('projectID'),
                starter: this.state.starter,
                receiverRegister:this.state.receiverRegister,
                cost: this.state.cost,
                date:this.state.ActualDate,
                RouteName:this.state.routeName,
                receiver:this.state.receiver,
                receiverProve:this.state.receiverProve,
                disc:this.state.disc,
                sign:this.state.sign,
                challenge:this.state.challenge
            })
        }).then(res => res.json())
            .then(result => {
                if(result.answer==='success'){
                    alert("更新成功!");
                    navigation.navigate('Home');
                }
            })
            .catch(function (err) {
                alert(err);
            })
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
                    alert("对不起，不存在本地私钥文件!");
                    break;
                case 'ExpiredError':
                    // TODO
                    alert("对不起，本地私钥文件过期!");
                    break;
            }
        })
    };


    render() {
        const {navigation} = this.props;
        let {width, height} = Dimensions.get('window');
        return (
            <View style={styles.container}>
                <KeyboardAwareScrollView >
                    <Image
                        source={require('../res/image/form.jpg')}
                        resizeMode={'cover'}
                        style={{width:width, height:200}}/>
                    <Text style={{position:'absolute', top:150, fontSize:30, fontWeight:'600', left:15, color:'#fff'}}>UPDATE & CASH 更新资金</Text>
                    <List renderHeader={() => '完善基本信息'}>
                        <InputItem
                            clear
                            placeholder={this.state.starter}
                            editable={false}
                        >提现ID</InputItem>
                        <InputItem
                            clear
                            placeholder={navigation.getParam('projectID')}
                            editable={false}
                        >项目ID</InputItem>
                        <InputItem
                            clear
                            placeholder={"请输入交易用途"}
                            onChange={
                                (v)=>{
                                    this.setState({
                                        routeName:v
                                    })
                                }
                            }
                        >交易用途</InputItem>
                        <InputItem
                            clear
                            placeholder={"请输入收款方"}
                            onChange={
                                (v)=>{
                                    this.setState({
                                        receiver:v
                                    })
                                }
                            }
                        >收款方</InputItem>
                        <InputItem
                            clear
                            placeholder={"请输入收款的社会统一信用认证号"}
                            onChange={
                                (v)=>{
                                    this.setState({
                                        receiverRegister:v
                                    })
                                }
                            }
                        >信用认证</InputItem>
                        <InputItem
                            clear
                            placeholder={"请输入交易凭证(统一发票号等)"}
                            onChange={
                                (v)=>{
                                    this.setState({
                                        receiverProve:v
                                    })
                                }
                            }
                        >凭证信息</InputItem>
                        <InputItem
                            clear
                            placeholder={"请输入提现金额"}
                            onChange={
                                (v)=>{
                                    this.setState({
                                        cost:v
                                    })
                                }
                            }
                        >提现金额</InputItem>
                        <DatePicker
                            mode="date"
                            title="Select Date"
                            extra="请选择"
                            value={this.state.startDate}
                            onChange={date => {
                                var dateArray = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
                                this.setState({
                                    startDate:date,
                                    ActualDate: dateArray
                                });
                            }}
                        >
                            <List.Item arrow="horizontal">交易时间</List.Item>
                        </DatePicker>
                        <TextareaItem
                            placeholder={"请在这里输入资金详细信息(必填)"}
                            rows={5}
                            style={{
                                paddingLeft:15
                            }}
                            onChange={
                                (v)=>{
                                    this.setState({
                                        disc:v
                                    })
                                }
                            }
                        />
                    </List>

                    <List renderHeader={() => '完善信息进行提现'}>

                        <InputItem
                            clear
                            placeholder={"这里输入用于公私钥验证的文本"}
                            onChange={
                                (v)=>{
                                    this.setState({
                                        challenge: v
                                    });
                                }
                            }
                        >验证文本</InputItem>
                        <List.Item
                            extra={<Switch
                                value={this.state.disableBtn}
                                onValueChange={
                                    ()=>{
                                        this.setState({
                                            disableBtn: !this.state.disableBtn
                                        });
                                    }
                                }
                            />}
                        >输入私钥(按钮锁定文本)</List.Item>
                        <TextareaItem
                            editable={!this.state.disableBtn}
                            style={{paddingLeft:10}}
                            clear
                            placeholder={"这里输入您的私钥"}
                            value={this.state.storage}
                            rows={3}
                            onChange={(v)=>{
                                this.setState({
                                    storage: v
                                })
                            }}
                        />
                        <WhiteSpace />
                        <Button
                            backgroundColor={"#fc731a"}
                            disabled={this.state.disableBtn}
                            title={"获取本地私钥"}
                            icon={{name: 'envira', type: 'font-awesome'}}
                            onPress={
                                () => {
                                    this.load('privateKey',this.state.starter)
                                }
                            }
                        />
                        <WhiteSpace />
                        <Button
                            backgroundColor={"#45a8ff"}
                            disabled={this.state.disableBtn}
                            title={"计算数字签名"}
                            icon={{name: 'cached'}}
                            onPress={
                                () => {
                                    this.signiture();
                                }
                            }
                        />
                        <WhiteSpace />
                        <InputItem
                            placeholder={"此处为计算出的数字签名"}
                            editable={false}
                            value={this.state.sign}
                        >数字签名</InputItem>
                        <WhiteSpace />
                        <Button
                            backgroundColor={"#7ed476"}
                            title={"更新路径"}
                            icon={{name: 'favorite'}}
                            onPress={
                                () => {
                                    this.goTrade();
                                }
                            }
                        />
                        <WhiteSpace />
                    </List>
                </KeyboardAwareScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e9e9ef',
    },
    h1:{
        fontSize:30
    }
});
