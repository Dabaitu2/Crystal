/**
 *    Created by tomokokawase
 *    On 2018/5/15
 *    阿弥陀佛，没有bug!
 */
export default Auth = () => {
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