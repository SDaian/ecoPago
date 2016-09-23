angular.module('starter')

.controller('ModalSuccessCtrl', function($scope, $state, $uibModalInstance) {


  $scope.goToNextStep = function(state, modalMessage){
    if($scope.nextStep != null && $scope.nextStep != ''){
      $state.go($scope.nextStep);
    }

    $uibModalInstance.dismiss('ok');
  }

  $scope.dismissModal = function(){
    $uibModalInstance.dismiss('ok');
  }

  $scope.goToLogin = function(){
    $scope.dismissModal();
    $state.go('login');
  }

})
