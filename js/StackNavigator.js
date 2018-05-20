/**
 *    Created by tomokokawase
 *    On 2018/5/9
 *    阿弥陀佛，没有bug!
 */
import {createStackNavigator} from 'react-navigation'
import {AppTabNavigator} from "./TabNavigator";
import {AppDrawerNavigator} from "./AppDrawerNavigator";

export const AppStackNavigator = createStackNavigator({
    Login: {
        screen: AppTabNavigator,
        navigationOptions: {
            title: "Login"
        }
    },
    DrawerNav: {
        screen: AppDrawerNavigator,
        navigationOptions: {
            title: "近期项目"
        }
    }
}, {
    navigationOptions: {
        header: null,
        initialRouteName: "DrawerNav"
    }
});

