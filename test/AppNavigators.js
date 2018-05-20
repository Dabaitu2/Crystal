import {DrawerNavigator, StackNavigator, TabNavigator} from 'react-navigation'
import HomePage from './HomePage'
import Profile from './Profile'
import Page2 from './page2'
import Page3 from './page3'
import Page4 from './page4'
import Page5 from './Page5'
import Page6 from './page6'
import Ionicons from "react-native-vector-icons/Ionicons";
import React from 'react'
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

export const AppTabNavigator = TabNavigator(
    {
    Profile: {
        screen: Profile,
        navigationOptions: {
            tabBarLabel:"Profile",
            tabBarIcon: ({tintColor, focused}) => (
                <Ionicons
                    name={focused ? 'ios-cart': "ios-cart-outline"}
                    size={26}
                    style={{color: tintColor}}
                />
            )
        }
    },
    Page2: {
        screen: Page2,
        navigationOptions: {
            tabBarLabel:"Page2",
            tabBarIcon: ({tintColor, focused}) => (
                <Ionicons
                    name={focused ? 'ios-person': "ios-person-outline"}
                    size={26}
                    style={{color: tintColor}}
                />
            )
        }
    },
    Page3: {
        screen: Page3,
        navigationOptions: {
            tabBarLabel:"Home",
            tabBarIcon: ({tintColor, focused}) => (
                <Ionicons
                    name={focused ? 'ios-home': "ios-home-outline"}
                    size={26}
                    style={{color: tintColor}}
                />
            )
        }
    }
}, {
    //设置TabNavigator的位置
    tabBarPosition: 'bottom',
        tabBarOptions: {
            //Android属性
            upperCaseLabel: false,//是否使标签大写，默认为true
            //共有属性
            showIcon: true,//是否显示图标，默认关闭
            showLabel: true,//是否显示label，默认开启
            activeTintColor: '#5daafa',//label和icon的前景色 活跃状态下（选中）
            inactiveTintColor: 'gray',//label和icon的前景色 活跃状态下（未选中）
            style: { //TabNavigator 的背景颜色
                backgroundColor: 'white',
                height: 55,
            },
            indicatorStyle: {//标签指示器的样式对象（选项卡底部的行）。安卓底部会多出一条线，可以将height设置为0来暂时解决这个问题
                height: 0,
            },
            labelStyle: {//文字的样式
                fontSize: 13,
                marginTop: -5,
                marginBottom: 5,
            },
            iconStyle: {//图标的样式
                marginBottom: 5,
            }
        },

    });

export const AppDrawerNavigator = DrawerNavigator(
    {
    Page4: {
        screen: Page4,
        navigationOptions: {
            drawerLabel:"Page4",
            drawerIcon: ({tintColor}) => (
                <MaterialIcons
                    name={'drafts'}
                    size={24}
                    style={{color: tintColor}}
                />
            )
        }
    }, Page5: {
            screen: Page5,
            navigationOptions: {
                drawerLabel:"Page5",
                drawerIcon: ({tintColor}) => (
                    <MaterialIcons
                        name={'drafts'}
                        size={24}
                        style={{color: tintColor}}
                    />
                )
            }
        },
        page6: {
            screen: Page6,
            navigationOptions: {
                drawerLabel:"Page6",
                drawerIcon: ({tintColor}) => (
                    <MaterialIcons
                        name={'drafts'}
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
            initialRouteName: Page4, // 默认页面组件
            activeTintColor: '#008AC9',  // 选中文字颜色
            activeBackgroundColor: '#f5f5f5', // 选中背景颜色
            inactiveTintColor: '#000',  // 未选中文字颜色
            inactiveBackgroundColor: '#fff', // 未选中背景颜色
            style: {  // 样式
            }
        }
});

export const AppStackNavigator = StackNavigator({
    HomePage: {
        screen: HomePage,
        navigationOptions: {
            title: "Home"
        }
    },
    Profile: {
        screen: Profile,
        navigationOptions: ({navigation}) => ({
            title: `${navigation.state.params.name}`
        })
    },
    Page2: {
        screen: Page2,
        navigationOptions: (props) => {
            const {navigation} = props;
            const {state, setParams} = navigation;
            const {params} = state;
            return {
                title: params.title ? params.title: 'this is page 2'
            }
        }
    },
    Page3: {
        screen: Page3
    },
    TabNav: {
        screen: AppTabNavigator,
        navigationOptions:{
            title:" This is TabNavigator"
        }
    },
    DrawerNav: {
        screen: AppDrawerNavigator,
        navigationOptions:{
            title:" This is DrawerNavigator"
        }
    }
}, {
    navigationOptions: {
        // header: null
    }
});
