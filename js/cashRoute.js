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
    Text,
    View,
    FlatList
} from 'react-native';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import {NavigationActions} from "react-navigation";





export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: "home",
            items:[],
            starter:"",
        }
    }


    componentWillMount() {
        this.Auth();
        this.getListData();

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

    renderItem = ({ item }) =>{
        const {navigation} = this.props;
        return(
            <View key={item.projectID}>
                    <View style={styles.list}>
                        <View style={styles.title}>
                            <Text style={styles.titleContent}>{item.RouteName}</Text>
                            <MaterialIcons name={item.receiverRegister ? "check":"close"}
                                      style={item.receiverRegister ? styles.plus : styles.error}
                                      color={item.receiverRegister ? "#7ed476":"#fc3520"}
                                      size={24}
                            />
                        </View>
                        <View style={{ flexDirection:"row", height:30, paddingLeft:10}}>
                            <Text style={{lineHeight:20}}>交易金额：{item.cost}￥</Text>
                        </View>
                        <View style={{ flexDirection:"row", height:30, paddingLeft:10}}>
                            <Text style={{lineHeight:20}}>付款方：{item.starter}</Text>
                        </View>
                        <View style={{ flexDirection:"row", height:30, paddingLeft:10}}>
                            <Text style={{lineHeight:20}}>收款方：{item.receiver}</Text>
                        </View>
                        <View style={{ flexDirection:"row", height:30, paddingLeft:10}}>
                            <Text style={{lineHeight:20}}>交易凭证：{item.receiverProve}</Text>
                        </View>
                        <View style={{ flexDirection:"row", height:30, paddingLeft:10}}>
                            <Text style={{lineHeight:20}}>统一社会信用认证号：{item.receiverRegister}</Text>
                        </View>
                        <View style={{ flexDirection:"row", height:30, paddingLeft:10}}>
                            <Text style={{lineHeight:20}}>交易时间：{item.RouteDate}</Text>
                        </View>
                        <View style={{ flexDirection:"row", height:30, paddingLeft:10}}>
                            <Text style={{lineHeight:20}}>交易描述：{item.disc}</Text>
                        </View>
                    </View>
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
                    当前还没有资金情况！
                </Text>
            </View>
        )
    };



    getListData = () => {
        const {navigation} = this.props;
        // fetch('http://10.0.2.2:8000/getRoute?projectID='+navigation.getParam('projectID'),
            fetch('http://119.23.231.235/api/getRoute?projectID='+navigation.getParam('projectID'),
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
        return (
            <View style={styles.container}>
                <View style={{flex:1}}>
                    <View style={styles.Header}>
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
        backgroundColor: '#e8e8e8',
    },
    h1:{
        fontSize:30
    },
    slider:{
    },
    list:{
        height:300,
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
        fontWeight:"600",
    },
    plus:{
        height:40,
        paddingTop:5,
        paddingRight:25,
        color:"#7ed476",
    },
    error:{
        height:40,
        paddingTop:5,
        paddingRight:25,
        color:"#fc3520",
    },
    Header: {
        flexDirection:'row',
        backgroundColor:"#fff",
        borderBottomColor:"#cecece",
        borderBottomWidth:0.5,
        height:30
    }
});
