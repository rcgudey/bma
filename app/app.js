var mainApp = angular.module('mainApp', ['mainApp.services',"mainApp.controllers","ngCookies","ui.router"]);

mainApp.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/login");

    //Now set up the states
    $stateProvider.
        state('login',{
            url: '/login',
            templateUrl: "app/partials/login.html",
            controller: 'LoginController',
            data:{ loginRequired: false}
        }).
        state('aboutUs', {
            url: "/about-us",
            templateUrl: "app/partials/about-us.html",
            data :{ loginRequired: false},
            controller: 'AboutUsController'
        }).
        state('booking', {
            url: "/booking",
            templateUrl: 'app/partials/booking.html',
            controller: 'BookingController',
            data :{
                loginRequired: true
            }
        });
});

mainApp.run(function($rootScope, $location, $state, loginService){

    // check if user is logged in and set required variables in $rootScope
    var user = loginService.getUser();
    if(user)
        $rootScope.Loggedin = true;
    else
        $rootScope.Loggedin = false;

    $rootScope.$on('$stateChangeStart',function(event, toState, toParams){
        var loginStatus = loginService.getUser();
        //Logged in and attempting to go to login page
        if(toState.name == "login"){
            if(loginStatus !== undefined )
                $location.path("/booking");
        }

        // handle secure Pages
        var requireLogin = toState.data.loginRequired;
        console.log(requireLogin);
        console.log(loginStatus);
        if(requireLogin == true) {
            console.log("visiting a page that requires login")
            if(loginStatus === undefined){
                console.log("THOU SHALL NOT PASS!")
                $location.path("/login");
            }else{
                console.log("happy Surfing")
            }
        }else{
            console.log("visiting a page that does not need login")
        }

    });
})


