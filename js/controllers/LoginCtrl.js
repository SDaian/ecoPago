angular.module('starter')
	.controller('LoginCtrl', function($scope, UserService, $state) {

		$scope.loginData = {
			dni: "",
			password: "",
			web: true,
			mail: ""
		};
		$scope.showLoginError = false;
		$scope.showValidationError = false;

		$scope.doLogin = function() {
			if ($scope.loginData.dni.toString().length <7) {
				$scope.showValidationError = true;
				return;
			} else {
				$scope.showValidationError = false;
			}
			var success = function() {
				$scope.showLoginError = false;
				console.log(UserService.getActiveUser());
				$state.go('app.homehead.home');
			}
			var failure = function() {
				$scope.showLoginError = true;
			}

			UserService.login($scope.loginData, success, failure);

		}

	})
