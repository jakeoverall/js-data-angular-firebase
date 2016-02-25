app.run(function ($rootScope, $state, AuthService) {
    // $rootScope.$on('$stateChangeStart', function (event, toState, toStateParams) {
    //     var invalidUser = AuthService.authMember();
    //     if (invalidUser) {
    //         //FORCES AUTHENTICATION
    //         if (toState.name !== 'login') {
    //             event.preventDefault()
    //             $state.go('login')
    //         }
    //     }
    // });
})

app.config(function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise('/');
    
    $stateProvider
        .state('/', {
            
        })
        .state('/login', {
            
        })
})