angular.module('starter')

.controller('HistorialVentasCtrl', function($scope, UserService, VentasService) {

  var usuario = UserService.getActiveUser();
  $scope.ventas = [];
  $scope.isLoading = true;

  $scope.getHistorial = function(){
    console.log("USUARIO ID: " + usuario.id);
      VentasService.getHistorialVentas(usuario.id)
      .then(function(res){
        $scope.isLoading = false;
        $scope.ventas = res.data;
        console.log("HISTORIAL: " + JSON.stringify(res.data));
      })
      .catch(function(err){
        $scope.isLoading = false;
        console.log("Ocurrió un error: " + err.data.error);
      })
  }

  $scope.getHistorial();

});
