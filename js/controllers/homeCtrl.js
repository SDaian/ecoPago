angular.module('starter')

.controller('homeCtrl', function($scope, $q, UserService, VentasService) {



  $scope.user = UserService.getActiveUser();
  console.log("**********************" + JSON.stringify($scope.user));
  $scope.ventas = null;
  $scope.badgeColor = "";
  $scope.closeIconColor = "";
  $scope.showError = false;
  $scope.showOk = false;



});
