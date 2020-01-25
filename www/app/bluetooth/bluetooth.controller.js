(function(){
  'use strict';
  angular
  .module('steamWorks')
  .controller('btCtrl',  btCtrl);


  btCtrl.$inject = ['$scope', '$state', 'deviceSvc'];

  function btCtrl($scope, $state, deviceSvc){
    var vm = this;
    vm.devices = []; // the devices listed in the page

    vm.scan = scan;
    vm.connect = connect;
    vm.showSpinner = false;

    function scan (){
      deviceSvc.reset();
      vm.devices = deviceSvc.getDevices();
      vm.showSpinner = true;

      deviceSvc.reset();
      ble.startScan(
        [],
        function(device){
          if(device.name){
            deviceSvc.addDevice({ 'id': device.id, 'name': device.name });
          }
        },
        function(err){
          alert('Scanning failed. Please try again.');
        }
      );

      setTimeout(
          ble.stopScan,
          5000,
          function(){
            $scope.$apply(function(){
              vm.showSpinner = false;
              vm.devices = deviceSvc.getDevices();
            });
          },
          function(){
            // Stopping scan failed
          }
      );
    }

    function connect (device_id){
      $state.go('welcome');
    }
  }
})();
