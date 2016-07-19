angular
  .module('app')
  .controller('ClipDetailController', ['$rootScope', '$scope', '$state', '$stateParams', 'Clip','$timeout','$sce', function($rootScope, $scope,
      $state, $stateParams, Clip, $timeout, $sce){
		console.log('into detail  controller'+ JSON.stringify($stateParams));
		$scope.clipDetails = [];
		$scope.videoProtocol = "";
		$scope.videoStreamer = "";
		$scope.videoFile = "";
		$scope.videoURL = "";			
		
		var clipId = $stateParams.id;
		//getClipById(clipId);
		
		var vm = this;
		vm.clipDetails = [];
		$scope.promiseReturn = activate();
		
		function activate(){
			return Clip.findById({id:clipId}).$promise.then(function(result){
				vm.clipDetails = result;
				console.log(vm.clipDetails);
				
				$scope.videoProtocol = vm.clipDetails.stream.protocol;
				$scope.videoStreamer = vm.clipDetails.stream.streamer;
				$scope.videoFile = vm.clipDetails.stream.file;
				
				$scope.videoURL = $scope.videoProtocol+"://"+$scope.videoStreamer+"/&mp4:"+$scope.videoFile;					
				return vm.clipDetails;
			});
		}

		var setupOpt = {
			'controls' : true,
			'autoplay' : true,
			'preload' : 'auto',
			// 'poster' : asset.thumbnail,
			'width' : '400',
			'height': '400'
		};
		
		//inject $sce to use any url, or fetch url from http request
		var vidSrc = $sce.trustAsResourceUrl($scope.videoURL);
		
		//create video js player dynamically
		videojs( 'myVideo', setupOpt, function(){
		   $scope.vid = videojs( 'myVideo' ).src([ {type: "rtmp/mp4", src: vidSrc} ]);
		});

		//destroy video when $scope is destroyed
		$scope.$on( '$destroy', function() {
			console.log( 'destroying video player' );
			$scope.vid.dispose();
		});
  }]).directive('videodir',function(){
        var linkFn;

        linkFn = function (scope, element, attrs){
               videojs("myVideo",{"techOrder": ["html5","flash"]},function(){
                    this.src({type: "rtmp/mp4", src: scope.video.videoURL});
                    console.log(':::URL:::', scope.video.videoURL);
                });
                console.log('linkfn');
            };

    return {
        restrict: 'A',
        link: linkFn
    }
});
