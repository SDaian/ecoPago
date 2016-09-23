angular.module('starter')
	.factory('VentasService', function($http, Utils) {

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

	})
