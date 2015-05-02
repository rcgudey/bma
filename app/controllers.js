/**
 * Created by gudeyr on 4/27/2015.
 */

var controllers = angular.module("mainApp.controllers",['mainApp.services']);

controllers.controller('LoginController',function( $scope,  $location, loginService ){
    $scope.doLogout = function(){
        loginService.logoutCurrentUser();
        $location.path("/");
    };
    $scope.submit = function (_username, _password) {
            console.log("logging in username: "+ _username + " with Password: "+ _password);
            var user = {username: _username};
            loginService.loginUser(user);
            $location.path("/booking");
    };
});

controllers.controller('AboutUsController',function( $scope,  loginService ){
    $scope.user = loginService.getUser();
});

controllers.controller('BookingController',function( $scope,  loginService ){
    $scope.user = loginService.getUser();
});
