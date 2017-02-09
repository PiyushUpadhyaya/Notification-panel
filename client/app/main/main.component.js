import angular from 'angular';
const ngRoute = require('angular-route');
import routing from './main.routes';


export class MainController {

  newThing = '';

  /*@ngInject*/
  constructor($http, $scope, socket) {
    this.$http = $http;
    this.socket = socket;

    $scope.awesomeThings = [];
    $scope.no = 0;
    setInterval(function(){
	    $http.get('/api/things')
      .then(response => {
        $scope.awesomeThings = response.data;
            console.log($scope.awesomeThings);
	    $scope.no = $scope.awesomeThings.length;
            //socket.syncUpdates('thing', $scope.awesomeThings);
      });
	 }, 3000);
    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('thing');
    });
  }

  $onInit() {

  }

  addThing() {
    if(this.newThing) {
      this.$http.post('/api/things', {
        name: this.newThing
      });
      this.newThing = '';
    }
  }

  deleteThing(thing) {
    this.$http.delete(`/api/things/${thing._id}`);
  }

  setSeenAll(athings) {
		var alIds = []
           for(var thing in athings){
               //console.log(athings[thing]._id);
	       alIds.push(athings[thing]._id);
	       alIds[thing];
            }
	this.$http.post('/api/things/', alIds);

  }


}

export default angular.module('appApp.main', [ngRoute])
  .config(routing)
  .component('main', {
    template: require('./main.html'),
    controller: MainController
  })
  .name;
