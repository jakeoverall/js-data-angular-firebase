(function () {


	angular
		.module('jsData.firebaseAuth', [
			'js-data',
			'ui.router'
		])

		.config(function ($stateProvider, $urlRouterProvider) {
			$urlRouterProvider.otherwise('/login');

			$stateProvider
				.state('login', {
					url: '/login',
					templateUrl: '/app/auth/auth-form.html',
					controller: 'AuthController'
				})
		})

		.run(function ($rootScope, $state, AuthService) {
			$rootScope.$on('$stateChangeStart', function (event, toState, toStateParams) {
				var invalidUser = AuthService.authMember();
				if (invalidUser) {
					//FORCES AUTHENTICATION
					if (toState.name !== 'login') {
						event.preventDefault()
						$state.go('login')
					}
				}
			});
		})

		.factory('User', function (DS) {
			return DS.defineResource('user');
		})

		.factory('AuthService', function ($rootScope, DSFirebaseAdapter, User) {
			var db = DSFirebaseAdapter.ref;

			function authMember(cb) {
				var authData = db.getAuth();
				if (!authData) {
					cb ? cb({ error: { message: 'Unable to Authenticate' } }) : '';
					return true;
				}
				setMember(authData.uid, cb);
			}

			function setMember(id, cb) {
				User.find(id).then(function(){
					User.bindOne(id, $rootScope, 'member');
					cb ? cb() : '';
				})
			}

			function createUser(authData, user) {
				var userToAdd = {
					id: authData.uid,
					email: user.email,
					created: Date.now()
				}
				User.create(userToAdd);
			}
			return {
				register: function (user, cb) {
					db.createUser(user, function (err, authData) {
						if (err) {
							return cb(err)
						}
						createUser(authData, user);
						authMember(cb);
					});
				},
				login: function (user, cb) {
					db.authWithPassword(user, function (err, authData) {
						if (err) {
							return cb(err)
						}
						authMember(cb);
					})
				},
				logout: function () {
					db.unauth();
					$rootScope.member = null;
				},
				authMember: authMember
			}
		})

		.controller('AuthController', function ($scope, $state, AuthService) {

			$scope.login = function () {
				clearErr();
				AuthService.login($scope.user, handleDBResponse);
			};

			$scope.register = function () {
				clearErr();
				AuthService.register($scope.user, handleDBResponse);
			};
			
			$scope.logout = function () {
				clearErr();
				AuthService.logout();
			};
			
			function clearErr() {
				$scope.authErr = '';
			}

			function handleDBResponse(err) {
				if (err) {
					$scope.authErr = err.message;
					$scope.$apply();
				} else {
					//$state.go('dashboard');
				}
			}
		})

} ());