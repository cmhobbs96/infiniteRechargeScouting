(function() {
	'use strict';
	angular
		.module('steamWorks')
		.controller('welcomeCtrl', welcomeCtrl);

	welcomeCtrl.$inject = ['deviceSvc', 'MatchSvc', '$http', '$state'];

	function welcomeCtrl(deviceSvc, MatchSvc, $http, $state){
		var vm = this;

		vm.matchProperties = {
			matchNumber: null,
			teamNumber: null,
            scoutName: null
		};

		vm.teams = [];
		vm.isFormValid = isFormValid;
		vm.submit = submit;

		init();
	
		function init() {
			$state.reload();
			MatchSvc.beginMatch();
			$http.get('teams.json').then(function(response) {
				vm.teams = response.data;
			});
		}

		function isFormValid() {
			var matchNumber = _.toString(vm.matchProperties.matchNumber),
				teamNumber = _.toString(vm.matchProperties.teamNumber),
                scoutName = _.toString(vm.matchProperties.scoutName);
                
			return !((matchNumber.length >= 2) && (teamNumber.length >= 2) && (scoutName.length >= 3));
		}

		function submit() {
			MatchSvc.beginMatch();
			MatchSvc.updateMatch(vm.matchProperties);
			$state.go('auto');
		}
	}
})();
