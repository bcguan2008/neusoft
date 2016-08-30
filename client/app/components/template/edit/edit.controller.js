/**
 * (description)
 * 
 * @author yourname
 */

export default class EditController {
    constructor($scope,Api,$http) {
      "ngInject";
      this.name = 'edit';
      this.Api = Api;
      
  }
    init(){
        $scope.vm.store = this.api.get
  }
}