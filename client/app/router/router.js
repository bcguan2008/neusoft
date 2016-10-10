
import ffanRouter from './router.service';
import uiRouter from 'angular-ui-router';
import routeConfig from './routerConfig';

export default angular.module('app.router', [
    uiRouter
])
.config(($stateProvider)=>{
    /**
     *  统一路由配置 
     */
    if (!routeConfig || routeConfig.length == 0) {
        throw 'No router found , please set router'
    }
    routeConfig.forEach((route) => {
        $stateProvider.state(route.name, {
            url: route.url,
            template: route.template
        });
    });
})
.service({
    ffanRouter
})
