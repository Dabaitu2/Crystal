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
    Dimensions, ScrollView
} from 'react-native';

import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import {ListItem} from "react-native-elements";
import {InputItem, List, WhiteSpace} from "antd-mobile";

const {width, height} = Dimensions.get('window');


export default class Detail extends Component {
    constructor(props) {
        super(props);
        const {navigation} = props;
        this.state = {
            items:[],
            reviews:[],
            showReview:false,
            newreview:"",
            belongs:false,
            finished: false,
        }
    }


    componentWillMount() {
        const {navigation} = this.props;
        this.getDetailData();
        this.getReviewData();
    }


    postReview = () => {
        const {navigation} = this.props;
        fetch('http://119.23.231.235/api/review',{
        // fetch('http://10.0.2.2:8000/review',{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                projectId: navigation.getParam('projectID'),
                detail: this.state.newreview,
                reviewDate: new Date().toLocaleDateString(),
                floor: 1,
            })
        }).then(res => res.json())
            .then(result => {
                if(result.answer==="success") {
                    navigation.navigate('Home');
                } else {
                    alert("ERROR!");
                    navigation.navigate('Login');
                }
            }).catch(err=>{
            alert(err);
        })
    };
    getReviewData = () => {
        const {navigation} = this.props;
        // fetch('http://10.0.2.2:8000/review?projectId='+navigation.getParam('projectID'),{
        fetch('http://119.23.231.235/api/review?projectId='+navigation.getParam('projectID'),{
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            }
        }).then(res => res.json())
            .then(result => {
                if(result.answer==="success") {
                    this.setState({
                        reviews: result.data,
                    });
                } else {
                    alert("ERROR!");
                    navigation.navigate('Login');
                }
            }).catch(err=>{
                alert(err);
        })

    };


    getDetailData = () => {
        const {navigation} = this.props;
        // fetch('http://10.0.2.2:8000/detailPage?id='+navigation.getParam('projectID'),{
        fetch('http://119.23.231.235/api/detailPage?id='+navigation.getParam('projectID'),{
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            }
        })
            .then(res => res.json())
            .then(result => {
                    if(result.answer==="success") {
                        this.setState({
                            items: result.data[0]
                        });
                        if(result.data[0].projectStarter === navigation.getParam('starter')){
                            this.setState({
                                belongs:true
                            });
                        }
                    } else {
                        alert("ERROR!");
                        navigation.navigate('Login');
                    }
                }
            ).catch(err => {
            alert(err);
        });
    };



    render() {
        const {navigation} = this.props;
        let items = this.state.items;
        return (
            <ScrollView>
            <View style={styles.container}>
                <View style={styles.ImageBox}>
                    <Image
                        source={{uri: ('http://119.23.231.235/api/'+items.projectImage)}}
                         // source={{uri: ('http://10.0.2.2:8000/'+items.projectImage)}}
                        style={{
                            width:width,
                            height:200,
                        }}
                        resizeMode='cover'
                        resizeMethod='scale'
                    />
                    <View style={styles.upperBox}>
                        <View style={styles.info}>
                            <Text style={{fontSize:18}}>已募金额</Text>
                            <Text style={{color:'#ff7c38',fontSize:18}}>{items.projectFortune}</Text>
                        </View>
                        <View style={styles.info}>
                            <Text style={{fontSize:18}}>目标金额</Text>
                            <Text  style={{color:'#ff7c38', fontSize:18}}>{items.projectTarget}</Text>
                        </View>


                    </View>
                </View>
                <View style={styles.Firstbody}>
                    <View style={{
                        flexDirection:"row",
                        justifyContent:"space-between",
                        paddingRight:15
                    }}>
                        <Text style={{fontSize:24, fontWeight:'600'}}>{items.projectName}</Text>
                        <Text style={{fontSize:20, fontWeight:'600', color:"#1e90ff"}}>项目ID: {items.projectID}</Text>
                    </View>
                    <Text>献出你的一份爱心!</Text>
                </View>
                <View style={styles.Secondbody}>
                    <View>
                        <Text style={{fontSize:24, fontWeight:'600', color:"#1e90ff"}}>机构详情</Text>
                    </View>
                    <View style={styles.line}>
                        <MaterialIcons name={"account-balance"} size={16} style={{color:"#1e90ff"}} />
                        <Text style={[styles.font16, styles.black]}>发起机构: {items.projectStarter}</Text>
                    </View>
                    <View style={styles.line}>
                        <MaterialIcons name={"date-range"} size={16} style={{color:"#1e90ff"}}/>
                        <Text style={[styles.font16, styles.black]}>发起时间: {(items.projectDate+"").split(",")[0]}</Text>
                    </View>
                    <View style={styles.line}>
                        <MaterialIcons name={"near-me"} size={16} style={{color:"#1e90ff"}}/>
                        <Text style={[styles.font16, styles.black]}>机构地点: 北京XX区XX街342号XX大厦</Text>
                    </View>
                    <View style={styles.line}>
                        <MaterialIcons name={"security"} size={16} style={{color:"#1e90ff"}}/>
                        <Text style={[styles.font16, styles.black]}>已通过全国募捐备案</Text>
                    </View>
                    <View>
                        <Text style={styles.font16}>慈善组织公开募捐编号</Text>
                        <Text style={styles.font16}>542471123FAC79123D</Text>
                        <Text style={styles.font16}>合约发起者地址:</Text>
                        <Text style={styles.font16}>0x34321e095a69003ba158831D8e0F2019dEb4bA67</Text>
                    </View>
                </View>
                <View style={styles.thirdBody}>
                    <View>
                        <Text style={{fontSize:24, fontWeight:'600', color:"#1e90ff"}}>项目简介</Text>
                        <View>
                            <Text style={[styles.font16, styles.black]}>{items.projectIntroduce}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.Secondbody}>
                    <View>
                        <Text style={{fontSize:24, fontWeight:'600', color:"#1e90ff"}}>项目详情</Text>
                    </View>
                    <View style={styles.line}>
                        <MaterialIcons name={"show-chart"} size={16} style={{color:"#1e90ff"}} />
                        <Text style={[styles.font16, styles.black]}>目标金额: {items.projectTarget}</Text>
                    </View>
                    <View style={styles.line}>
                        <MaterialIcons name={"track-changes"} size={16} style={{color:"#1e90ff"}}/>
                        <Text style={[styles.font16, styles.black]}>众筹进度: {items.projectcompleted}%</Text>
                    </View>
                    <View style={styles.line}>
                        <MaterialIcons name={"person"} size={16} style={{color:"#1e90ff"}}/>
                        <Text style={[styles.font16, styles.black]}>捐款人数: {items.projectParticipated}</Text>
                    </View>
                    <View style={styles.line}>
                        <MaterialIcons name={"add-alarm"} size={16} style={{color:"#1e90ff"}}/>
                        <Text style={[styles.font16, styles.black]}>发起时间: {(items.projectDate+"").split(",")[0]}</Text>
                    </View>
                    <View style={styles.line}>
                        <MaterialIcons name={"access-alarms"} size={16} style={{color:"#1e90ff"}}/>
                        <Text style={[styles.font16, styles.black]}>结束时间: {(items.projectDate+"").split(",")[1]}</Text>
                    </View>
                    <View style={styles.line}>
                        <MaterialIcons name={"local-gas-station"} size={16} style={{color:"#1e90ff"}}/>
                        <Text style={[styles.font16, styles.black]}>部署gas耗用: 65531wei</Text>
                    </View>
                </View>
                <View style={styles.fourthBody}>
                    <View>
                        <View style={{flexDirection:"row", alignItems:"center", justifyContent:"space-between"}}>
                        <Text style={{fontSize:24, fontWeight:'600', color:"#1e90ff", paddingLeft:15, paddingBottom:3}}>相关评论</Text>
                            <MaterialIcons
                                name={"control-point"}
                                size={28}
                                style={{paddingRight:15}}
                                color={'#fc693a'}
                                onPress={
                                    () => {
                                        this.setState({
                                            showReview: !this.state.showReview
                                        })
                                    }
                                }
                            />
                        </View>
                        <View>
                            {
                                this.state.showReview ? (
                                    <List>
                                        <InputItem
                                            placeholder="请在此输入您的评论"
                                            onChange={
                                                (target) => {
                                                    this.setState({
                                                        newreview:target
                                                    })
                                                }
                                            }
                                        >评论</InputItem>
                                        <Button
                                            color={"#7ed476"}
                                            title={"PRESENT"}
                                            onPress={()=>{
                                                this.postReview();
                                            }}
                                        />
                                    </List>
                                ) : null
                            }
                        </View>
                        <View>
                            {
                                this.state.reviews.map((item, i) => (
                                    <ListItem
                                        key={i}
                                        title={item.reviewer}
                                        subtitle={item.detail}
                                        leftIcon={{ name: 'face', color:"#45a8ff" }}
                                    />
                                ))
                            }
                        </View>

                    </View>
                </View>
                <View>
                    <WhiteSpace />
                    { (parseInt(this.state.items.projectcompleted)>100 || parseInt(this.state.items.projectcompleted)===100) ? this.state.belongs  ?
                    (<Button
                        title={"UPDATE ROUTE"}
                        width={width}
                        onPress={
                            () => {
                                navigation.navigate('NewRoute', {
                                    projectID: navigation.getParam('projectID'),
                                    projectStarter: items.projectStarter
                                });
                            }
                        }
                    />):(<Button
                        disabled
                        title={"众筹已完成"}
                        width={width}
                    />) : (<Button
                        title={"HELP NOW"}
                        width={width}
                        onPress={
                            () => {
                                navigation.navigate('Purchase', {
                                    projectID: navigation.getParam('projectID'),
                                    projectStarter: items.projectStarter
                                });
                            }
                        }
                    />)
                }
                </View>
                <WhiteSpace />
                <Button
                    color={"#fc731a"}
                    title={"查看资金流"}
                    onPress={
                        () => {
                            navigation.navigate('CashRoute', {
                                projectID: navigation.getParam('projectID'),
                                projectStarter: items.projectStarter
                            });
                        }
                    }
                />
                <WhiteSpace />
            </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ececec',
        zIndex:1
    },
    h1:{
        fontSize:30
    },
    Firstbody:{
        paddingTop:55,
        backgroundColor:"#fff",
        paddingLeft:15,
        paddingBottom:10
    },
    upperBox:{
        backgroundColor:"#ffffff",
        opacity:0.98,
        position:'absolute',
        top:165,
        borderColor:"#e9e9ef",
        zIndex:3,
        height:80,
        width:380,
        borderRadius:3,
        elevation:4,
        flexDirection:'row',
    },
    ImageBox:{
        alignItems:"center"
    },
    info:{
        width:190,
        alignItems:"center",
        justifyContent:'center'

    },
    Secondbody:{
        marginTop:5,
        backgroundColor:"#fff",
        paddingLeft:15,
        paddingBottom:10,
        paddingTop:10
    },
    thirdBody:{
        marginTop:5,
        backgroundColor:"#fff",
        paddingHorizontal:15,
        paddingBottom:10,
        paddingTop:10
    },
    fourthBody:{
        marginTop:5,
        backgroundColor:"#fff",
        paddingTop:10
    },
    line:{
        flexDirection:"row",
        alignItems:"center"
    },
    font16:{
        fontSize:16,
        paddingVertical:5,
        paddingLeft:5,
        paddingRight:8
    },
    black:{
        color:"#565656"
    }
});
