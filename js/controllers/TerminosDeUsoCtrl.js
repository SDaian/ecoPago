angular.module('starter')

.controller('TerminosDeUsoCtrl', function($scope, $state) {
  $scope.subTitle = "Términos de uso";

  $scope.boolDisabled = "true";

  $scope.goToRegistroPaso1 = function(){
    $state.go('app.reghead.registroPaso1');
  }

})
