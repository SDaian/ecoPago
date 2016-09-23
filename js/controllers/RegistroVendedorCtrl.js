angular.module('starter')

.controller('RegistroVendedorCtrl', function($scope, $state, $rootScope, VendedorService,
      UserService, $uibModal, $stateParams) {

  $scope.subTitle = "Registro";
  $scope.isLoading = false;

  $scope.data = {
    "usuario": {
      "id": null,
      "razonSocial": null,
      "cuit": null,
      "mail": null,
      "confirmacionmail": null,
      "password": null,
      "confirmacionPassword": null,
      "domicilio": null,
      "localidad": null,
      "codigoPostal": null,
      "provincia": null
    },
    "ctaBancaria": {
      "numero": null,
      "tipoCuenta": null,
      "idBanco": null
    }
  }

$scope.vendedorEmpleado = {
  "id": null,
  "nombre": null,
  "apellido": null,
  "cuit": null,
  "mail": null,
  "confirmacionmail": null,
  "password": null,
  "confirmacionPassword": null,
  "domicilio": null,
  "localidad": null,
  "codigoPostal": null,
  "provincia": null,
  "padreId": null
};




  var modalInstance = {
    state: null,
    message: null
  };


  $scope.crearVendedor = function(){
    $scope.isLoading = true;

    VendedorService.crearVendedor($scope.data.usuario)
    .then(function(response){
      $scope.data.usuario.id = response.data.id;
      UserService.saveUser($scope.data.usuario);
      console.log("Vendedor creado con éxito: " + angular.toJson($scope.data.usuario,true));
      $scope.isLoading = false;
      $scope.message = "Vendedor creado con éxito!";
      $scope.successModal('app.reghead.registroPaso2');

    })
    .catch(function(err){
      console.log("Ha ocurrido un error: " + JSON.stringify(err));
      $scope.isLoading = false;
      $scope.message = err.data.error;
      $scope.successModal('');

    })
  }

  $scope.uploadPtoVenta = function(file){
    console.log('en upload de RegistroVendedorCtrl');
    if (file) {
      VendedorService.uploadPtoVenta(file)
        .then(function (response) {
          $scope.isLoading = false;
          $scope.message = "Punto de venta creado correctamente!";
          $scope.successModal('');
          console.log('Success ' + response.config.data.file.name + ' uploaded. Response: ' + response.data);

        },function (response) {
            $scope.isLoading = false;
            $scope.message = "Ocurrió un error!";
            $scope.successModal('');
            console.log('Error status: ' + response.status);

        },function (evt) {
            $scope.isLoading = true;
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
        });

    } else{
      console.log('No hay archivo');
    }
  }

  $scope.agregarCtaBancaria = function(){
    $scope.isLoading = true;
    var activeUser = UserService.getActiveUser();
    console.log("ACTIVE USER: " + JSON.stringify(activeUser));
    VendedorService.agregarCtaBancaria(activeUser.id, $scope.data.ctaBancaria)
    .then(function(res){
      console.log("");
      $scope.message = "La cuenta ha sido agregada correctamente!";
      $scope.isLoading = false;
      $scope.successModal('app.homehead.home');
    })
    .catch(function(err){
      console.log("Ha ocurrido un error: " + JSON.stringify(err));
      $scope.isLoading = false;
      $scope.message = "No fue posible agregar la cuenta";
      $scope.successModal('');
    })
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


  $scope.crearVendedorEmpleado = function(){
    $scope.isLoading = true;
    $scope.vendedorEmpleado.padreId = UserService.getActiveUser().id;
    VendedorService.crearVendedorEmpleado($scope.vendedorEmpleado)
    .then(function(res){
      $scope.isLoading = false;
      console.log("EMPLEADO VENDEDOR CREADO!");
      $scope.message = "Vendedor creado correctamente! Se le ha enviado un mail de activación al vendedor creado!";
      $scope.successModal('app.homehead.home');
    })
    .catch(function(err){
      $scope.isLoading = false;
      console.log("ocurrio un ERROR: " + JSON.stringify(err));
      $scope.message = err.data.error;
      $scope.successModal('');
    })
  }



  $scope.nuevaPassword = {
    'password': null,
    'confPassword': null
  }


  $scope.guardarPassword = function() {
    $scope.isLoading = true;
    if(passwordsMatch()){
      console.log("TOKEN " + $stateParams.token);
      console.log("PASSWORD DESDE controller: " + $scope.nuevaPassword.password);
      // FALTA COMPOROBAR QUE LAS PASSWORDS SEAN IGUALES
      VendedorService.guardarPassword($stateParams.sujetoId, $scope.nuevaPassword.password, $stateParams.token)
      .then(function(res){
        $scope.isLoading = false;
        console.log("Password guardada correctamente!");
        $scope.message = "Su password fue creada correctamente!";
        $state.go('operacionOk');

      })
      .catch(function(err){
        $scope.isLoading = false;
        console.log("No se pudo guardar la password!");
        $scope.message = err.data.error;
        $scope.successModal('');
      })
    }
    else{
      $scope.message = "Las passwords ingresadas deben ser iguales!";
      $scope.successModal('');
    }


  }

  function passwordsMatch(){
    return $scope.nuevaPassword.password === $scope.nuevaPassword.confPassword;
  }

  $scope.generarLoteVenta = function(){
    $scope.isLoading = true;
    var activeUser = UserService.getActiveUser();
    console.log("ACTIVE USER: " + JSON.stringify(activeUser));
    VendedorService.generarLoteVenta(activeUser.id)
    .then(function(res){
      console.log("Respuesta: " + JSON.stringify(res));
      if(res.data.id != ""){
        $scope.message = "El lote de ventas se genero correctamente!";
      }else{
        $scope.message = "No se encontraron ventas para generar un lote";
      }
      $scope.isLoading = false;
      $scope.successModal('app.homehead.home');
    })
    .catch(function(err){
      console.log("Ha ocurrido un error: " + JSON.stringify(err));
      $scope.isLoading = false;
      $scope.message = "No fue posible generar el lote de venta";
      $scope.successModal('');
    })
  }

});
