(function() {
	'use strict';

	angular
		.module('steamWorks')
		.factory('MatchSvc', MatchSvc);

	MatchSvc.$inject = [];

	function MatchSvc() {
	
	   
	    var calcs = {
	    	TELE_VAULT_CUBE_CONSTANT: 5,
	    	TELE_PARKING_CONSTANT: 5,
			CLIMB_CONSTANT: 50,
			AUTOLINE_CONSTANT: 5
	    };

	    var match = {

        };

		this.reset = function(){

		};

		var matchSvc = {
				beginMatch: beginMatch,
				getMatch: getMatch,
				updateMatch: updateMatch,
				constants: calcs
			};

		return matchSvc;

		function getMatch() {

			return match;
		}

		function beginMatch() {
			angular.copy([], match);
			
		}

		function updateMatch(newProperties) {
			match = _.merge(match, newProperties);
		}
	}
})();
