(function(){
  angular.module('steamWorks')
  .factory('deviceSvc', deviceSvc);

  deviceSvc.$inject = [];

  function deviceSvc(){
    var devices = [];

    return {
      addDevice: function(device){
        devices.push(device);
      },

      getDevices: function(){
        return devices;
      },

      getDevice: function(name){
        return _.find(devices, function(d) {
          return d.name === name;
        });


   
      },

      reset: function(){
        devices = [];
      }

    };
  }

})();