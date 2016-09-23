angular.module('starter')

.controller('VentasCtrl', function($scope, $q, $uibModal, UserService, VentasService) {

  $scope.user = UserService.getActiveUser();
  $scope.isLoading = false;

  $scope.venta = {
    montoTotal: null,
    descripcion: "",
    idVendedor: "",
    idComprador: "",
    estadoVenta: "",
    dniComprador: "",
    empresa: "",
    tipoFactura: ""
    //, tipoFactura: ""
  }


    $scope.getVentas = function() {
      UserService.getVentas().then(function(response) {
        $scope.ventas = response.data;
        console.log('VENTAS ' + angular.toJson($scope.ventas));
      });
    }


    $scope.getEstadoVenta = function(venta) {
      switch (venta.estadoVenta) {
        case "PENDIENTE":
          $scope.badgeColor = "badge-energized";
          $scope.closeIconColor = "energized";
          break;
        case "PAGADA":
          $scope.badgeColor = "badge-balanced";
          $scope.closeIconColor = "balanced";
          break;
        case "CANCELADA":
          $scope.badgeColor = "badge-assertive";
          $scope.closeIconColor = "assertive";
          break;
      }
    }

    $scope.crearVenta = function() {
      $scope.isLoading = true;
      console.log(JSON.stringify($scope.user));
      $scope.venta.idVendedor = $scope.user.id;
      $scope.venta.empresa = $scope.user.razonSocial;

      console.log("venta a crear: " + JSON.stringify($scope.venta));
/*
      if ($scope.venta.dniComprador.length != 8 && $scope.venta.dniComprador.length != 11 || isNaN($scope.venta.montoTotal) ||
        $scope.venta.montoTotal == null) {
        $scope.showError = true;
        console.log("RETURN");
        return;
      }
      else{
      console.log("NO RETURN");
        $scope.showError = false;
      }
*/
      var success = function(response) {
        $scope.isLoading = false;
        $scope.showOk = true;
        console.log("SUCCESS:::" + JSON.stringify(response));
        $scope.message = "Solicitud de pago generada con éxito!";
        $scope.successModal('app.homehead.home');
      };
      var failure = function(response) {
        $scope.isLoading = false;
        console.log("FAILURE::::" + JSON.stringify(response));
        $scope.message = response.data.error;
        $scope.successModal();
      };


      VentasService.crearVenta($scope.venta, success, failure);
    }

    $scope.successModal = function (goToState) {
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
