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
