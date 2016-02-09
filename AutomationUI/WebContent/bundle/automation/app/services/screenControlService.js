app.service('screenControlService', function($http,AUTOMATION_CONSTANTS,$rootScope) {
console.log('Screen Control Service loaded');
var screenControlServiceURL = AUTOMATION_CONSTANTS.SCA_SERVICE;
var screenControlTypesServiceURL = AUTOMATION_CONSTANTS.SCA_SERVICE+"/getScreenControlTypes";
var saveScreenControlServiceURL = AUTOMATION_CONSTANTS.SCA_SERVICE+"/saveUpdateScreenControlsByApplication";
var screenControls = [];
var screenControlTypes = [];

this.getScreenControlResults = function(){
	return screenControls;
};


this.loadScreenControl = function() {
	return  $http.get(screenControlServiceURL+'/getScreenControlsByApplication/'+$rootScope.applicationId+'/'+$rootScope.applicationName).then(function(response) {
			console.log("loadScreenControl" + response.status);
			if(response.data !== undefined) {
				screenControls = response.data;
			} else {
				screenControls = [];
			}
			return screenControls;
	     });
};

this.loadScreenControlTypes = function() {
	  return  $http.get(screenControlTypesServiceURL,{params : {
	    	applicationId : $rootScope.applicationId
	        ,applicationName : $rootScope.applicationName
	      }}).then(function(response) {
			console.log("loadScreenControlTypes" + response.status);
			if(response.data !== undefined) {
				screenControlTypes = response.data;
			} else {
				screenControlTypes = [];
			}
			return screenControlTypes;
	     });
};

this.addUpdateScreenControl = function($scope,screenControlObj) {
//	String applicationId, String applicationName, String screenControlJson
	$scope.loading = true;
	$http.post(screenControlServiceURL+'/saveUpdateScreenControlsByApplication/'+$rootScope.applicationId+'/'+$rootScope.applicationName, screenControlObj).
	    success(function(data, status, headers, config) {
	    	console.log("screen control add/updated successfully");
	    	$scope.loading = false;
	    	$rootScope.dispSuccessMsg("Screen Control details saved successfully");
	    }).
	    error(function(data, status, headers, config) {
	    	console.log("screen control add/update failed");
	    	$scope.loading = false;
	    	$rootScope.dispErrorMsg("Screen Control details failed to save. Please try again");
	    });
};

this.removeScreenControl = function(screenControlObj){				
	$http.post(screenControlServiceURL+'/deleteScreenControl', screenControlObj).
	    success(function(data, status, headers, config) {
	    	$rootScope.dispSuccessMsg("Screen Control details deleted successfully");
	    }).
	    error(function(data, status, headers, config) {
	    	$rootScope.dispErrorMsg("Screen Control details failed to delete. Please try again");
	    });
};


  this.getScreenControlLength = function(){
	  if(screenControls === undefined) {return 0;}
      return screenControls.length;
  };	

  
  this.addUpdateScreenNode = function($scope,screenObj) {
//		String applicationId, String applicationName, String screenControlJson
		$scope.loading = true;
		$http.post(screenControlServiceURL+'/saveUpdateScreenByApplication/'+$rootScope.applicationId+'/'+$rootScope.applicationName, screenObj).
		    success(function(data, status, headers, config) {
		    	console.log("screen add/updated successfully");
		    	$scope.loading = false;
		    	$rootScope.dispSuccessMsg("Screen details saved successfully");
		    }).
		    error(function(data, status, headers, config) {
		    	console.log("screen add/update failed");
		    	$scope.loading = false;
		    	$rootScope.dispErrorMsg("Screen details failed to save. Please try again");
		    });
	};
	
	this.addScreenNode = function($scope,screenObj) {
//		String applicationId, String applicationName, String screenControlJson
		$scope.loading = true;
		$http.post(screenControlServiceURL+'/saveScreenByApplication/'+$rootScope.applicationId+'/'+$rootScope.applicationName, screenObj).
		    success(function(data, status, headers, config) {
		    	console.log("screen add successfully");
		    	$scope.loading = false;
		    	$rootScope.dispSuccessMsg("Screen details saved successfully");
		    	$scope.screenCtrlTreedata = data;
		    }).
		    error(function(data, status, headers, config) {
		    	console.log("screen add failed");
		    	$scope.loading = false;
		    	$rootScope.dispErrorMsg("Screen details failed to save. Please try again");
		    });
	};
	
	this.updateScreenNode = function($scope,screenObj) {
//		String applicationId, String applicationName, String screenControlJson
		$scope.loading = true;
		$http.post(screenControlServiceURL+'/updateScreenByApplication/'+$rootScope.applicationId+'/'+$rootScope.applicationName, screenObj).
		    success(function(data, status, headers, config) {
		    	console.log("screen updated successfully");
		    	$scope.loading = false;
		    	$rootScope.dispSuccessMsg("Screen details updated successfully");
		    	$scope.screenCtrlTreedata = data;
		    }).
		    error(function(data, status, headers, config) {
		    	console.log("screen update failed");
		    	$scope.loading = false;
		    	$rootScope.dispErrorMsg("Screen details failed to update. Please try again");
		    });
	};
	
	this.addControlNode = function($scope,screenId, controlObj) {
//		String applicationId, String applicationName, String screenControlJson
		$scope.loading = true;
		$http.post(screenControlServiceURL+'/saveControlByApplication/'+$rootScope.applicationId+'/'+$rootScope.applicationName+'/'+screenId, controlObj).
		    success(function(data, status, headers, config) {
		    	console.log("control add successfully");
		    	$scope.loading = false;
		    	$rootScope.dispSuccessMsg("Control details saved successfully");
		    	$scope.screenCtrlTreedata = data;
		    }).
		    error(function(data, status, headers, config) {
		    	console.log("control add failed");
		    	$scope.loading = false;
		    	$rootScope.dispErrorMsg("Control details failed to save. Please try again");
		    });
	};
	
	this.updateControlNode = function($scope,screenId, controlObj) {
//		String applicationId, String applicationName, String screenControlJson
		$scope.loading = true;
		$http.post(screenControlServiceURL+'/updateControlByApplication/'+$rootScope.applicationId+'/'+$rootScope.applicationName+'/'+screenId, controlObj).
		    success(function(data, status, headers, config) {
		    	console.log("control updated successfully");
		    	$scope.loading = false;
		    	$rootScope.dispSuccessMsg("Control details updated successfully");
		    	$scope.screenCtrlTreedata = data;
		    }).
		    error(function(data, status, headers, config) {
		    	console.log("control update failed");
		    	$scope.loading = false;
		    	$rootScope.dispErrorMsg("Control details failed to update. Please try again");
		    });
	};
	
	this.deleteScreenNode = function($scope,screenId) {
		$scope.loading = true;
		$http.post(screenControlServiceURL+'/deleteScreenByApplication/'+$rootScope.applicationId+'/'+$rootScope.applicationName+'/'+screenId).
		    success(function(data, status, headers, config) {
		    	console.log("screen deleted successfully");
		    	$scope.loading = false;
		    	$rootScope.dispSuccessMsg("Screen deleted successfully");
		    	$scope.screenCtrlTreedata = data;
		    }).
		    error(function(data, status, headers, config) {
		    	console.log("screen delete failed");
		    	$scope.loading = false;
		    	$rootScope.dispErrorMsg("Screen details failed to delete. Please try again");
		    });
	};
	
	this.deleteControlNode = function($scope,screenId,controlId) {
		$scope.loading = true;
		$http.post(screenControlServiceURL+'/deleteControlByApplication/'+$rootScope.applicationId+'/'+$rootScope.applicationName+'/'+screenId+'/'+controlId).
		    success(function(data, status, headers, config) {
		    	console.log("control deleted successfully");
		    	$scope.loading = false;
		    	$rootScope.dispSuccessMsg("Control deleted successfully");
		    	$scope.screenCtrlTreedata = data;
		    }).
		    error(function(data, status, headers, config) {
		    	console.log("control delete failed");
		    	$scope.loading = false;
		    	$rootScope.dispErrorMsg("Control details failed to delete. Please try again");
		    });
	};
	
});