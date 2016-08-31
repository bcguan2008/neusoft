export default class AddController {
  constructor($scope,$http,staffnewSvc) {
    "ngInject";
    //var vm = this;
   this.name = 'add';
    this.staffnewSvc=staffnewSvc;
    $scope.ststoreNamemodel="";
  	$scope.storeName = [{ id: 1, name: '北京' }, { id: 2, name: '上海' }, { id: 3, name: '广州' }];
    // console.log(staffnewSvc);
      this.users = {
      name: '我的名字',
      contact: '12336548752',
      storeId:'12', //门店Id
      storeName: '111', //门店名称
      email: '1qqq@qq.component',
      rtx: '123', //即时通讯账号
      role_ids: '12', //模板ID
      templateName: '模板名称', //模板名称
      password: '112333', //密码
      con_password: '112333'//确认密码
    };
  }  

	
 	/**
	   * [create 提交]
	   */
	createuser(){
      var users = this.users,
        tip = '保存成功';

    this.staffnewSvc.createuser(users)
    .then(data => {
      //alert(tip);
      this.cancel();
    });
	  }

}