angular.module('starter', ['ui.bootstrap', 'ui.router', 'ngFileUpload'])

.run(function() {

    /*
    //para redireccionar al login si no esta logeado
    $rootScope.$on('$stateChangeStart', function(event, toState,
       toParams, fromState, fromParams) {

       if(toState.name !== 'app.login' && !UserService.isUserLogged()){
         event.preventDefault(); // stop current execution
         $state.go('app.login');
       }
     });*/
})

.config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider) {

    $stateProvider
    //footer completo
        .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/app.html'
    })

    //header "vacio" solo con logo
    .state('app.reghead', {
        url: '/reghead',
        abstract: true,
        views: {
            'contenido': {
                templateUrl: 'templates/reghead.html',
            }
        }
    })

    //header completo con menu
    .state('app.homehead', {
        abstract: true,
        url: '/homehead',
        views: {
            'contenido': {
                templateUrl: 'templates/homehead.html',
            }
        }
    })

    .state('login', {
        url: '/login',
        templateUrl: 'templates/login.html',
        controller: 'LoginCtrl'
    })

    .state('app.reghead.terminos', {
        url: '/terminos',
        views: {
            'contenido': {
                templateUrl: 'templates/registro/terminos.html',
                controller: 'TerminosDeUsoCtrl'
            }
        }
    })

    .state('app.reghead.registroPaso1', {
        url: '/registroPaso1',
        views: {
            'contenido': {
                templateUrl: 'templates/registro/registro_paso1_empresa.html',
                controller: 'RegistroVendedorCtrl'
            }
        }
    })

    .state('app.reghead.registroPaso2', {
        url: '/registroPaso2',
        views: {
            'contenido': {
                templateUrl: 'templates/registro/registro_paso2.html',
            }
        }
    })

    .state('app.reghead.registroPaso1Empresa', {
        url: '/registroPaso1Empresa',
        views: {
            'contenido': {
                templateUrl: 'templates/registro/registro_paso1_empresa.html',
                controller: ''
            }
        }
    })

    .state('app.reghead.registroPaso2Empresa', {
        url: '/registroPaso2Empresa',
        views: {
            'contenido': {
                templateUrl: 'templates/registro/registro_paso2_empresa.html',
            }
        }
    })

    .state('app.reghead.crearPuntoVenta', {
        url: '/crearPuntoVenta',
        views: {
            'contenido': {
                templateUrl: 'templates/punto_venta/crear_puntov.html',
                controller: 'RegistroVendedorCtrl'
            }
        }
    })

    .state('app.reghead.agregarCuenta', {
        url: '/agregarCuenta',
        views: {
            'contenido': {
                templateUrl: 'templates/medios_pago/agregar_cuenta.html',
                controller: 'RegistroVendedorCtrl'
            }
        }
    })

    .state('app.reghead.misCuentas', {
        url: '/misCuentas',
        views: {
            'contenido': {
                templateUrl: 'templates/medios_pago/mis_cuentas.html',
            }
        }
    })

    .state('app.reghead.crearVendedores', {
            url: '/crearVendedores',
            views: {
                'contenido': {
                    templateUrl: 'templates/punto_venta/crear_vendedores.html',
                    controller: 'RegistroVendedorCtrl'
                }
            }
        })
        .state('vendedores1Vez', {
            url: '/vendedores1Vez/:token/:sujetoId',
            templateUrl: 'templates/punto_venta/vendedores_1vez.html',
            controller: 'RegistroVendedorCtrl'

        })

    //Home new
    .state('app.homehead.home', {
        url: '/home',
        views: {
            'contenido': {
                templateUrl: 'templates/home.html',
                controller: 'RegistroVendedorCtrl'
            }
        }
    })

    .state('app.homehead.nuevaVenta', {
        url: '/nuevaVenta',
        views: {
            'contenido': {
                templateUrl: 'templates/ventas/nueva_venta.html',
                controller: 'VentasCtrl'
            }
        }
    })

    .state('app.homehead.historial', {
        url: '/historial',
        views: {
            'contenido': {
                templateUrl: 'templates/back_office/historial.html',
                controller: 'HistorialVentasCtrl'
            }
        }
    })

    .state('recuperacionPassword', {
        url: '/recuperacionPassword',
        templateUrl: 'templates/registro/recuperacion_password.html',
        controller: 'RecuperacionPasswordCtrl'

    })

    .state('operacionOk', {
        url: '/operacionOk',
        templateUrl: 'templates/registro/operacion_ok.html',
        controller: ''

    })

    .state('app.reghead.preguntas', {
        url: '/preguntas',
        views: {
            'contenido': {
                templateUrl: 'templates/terminos-faq/preguntas.html',
                controller: ''
            }
        }
    })

        .state('app.reghead.terminosCond', {
        url: '/terminosCond',
        views: {
            'contenido': {
                templateUrl: 'templates/terminos-faq/terminos-cond.html',
                controller: ''
            }
        }
    })

        .state('instructivo', {
            url: '/instructivo',
            templateUrl: 'templates/instructivo.html',
            controller: ''
        })


    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/login');
}]);

angular.module('starter')

.controller('HistorialVentasCtrl', ["$scope", "UserService", "VentasService", function($scope, UserService, VentasService) {

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

}]);

angular.module('starter')

.controller('homeCtrl', ["$scope", "$q", "UserService", "VentasService", function($scope, $q, UserService, VentasService) {



  $scope.user = UserService.getActiveUser();
  console.log("**********************" + JSON.stringify($scope.user));
  $scope.ventas = null;
  $scope.badgeColor = "";
  $scope.closeIconColor = "";
  $scope.showError = false;
  $scope.showOk = false;



}]);

angular.module('starter')
	.controller('LoginCtrl', ["$scope", "UserService", "$state", function($scope, UserService, $state) {

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

	}])

angular.module('starter')

.controller('ModalSuccessCtrl', ["$scope", "$state", "$uibModalInstance", function($scope, $state, $uibModalInstance) {


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

}])

angular.module('starter')
.controller('RecuperacionPasswordCtrl', ["$scope", "$state", "$window", "$uibModal", "UserService", function($scope, $state, $window, $uibModal, UserService) {

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

}]);

angular.module('starter')

.controller('RegistroVendedorCtrl', ["$scope", "$state", "$rootScope", "VendedorService", "UserService", "$uibModal", "$stateParams", function($scope, $state, $rootScope, VendedorService,
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

}]);

angular.module('starter')

.controller('TerminosDeUsoCtrl', ["$scope", "$state", function($scope, $state) {
  $scope.subTitle = "Términos de uso";

  $scope.boolDisabled = "true";

  $scope.goToRegistroPaso1 = function(){
    $state.go('app.reghead.registroPaso1');
  }

}])

angular.module('starter')

.controller('VentasCtrl', ["$scope", "$q", "$uibModal", "UserService", "VentasService", function($scope, $q, $uibModal, UserService, VentasService) {

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
}]);

angular.module('starter')
    .factory('UserService', ["$http", "Utils", function($http, Utils) {

        var activeUser = null;
        var services = {
            login: login,
            saveUser: saveUser,
            getActiveUser: getActiveUser,
            getVentas: getVentas,
            generarToken: generarToken,
            recuperarPassword: recuperarPassword
        }
        return services;

        function login(data, success, failure) {
            console.log("datos login: " + JSON.stringify(data));
            return $http({
                method: 'POST',
                url: Utils.LOGIN_URL,
                //url: 'http://requestb.in/1bsa7mo1',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'Accept': 'application/json'
                },
                data: data
            }).then(function successCallback(response) {
                console.log(JSON.stringify(response));
                saveUser(response.data);
                success();
            }, function errorCallback(response) {
                failure();
            });
        }

        function saveUser(user) {
            activeUser = user;
        }

        function getActiveUser() {
            return activeUser;
        }

        function getVentas(success, failure) {
            return $http({
                method: 'GET',
                url: Utils.VENTAS_COMERCIO_URL + activeUser.id + Utils.VENTAS_COMERCIO_URL2,
                //url: 'http://requestb.in/1bsa7mo1',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'Accept': 'application/json'
                }
            })
        }


        function generarToken(destinatarioMailDTO){
          return $http({
              method: 'POST',
              url: Utils.GENERAR_TOKEN,
              data: destinatarioMailDTO
            });


        }

        function recuperarPassword(recuperacionPasswordDTO){
          console.log("RECUPERACIONDTO: " + JSON.stringify(recuperacionPasswordDTO));
          return $http({
              method: 'POST',
              url: Utils.RECUPERAR_PASSWORD,
              data: recuperacionPasswordDTO
            });
        }
    }])

//apunto al server de Azure (191.235.90.185)
var SERVER = 'http://ecopago.brazilsouth.cloudapp.azure.com:8080/';
//var SERVER = 'http://localhost:8080/';

var ECOPAGO_REST = 'ecopagoapi/rest/';

angular.module('starter')
.constant('Utils', {

	COMPRADORES_URL: SERVER + ECOPAGO_REST + 'compradores/',
	VENDEDORES_URL: SERVER + ECOPAGO_REST + 'vendedores/',
	CREAR_CUENTA_BANCARIA_VENDEDOR: SERVER + ECOPAGO_REST + 'vendedores/sujetoId/ctabancaria',
	ACTIVAR_CUENTA_VENDEDOR: SERVER + ECOPAGO_REST + 'vendedores/sujetoId/activarCuenta',
	HISTORIAL_VENTAS: SERVER + ECOPAGO_REST + 'vendedores/sujetoId/historial',
	TARJETAS_URL: '/tarjetas',
	MEDIOS_URL: '/medios',
	LOGIN_URL: SERVER + ECOPAGO_REST + 'login',
	VENTAS_COMERCIO_URL: SERVER + ECOPAGO_REST + 'vendedores/',
	VENTAS_COMERCIO_URL2: '/ventas',
	VENTAS_URL: SERVER + ECOPAGO_REST + 'operaciones/ventas',
	UPLOAD_PUNTO_VENTA: SERVER + ECOPAGO_REST + 'vendedores/XXX/puntoVenta',
	GENERAR_LOTE_VENTA: SERVER + ECOPAGO_REST + 'vendedores/XXX/generarLote',
	GENERAR_TOKEN: SERVER + ECOPAGO_REST + 'compradores/generarToken/',
});

angular.module('starter')
.factory('VendedorService', ["$http", "Utils", "UserService", "Upload", "$rootScope", function($http, Utils, UserService, Upload, $rootScope) {

  var services = {
    crearVendedor: crearVendedor,
    uploadPtoVenta: uploadPtoVenta,
    agregarCtaBancaria: agregarCtaBancaria,
    showModal: showModal,
    crearVendedorEmpleado: crearVendedorEmpleado,
    guardarPassword: guardarPassword,
    generarLoteVenta: generarLoteVenta
  }
        return services;


  function crearVendedor(vendedor){
    var dataVendedor = {
      razonSocial: vendedor.razonSocial,
      dni: vendedor.cuit,
      mail: vendedor.mail,
      password: vendedor.password,
      domicilio: vendedor.domicilio,
      localidad: vendedor.localidad,
      codigoPostal: vendedor.codigoPostal,
      provincia: vendedor.provincia,
      celular: vendedor.celular
    }

    return $http({
      method: 'POST',
      url: Utils.VENDEDORES_URL,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Accept': 'application/json'
      },
      data: dataVendedor
    })
  }

  function uploadPtoVenta(file){
    console.log('En uploadPtoVenta');
    console.log(file);

    var user = UserService.getActiveUser();
    var url = Utils.UPLOAD_PUNTO_VENTA.replace('XXX',user.id);
    console.log("MANDANDO A " + url);
    return   Upload.upload({
      url: url,
      data: {file: file}
    });
  }

  function agregarCtaBancaria(sujetoId, ctaBancaria){
    var url = Utils.CREAR_CUENTA_BANCARIA_VENDEDOR.replace('sujetoId', sujetoId);

    return $http({
      method: 'POST',
      url: url,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Accept': 'application/json'
      },
      data: ctaBancaria
    })
  }


  function showModal(){
    console.log("EN SHOWMODAL");
    $rootScope.$broadcast('ll');

  }

  function crearVendedorEmpleado(vendedorEmpleado){
    var dataVendedorEmpleado = {
      nombre: vendedorEmpleado.nombre,
      apellido: vendedorEmpleado.apellido,
      dni: vendedorEmpleado.cuit,
      mail: vendedorEmpleado.mail,
      password: null,
      domicilio: null,
      localidad: null,
      codigoPostal: null,
      provincia: null,
      celular: null,
      padreId: vendedorEmpleado.padreId
    }

console.log("DATA: " + JSON.stringify(dataVendedorEmpleado));
console.log("URL SERVER: " + Utils.VENDEDORES_URL);
    return $http({
      method: 'POST',
      url: Utils.VENDEDORES_URL,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Accept': 'application/json'
      },
      data: dataVendedorEmpleado
    })
  }

  function guardarPassword(vendedorId, password, token){
    console.log("");
var url = Utils.ACTIVAR_CUENTA_VENDEDOR.replace('sujetoId', vendedorId);
console.log("PASSWORD RECIBIDA: " + password);
var dataPut = {
  'token': token,
  'password': password
}
    return $http({
      method: 'PUT',
      url: url,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Accept': 'application/json'
      },
      data: dataPut
    })
  }

  function generarLoteVenta(sujetoId){
    var url = Utils.GENERAR_LOTE_VENTA.replace('XXX', sujetoId);

    return $http({
      method: 'POST',
      url: url,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Accept': 'application/json'
      }
    })
  }
}]);

angular.module('starter')
	.factory('VentasService', ["$http", "Utils", function($http, Utils) {

		var services = {
			crearVenta: crearVenta,
			getHistorialVentas: getHistorialVentas,

		}
		return services;

		function crearVenta(data, success, failure){
			console.log("SERVICE VENTA:: " + JSON.stringify(data));
			return $http({
					method: 'POST',
					url: Utils.VENTAS_URL,
					//url: 'http://requestb.in/1bsa7mo1',
					headers: {
						'Content-Type': 'application/json; charset=utf-8',
						'Accept': 'application/json'
					},
					data: data
				}).then(function successCallback(response) {
					success(response);
				}, function errorCallback(response) {
					failure(response);
				});
		}

		function getHistorialVentas(sujetoId){
			var url = Utils.HISTORIAL_VENTAS.replace('sujetoId', sujetoId);
			return $http({
				method: 'GET',
				url: url,
				//url: 'http://requestb.in/1bsa7mo1',
				headers: {
					'Content-Type': 'application/json; charset=utf-8',
					'Accept': 'application/json'
				}
			})
		}

	}])
