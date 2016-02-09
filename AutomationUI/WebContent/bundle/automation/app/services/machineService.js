app.service('machineService', function($http,AUTOMATION_CONSTANTS,$rootScope) {
console.log('machineService loaded');
var serviceURL = AUTOMATION_CONSTANTS.MACHINE_SERVICE;
var machineList = [];

this.getMachines = function(){
	return machineList;
};


	this.getMachineList = function(){
	  return  $http.get(serviceURL+"/getMachinesByApplication/"+$rootScope.applicationId+'/'+$rootScope.applicationName)
		.then(function(response) {
			console.log(response.status);
			if(response.data.machines !== undefined) {
				machineList = response.data.machines;
			} else {
				machineList = [];
			}
			return machineList;
		});
  };

  this.addMachine = function(newObj,$scope) {
	  if(machineList !== undefined) {
	    machineList.push(newObj);
  	  }
	  $http.post(serviceURL+'/addNewMachine', newObj).
	    success(function(data, status, headers, config) {
	    	console.log("Success Add Machine Data = " + data.machineId);
	    	console.log("Success status = " + data);
	    	newObj.machineId = data.machineId;
			$scope.data.push(newObj); 
			$rootScope.dispSuccessMsg("Machine details saved successfully");
	    }).
	    error(function(data, status, headers, config) {
	    	console.log("Error Add Machine Data = " + data.machineId);
	    	console.log("Error status = " + data);
	    	$rootScope.dispErrorMsg("Mahine details failed to save. Please try again");
	    });
  };
  
  this.removeMachine = function(machine){				
	  $http.post(serviceURL+'/deleteMachine', machine).
	    success(function(data, status, headers, config) {
	    	$rootScope.dispSuccessMsg("Machine details deleted successfully");
	    }).
	    error(function(data, status, headers, config) {
	    	$rootScope.dispErrorMsg("Mahine details failed to delete. Please try again");
	    });
  };
  
  
  this.updateMachine = function(machine){				
	  $http.post(serviceURL+'/updateMachine', machine).
	    success(function(data, status, headers, config) {
	    	$rootScope.dispSuccessMsg("Machine details updated successfully");
	    }).
	    error(function(data, status, headers, config) {
	    	$rootScope.dispErrorMsg("Mahine details failed to update. Please try again");
	    });
  };

  this.getMachineLength = function(){
	  if(machineList === undefined) {return 0;}
      return machineList.length;
  };	

});