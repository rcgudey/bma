/**
 * Created by gudeyr on 4/27/2015.
 */

var services = angular.module("mainApp.services",['ngCookies']);

services.factory("loginService",function($rootScope, $cookieStore){
    const usernameKey = "currentUser";
    //$cookiesProvider.expires =

    var loginService = {

        loginUser : function(value){
            var expireDate = new Date();
            expireDate.setTime(expireDate.getTime()+ 6000);
            $cookieStore.put(usernameKey,value,{'expires': expireDate});
            $rootScope.Loggedin = true;
        },
        getUser : function(){
            return $cookieStore.get(usernameKey);
        },
        logoutCurrentUser: function(){
            $cookieStore.remove(usernameKey);
            $rootScope.Loggedin = false;
        }
    }
    return loginService;
})

