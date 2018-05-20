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
    Dimensions, FlatList, TouchableNativeFeedback
} from 'react-native';

import {Carousel, WingBlank} from "antd-mobile";
import {ListItem} from "react-native-elements";
import * as Progress from 'react-native-progress';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import {StackActions, NavigationActions} from "react-navigation";





export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: "home",
            items:[],
            starter:""
        }
    }


    componentWillMount() {
        this.Auth();
        this.getListData();
        this.getStarter();

    }

    keyExtractor = (item, index) => index;

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

    renderItem = ({ item }) =>{
        let progress = item.projectcompleted/100;
        const {navigation} = this.props;
        return(
            <View key={item.projectID}>
                <TouchableNativeFeedback onPress={
                    ()=>{
                        navigation.navigate('Detail',{
                            projectID: item.projectID,
                            starter: this.state.starter
                        });
                    }
                }>
                <View style={styles.list}>
                    <View style={styles.title}>
                        <Text style={styles.titleContent}>{item.projectName}</Text>
                        <Ionicons name={"md-add-circle"}
                                  style={styles.plus}
                                  size={24}
                        />
                    </View>
                    <View style={{ flexDirection:"row", height:30, paddingLeft:10}}>
                        <Text style={{lineHeight:30}}>众筹进度: </Text>
                        <View>
                            <Progress.Bar
                                progress={progress}
                                width={305}
                                height={10}
                                style={{marginTop:10, marginLeft:5}}
                                unfilledColor={"#cecece"}
                                borderWidth={0}
                            />
                        </View>
                    </View>
                    <View style={{ flexDirection:"row", height:30, paddingLeft:10}}>
                        <Text style={{lineHeight:20}}>目标金额：{item.projectTarget}￥</Text>
                    </View>
                </View>
                </TouchableNativeFeedback>
            </View>

        )};

    emptyComponent = () => {
        return (
            <View style={{paddingTop:30, justifyContent:"center"}}>
                <MaterialIcons
                    name={"priority-high"}
                    size={50}
                    style={{textAlign:'center', marginBottom:20, color:'#45a8ff'}}
                />
                <Text style={{textAlign:'center', fontSize:20,  color:'#45a8ff'}}>
                    您还没有关注或发起任何项目！
                </Text>
            </View>
        )
    };

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


    getListData = () => {
        // fetch('http://10.0.2.2:8000/engageList',
        fetch('http://119.23.231.235/api/engageList',
            {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                }
            })
            .then(res => res.json())
            .then(result => {
                    if(result.answer==="success") {
                        this.setState({
                            items: result.data
                        })
                    } else {
                        alert("logout!")
                    }
                }
            ).catch(err => {
            alert(err);
        });
    };

    render() {
        const {navigation} = this.props;
        const data = [require('../res/image/r1.jpg'),
                      require('../res/image/r2.jpg'),
                      require('../res/image/r3.jpg')];
        let {height, width} = Dimensions.get('window');
        return (
            <View style={styles.container}>
                <View style={styles.slider}>
                    <Carousel
                        autoplay={true}
                        infinite={true}
                        autoplayInterval={4000}
                    >
                        {data.map((val) => {
                            return (<Image
                                source={val}
                                alt=""
                                key={val}
                                style={{ width: width, height:250}}
                            />)
                        })}
                    </Carousel>
                </View>
                <View style={{flex:1}}>
                    <View style={{flexDirection:'row',backgroundColor:"#fff", borderBottomColor:"#cecece",borderBottomWidth:0.5, height:30}}>
                        <Text style={{lineHeight:30, paddingLeft:10}}>近期项目</Text>
                    </View>
                    <FlatList
                        data={this.state.items}
                        renderItem={this.renderItem}
                        ListEmptyComponent={this.emptyComponent}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    h1:{
        fontSize:30
    },
    slider:{
    },
    list:{
        height:120,
        backgroundColor:"#ffffff",
        borderBottomColor:"#cecece",
        borderBottomWidth:0.5,
        justifyContent:'center',
    },
    title:{
        paddingLeft:10,
        height:40,
        flexDirection:"row",
        justifyContent: "space-between"
    },
    titleContent:{
        fontSize:18,
        lineHeight:30,
        color: "#1e90ff",
        fontWeight:"600"
    },
    plus:{
        height:40,
        paddingTop:5,
        paddingRight:25,
        color:"#45a8ff",
    }
});
