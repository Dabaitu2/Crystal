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
    View,Dimensions
} from 'react-native';
import {Button, Card, FormInput, FormLabel, FormValidationMessage} from "react-native-elements";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {DatePicker, InputItem, List, TextareaItem} from "antd-mobile";
import ImagePicker from 'react-native-image-crop-picker';


export default class NewProject extends Component {
    constructor(props) {
        super(props);
        const nowTimeStamp = Date.now();
        const now = new Date(nowTimeStamp);
        const nowDate = now.getFullYear()+"-"+(now.getMonth()+1)+"-"+now.getDate();
        this.state = {
            selectedTab: "home",
            startDate: now,
            endDate:now,
            pic:null,
            picname:"",
            target:"",
            disc:"",
            projectName:"",
            projectDate:[nowDate,nowDate]
        }
    }
    newProject = () => {
        const {navigation} = this.props;
        let formData = new FormData();
        let type = ""
        switch (this.state.picname.split('.')[1]){
            case "png":
                type = "image/png";
                break;
            case "jpg":
                type = "image/jpg";
                break;
            case "jpeg":
                type = "image/jpeg";
                break;
            default:
                alert("不支持的文件格式!");
                type = "";
        }
        let file = {uri: this.state.pic.path, type: type, name: this.state.picname};




        formData.append("uploadFile",file);
        formData.append("projectName",this.state.projectName);
        formData.append("projectIntroduce",this.state.disc);
        formData.append("projectDate",this.state.projectDate.toString());
        formData.append("projectTarget",this.state.target);

        // fetch("http://10.0.2.2:8000/project", {
            fetch("http://119.23.231.235/api/project",{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type':'multipart/form-data',
            },
            body: formData
        }).then(res => res.json())
            .then(result => {
                if(result.data==='success'){
                    alert("项目发起成功!");
                    navigation.navigate('Home');
                } else if (result.data==='not correct user'){
                    alert("您不具备项目发起资格!");
                }
            })
            .catch(function (err) {
                alert(err);
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
                    <Text style={{position:'absolute', top:150, fontSize:30, fontWeight:'600', left:15, color:'#fff'}}>NEW PROJECT 发起新项目</Text>
                    <List renderHeader={() => '项目基本信息'}>
                        <InputItem
                            clear
                            placeholder={"请输入项目名称"}
                            onChange={
                                (v)=>{
                                    this.setState({
                                        projectName:v
                                    })
                                }
                            }
                        >项目名称</InputItem>
                        <InputItem
                            clear
                            placeholder={"在下方选择项目图片"}
                            editable={false}
                            value={this.state.picname}
                        >项目图片</InputItem>
                        <Button
                            iconRight={{name: 'photo'}}
                            title={"选择图片"}
                            buttonStyle={{
                                backgroundColor: "#fc731a",
                                height: 45,
                                marginBottom:10,
                                marginTop:10
                            }}
                            onPress = {
                                () => {
                                    ImagePicker.openPicker({
                                        width: width,
                                        height: 300,
                                        cropping: true,
                                    }).then(image => {
                                        var filename = image.path.split('react-native-image-crop-picker/')[1];
                                        this.setState({
                                            pic:image,
                                            picname:filename
                                        });

                                    });
                                }
                            }/>
                        <DatePicker
                            mode="date"
                            title="Select Date"
                            extra="Optional"
                            value={this.state.startDate}
                            onChange={date => {
                                var dateArray = this.state.projectDate;
                                dateArray[0] = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
                                this.setState({
                                    startDate:date,
                                    projectDate: dateArray
                                });
                            }}
                        >
                            <List.Item arrow="horizontal">起始时间</List.Item>
                        </DatePicker>
                        <DatePicker
                            mode="date"
                            title="Select Date"
                            extra="Optional"
                            value={this.state.endDate}
                            onChange={date => {
                                var dateArray = this.state.projectDate;
                                dateArray[1] = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
                                this.setState({
                                    endDate:date,
                                    projectDate: dateArray
                                });
                            }}
                        >
                            <List.Item arrow="horizontal">结束时间</List.Item>
                        </DatePicker>
                        <InputItem
                            clear
                            placeholder={"请输入目标金额"}
                            onChange={
                                (v)=>{
                                    this.setState({
                                        target:v
                                    })
                                }
                            }
                        >目标金额</InputItem>
                        <TextareaItem
                            placeholder={"请在这里输入项目简介"}
                            rows={5}
                            onChange={
                                (v)=>{
                                    this.setState({
                                        disc:v
                                    })
                                }
                            }
                        />
                        <Button
                            iconRight={{name: 'code'}}
                            title={"PRESENT IT"}
                            buttonStyle={{
                                backgroundColor: "#167ffc",
                                height: 55,
                                marginBottom:10,
                                marginTop:10
                            }}
                            onPress={
                                ()=>{
                                    this.newProject();
                                }
                            }
                        />
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
