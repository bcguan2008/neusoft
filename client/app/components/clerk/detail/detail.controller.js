/**
 * (description)
 * 
 * @author anyunfei
 */

export default class DetailController {
  constructor($scope) {
  	 "ngInject";
    this.name = 'detail';
    $scope.vm.clerk = [{ id: 1, name: 'OK' }, { id: 2, name: 'Null' }, { id: 3, name: 'non' }];
    $scope.vm.clerk.name="张三";
    $scope.vm.clerk.contact="13224159986";
    $scope.vm.clerk.store ="万达广场店";
    $scope.vm.clerk.right = "普通收银员、商品管理员、财务管理员";
    $scope.vm.clerk.rtx="";
    $scope.vm.clerk.mail="trsx@wanda.cn";
    $scope.vm.clerk.pwd ="123456789";
  }
}