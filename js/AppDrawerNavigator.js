/**
 *    Created by tomokokawase
 *    On 2018/5/9
 *    阿弥陀佛，没有bug!
 */
import React, {Component} from 'react'
import {createDrawerNavigator, DrawerItems} from "react-navigation";
import Home from "./Home";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import User from "./User";
import newProject from "./newProject";
import MyProject from "./MyProject";
import Detail from "./Detail";
import {detailStackNavigator} from './detailStackNavigator'
import {ScrollView, Text, View} from "react-native";
import {Avatar} from "react-native-elements";
import Charge from "./Charge";




export const AppDrawerNavigator = createDrawerNavigator(
    {
        Home: {
            screen: detailStackNavigator,
            navigationOptions: {
                title:"Home",
                drawerLabel:"首页",
                drawerIcon: ({tintColor}) => (
                    <MaterialIcons
                        name={'hot-tub'}
                        size={24}
                        style={{color: tintColor}}
                    />
                )
            }
        },
        User: {
            screen: User,
            navigationOptions: {
                title:"User",
                drawerLabel:"用户中心",
                drawerIcon: ({tintColor}) => (
                    <MaterialIcons
                        name={'face'}
                        size={24}
                        style={{color: tintColor}}
                    />
                )
            }
        },
        NewProject: {
            screen: newProject,
            navigationOptions: {
                title:"NewProject",
                drawerLabel:"发起众筹",
                drawerIcon: ({tintColor}) => (
                    <MaterialIcons
                        name={'drafts'}
                        size={24}
                        style={{color: tintColor}}
                    />
                )
            }
        },
        MyProject: {
            screen: MyProject,
            navigationOptions: {
                title:"MyProject",
                drawerLabel:"我的项目",
                drawerIcon: ({tintColor}) => (
                    <MaterialIcons
                        name={'assignment'}
                        size={24}
                        style={{color: tintColor}}
                    />
                )
            }
        },
        Charge: {
            screen: Charge,
            navigationOptions: {
                title:"Charge",
                drawerLabel:"资金充值",
                drawerIcon: ({tintColor}) => (
                    <MaterialIcons
                        name={'local-atm'}
                        size={24}
                        style={{color: tintColor}}
                    />
                )
            }
        }
    },{
        drawerWidth: 220, // 抽屉宽
        drawerPosition: 'left', // 抽屉在左边还是右边
        contentOptions: {
            initialRouteName: User, // 默认页面组件
            activeTintColor: '#45a8ff',  // 选中文字颜色
            activeBackgroundColor: '#f5f5f5', // 选中背景颜色
            inactiveTintColor: '#000',  // 未选中文字颜色
            inactiveBackgroundColor: '#fff', // 未选中背景颜色
            style: {  // 样式
            }
        },
        contentComponent: props => {
            return (
                <ScrollView>
                    <View>
                        <View style={{paddingVertical: 20, paddingHorizontal: 15, backgroundColor:'#45a8ff',alignItems:"center"}}>
                            <Avatar
                                large
                                rounded
                                source={require('../res/image/geek.d40f9769.png')}
                                activeOpacity={0.7}
                            />
                            <Text style={{color:'#FFF'}}>CRYSTAL</Text>
                        </View>
                        <DrawerItems
                            {...props}
                            onItemPress={
                                (route)=> {
                                    props.navigation.navigate(route.route.routeName);
                                }
                            }
                        />
                    </View>
                </ScrollView>
            )
        },
    }
    );