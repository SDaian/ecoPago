angular.module('starter')
.controller('RecuperacionPasswordCtrl', function($scope, $state, $window, $uibModal, UserService) {

  $scope.isLoading = false;
  $scope.message = "Se ha enviado un mail a su cuenta";

  $scope.destinatarioMailDTO = {
    'sujetoId': null,
	  'destinatario': null,
	  'tipoUsuario': null,
	  'token': null
  }



  $scope.generarToken = function(){
    $scope.isLoading = true;
    $scope.destinatarioMailDTO.tipoUsuario = "VENDEDOR";
    UserService.generarToken($scope.destinatarioMailDTO)
    .then(function(res){
      $scope.isLoading = false;
      successModal('login');
      console.log("PASSWORD RECUPERADA CORRECTAMENTE!");
    })
    .catch(function(err){
      $scope.isLoading = false;
      $scope.message = "Ha ocurrido un error, intente más tarde";
      successModal('');
      console.log("ERROR EN GENERAR TOKEN: " + err.data.error);
    })
  }


  $scope.recuperacionPasswordDTO = {
    'sujetoId': null,
	  'destinatario': null,
	  'tipoUsuario': null,
	  'password': null
  }

  $scope.recuperarPassword = function(){
    $scope.recuperacionPasswordDTO.destinatario = $scope.destinatarioMailDTO.destinatario;

    $scope.recuperacionPasswordDTO.password = $scope.destinatarioMailDTO.password;
    UserService.recuperarPassword($scope.recuperacionPasswordDTO)
    .then(function(res){
      console.log("PASSWORD HASHEADA");
    })
    .catch(function(err){

    })
  }


  function successModal(goToState) {
    $scope.nextStep = goToState;
    return $uibModal.open({
      scope: $scope,
      animation: true,
      templateUrl: "templates/success_modal.html",
      controller: 'ModalSuccessCtrl',
      size: 'sm'
      });

  };

});
