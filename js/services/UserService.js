angular.module('starter')
    .factory('UserService', function($http, Utils) {

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
    })
