/**
 *    Created by tomokokawase
 *    On 2018/5/9
 *    阿弥陀佛，没有bug!
 */
import {createStackNavigator} from 'react-navigation'
import {AppTabNavigator} from "./TabNavigator";
import {AppDrawerNavigator} from "./AppDrawerNavigator";
import Detail from './Detail'
import Home from "./Home";
import Purchase from "./Purchase";
import MyProject from "./MyProject";
import newRoute from "./newRoute";
import cashRoute from "./cashRoute";


export const detailStackNavigator = createStackNavigator({
    Home: {
        screen: Home,
        navigationOptions: {
            title: "近期项目"
        }
    },
    Detail: {
        screen: Detail,
        navigationOptions: {
            title: "项目详情"
        }
    },
    Purchase: {
        screen: Purchase,
        navigationOptions: {
            title: "进行捐赠"
        }
    },
    MyProject: {
        screen: MyProject,
        navigationOptions: {
            title: "我的项目"
        }
    },
    NewRoute: {
        screen: newRoute,
        navigationOptions: {
            title: "更新资金流"
        }
    },
    CashRoute: {
        screen: cashRoute,
        navigationOptions: {
            title: "查看资金流"
        }
    }
}, {
    navigationOptions: {
        // header: null,
        initialRouteName: "Home"
    }
});

