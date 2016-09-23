angular.module('starter')
.factory('VendedorService', function($http, Utils, UserService, Upload, $rootScope) {

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
});
