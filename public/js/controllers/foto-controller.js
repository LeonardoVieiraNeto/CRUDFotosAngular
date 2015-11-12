// public/js/controllers/foto-controller.js

angular.module('alurapic')
    .controller('FotoController', ['$scope', 'recursoFoto', '$routeParams', 'cadastroDeFotos', function($scope, recursoFoto, $routeParams, cadastroDeFotos) {

        $scope.foto = {};
        $scope.mensagem = '';

        if($routeParams.fotoId) {
            recursoFoto.get({fotoId: $routeParams.fotoId}, function(foto) {
                $scope.foto = foto; 
            }, function(erro) {
                $scope.mensagem = 'Não foi possível obter a foto'
            });
        }

       $scope.submeter = function() {

            if ($scope.formulario.$valid) {
                cadastroDeFotos.cadastrar($scope.foto)
                .then(function(dados) {
                    $scope.mensagem = dados.mensagem;
                    if (dados.inclusao) $scope.foto = {};

                    $scope.focado = true; 
                })
                .catch(function(erro) {
                    $scope.mensagem = erro.mensagem;
                });
            }
        };
		
		
	$scope.TesteResolve =	function exibe(texto) {
    return $q(function(resolve, reject) {
		console.log('Entrou no ');
        // simulando ação assíncrona com setTimeout

        setTimeout(function() {
            if(texto == 'Alura') {
                resolve('resolvida');
            } else {
                reject('rejeitada')
            }
        }, 5000);
    });    
	}

	}]);