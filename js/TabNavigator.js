import {createMaterialTopTabNavigator} from 'react-navigation'
import React from 'react'
import Register from "./Register";
import Login from "./Login";



export const AppTabNavigator = createMaterialTopTabNavigator({
    Register: {
        screen: Register,
        navigationOptions: {
            tabBarLabel:"Register",
        }
    },
    Login: {
        screen: Login,
        navigationOptions: {
            tabBarLabel: "Login",
        }

    },
});
