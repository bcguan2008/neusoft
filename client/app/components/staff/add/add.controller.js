export default class AddController {
  constructor($scope,$http,staffnewSvc,templateSvc,$q) {
    "ngInject";
    //var vm = this;
   this.name = 'add';
    this.staffnewSvc=staffnewSvc;
    this.templateSvc = templateSvc;
    this.q = $q;

    
    $scope.ststoreNamemodel="";
    
  	$scope.storeName = [{ id: 1, name: '北京' }, { id: 2, name: '上海' }, { id: 3, name: '广州' }];
    // console.log(staffnewSvc);
  	this.users = {
  	    name: '',
  	    employee_id:'',
  	    contact: '',
  	    storeId:"",
  	    storeName:"",
  	    rtx:"",
     // storeId:'12', //门店Id
     // storeName: '111', //门店名称
     // email: '1qqq@qq.component',
   //  rtx: '123', //即时通讯账号
      role_ids: [], //模板ID
    //  templateName: '模板名称', //模板名称
      password: '', //密码
      con_password: ''//确认密码
    };
  }  

	
 	/**
	   * [create 提交]
	   */
	createuser(){
      var users = this.users,
        tip = '保存成功';
        console.log(users);
    this.staffnewSvc.createuser(users)
    .then(data => {
      //alert(tip);
      this.cancel();
    });
	  }

    //获取模板名称
  getTemplateList(temlateName){
    let deferred = this.q.defer();
    let templateList = this.templateSvc.getPageTempbyname(temlateName).then((result)=>{
      return result.datas;
    });
    deferred.resolve(templateList);
    return deferred.promise;
  }

}