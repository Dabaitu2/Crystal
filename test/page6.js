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
    ActivityIndicator,
    Button, FlatList, RefreshControl,
    StyleSheet,
    Text,
    View,
} from 'react-native';

const CITY_NAME = ["北京","上海","天津","广州","深圳","杭州","南京","重庆","武汉","成都","郑州","洛阳","拉萨","乌鲁木齐","呼和浩特","石家庄"];
export default class Page5 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            dataArray: CITY_NAME,
            count:0
        }

    }
    loadData = () => {
      this.setState({
          isLoading: true
      });
      setTimeout(()=>{
          let dataArray = [];
          for (let i = this.state.dataArray.length -1 ; i>=0; i--) {
                dataArray.push(this.state.dataArray[i]);
          }
          this.setState({
              isLoading: false,
              dataArray: dataArray,
          });
          alert("555")
      },2000)
    };

    addData = () => {
        let dataArray = this.state.dataArray;
        setTimeout(()=>{
            dataArray.push("新城市");
            this.setState({
                dataArray: dataArray,
                count:this.state.count+1
            });
        },4000);
    };

    _renderItem = (data)=>(
        <View style ={styles.list}>
            <Text style={styles.listText}>{data.item}</Text>
        </View>
    );

    getIndicator = () => (
        <View style={styles.container}>
            <ActivityIndicator
                size={'large'}
                animating={true}
            />
            <Text>正在加载</Text>
        </View>
    );

    render() {
        const {navigation} = this.props;
        return (
            <View style={styles.container}>
                <Text>This is page5, COUNT:{this.state.count}</Text>
                <Button title="Open draw"
                        onPress={
                            ()=>{navigation.navigate('Page4');}
                        }
                />
                <FlatList
                    data={this.state.dataArray}
                    renderItem={(data) => this._renderItem(data)}
                    // refreshing = {this.state.isLoading}
                    // onRefresh = {()=>{
                    //     this.loadData();
                    // }}
                    refreshControl ={
                        <RefreshControl
                            title = {"loading"}
                            colors = {['red']}
                            refreshing={this.state.isLoading}
                            onRefresh={
                                () => {
                                    this.loadData();
                                }
                            }
                        />
                    }
                    ListFooterComponent={
                        () => this.getIndicator()
                    }
                    // onEndReached={
                    //     () => this.addData()
                    // }
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    page1: {
        flex: 1,
        backgroundColor:'red',
    },
    page2: {
        flex: 1,
        backgroundColor:'blue',
    },
    Icon: {
        height: 22,
        width: 22
    },
    red:{
        color: 'red'
    },
    blue: {
        color: '#5daafa'
    },
    list:{
        height:50,
        borderRadius: 5,
        backgroundColor: '#fff',
        margin:10,
        marginBottom:5,
        elevation: 2,

    },
    listText:{
        textAlign: 'center',
        lineHeight:50,
        fontSize: 30
    }
});
