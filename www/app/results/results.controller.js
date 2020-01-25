(function(){
	'use strict';
	angular
		.module('steamWorks')
		.controller('resultsCtrl', resultsCtrl);

	resultsCtrl.$inject = ['deviceSvc', 'MatchSvc', '$ionicHistory', '$scope', '$state', 'ngProgressFactory'];

	function resultsCtrl(deviceSvc, MatchSvc, $ionicHistory, $scope, $state, ngProgressFactory, nav) {
		$scope.$on('$ionicView.beforeEnter', function (event, viewData) {
		    viewData.enableBack = true;
		});

		console.log('fuuuuuuu');
		var vm = this;
		var service_id = '12ab';
    	var characteristic_id = '34cd';

		vm.match = MatchSvc.getMatch();
		vm.submit = submit;
		vm.cancel = cancel;
		vm.device = deviceSvc.getDevice('scoutingDatabaseApp');

		vm.cubes = cubes;
		vm.total = total;
		vm.climb = climb;
        vm.fouls = fouls;
		vm.isSubmitting = false;
		vm.buttonText = 'Submit';


		$scope.progressbar = ngProgressFactory.createInstance();
		$scope.progressbar.setHeight('8px');
		$scope.progressbar.setColor('#387ef5');
		// $scope.progressbar.setParent(document.querySelector('#progressBar'));

		function cubes(){
			vm.match.autoScore
			return _.get(vm, "match.autoScore.cubes", 0)
				+ _.get(vm, "match.teleScore.cubes", 0)
				+ _.get(vm, "match.teleScore.extraCubes", 0);
		}

		function climb(){
			return _.get(vm, "match.teleScore.climbPoints", 0);
		} 

		function total(){
			return _.get(vm,"match.autoScore.total") + _.get(vm, "match.teleScore.total", 0);
		}
        
        function fouls() {
            return _.get(vm, "match.teleScore.fouls", 0);
        }


		function submit(){
			$scope.progressbar.start();
			vm.isSubmitting = true;
			vm.buttonText = 'Submitting...';
			MatchSvc.updateMatch(vm.match);
			vm.match = MatchSvc.getMatch();
           

			ble.connect(
				vm.device.id,
				function(res){
					ble.write(
						vm.device.id,
						service_id,
						characteristic_id,
						btoa(JSON.stringify(vm.match)),
						function(response){
							if(response == 'OK'){
								ble.disconnect(vm.device.id);
								vm.isSubmitting = false;
								vm.buttonText = 'Submit';
								$scope.progressbar.complete();
								alert('Match submited!');
								$ionicHistory.clearCache();
								$state.go('welcome', {}, {reload: true});
							}
						},
						function(err){
							$scope.progressbar.reset();
							ble.disconnect(vm.device.id);
							vm.isSubmitting = false;
							vm.buttonText = 'Submit';
							alert("Error occured while trying to record your match. Please try again.");
						}
                    
					);
				},
				function(err){
					$scope.progressbar.reset();
					vm.isSubmitting = false;
					vm.buttonText = 'Submit';
					alert('Something went wrong while trying to connect. Please try again');
                    
				}
              
		    );
		}
        
        
		function cancel() {
			$scope.progressbar.reset();
			vm.isSubmitting = false;
			vm.buttonText = 'Submit';
			ble.disconnect(vm.device.id);
		}
	}
})();
