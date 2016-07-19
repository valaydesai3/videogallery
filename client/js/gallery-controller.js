angular
  .module('app')
  .controller('GalleryController', ['$rootScope', '$scope', '$state', '$stateParams', 'Clip', function($rootScope, $scope,
      $state, $stateParams, Clip) {
    $scope.allClips = [];
	$scope.recommendClip = [];
	$rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
	
    function getAllClips() {
	  Clip
		.find()
		.$promise
		.then(function(results) {
		  $scope.allClips = results;
		});
    }
    getAllClips();
	
	function getRecommendedClip() {
		Clip
        .findOne()
        .$promise
        .then(function(results) {
          $scope.recommendClip = results;
        });
    }
    getRecommendedClip();
	
}]);
