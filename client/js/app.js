angular
  .module('app', [
    'lbServices',
    'ui.router'
  ])
  .config(['$stateProvider', '$urlRouterProvider', function($stateProvider,
      $urlRouterProvider) {
    $stateProvider
      .state('clips', {
        url: '',
        templateUrl: 'template/clips.html',
        controller: 'GalleryController'
      })
	  .state('clips.detail', {
        url: '/Clips/:id',
        templateUrl: 'template/clipdetail.html',       
		controller: 'ClipDetailController'
      });

    $urlRouterProvider.otherwise('clips');
  }]);
