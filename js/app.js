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

.config(function($stateProvider, $urlRouterProvider) {

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
});
