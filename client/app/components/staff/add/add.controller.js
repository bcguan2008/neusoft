export default class AddController {
  constructor($scope,$http,staffnewSvc,templateSvc,$q,storeSvc) {
    "ngInject";
    //var vm = this;
   this.name = 'add';
    this.staffnewSvc=staffnewSvc;
    this.templateSvc = templateSvc;
    this.storeSvc = storeSvc;
    this.q = $q;


    //$scope.ststoreNamemodel="";  
     
  	//$scope.storeName = [{ id: 1, name: '北京' }, { id: 2, name: '上海' }, { id: 3, name: '广州' }];
    // console.log(staffnewSvc);
    this.options={
         storeId:'',
        storeName:''
    }
    this.temp ={
      role_ids:[],
      templateName:''
    }
  	this.users = {
  	    name: '',
  	    contact: '',
  	    rtx:'',
     storeId:'', //门店Id
      storeName: '', //门店名称
     // email: '1qqq@qq.component',
   //  rtx: '123', //即时通讯账号
      role_ids: [], //模板ID
      templateName:[], // '模板名称', //模板名称
      password: '', //密码
      con_password: ''//确认密码
    };
  }  

	
 	/**
	   * [create 提交]
	   */
	createuser(){
      var users = this.users,
        options = this.options,
        temp = this.temp,
        tip = '保存成功';
        //debugger;
       console.log(temp)
        users.storename = options.store.name;
        users.storeId = options.store.organization_id;
        users.templateName = temp.template_name.name;
        users.role_ids =temp.template_name.creatorId;

        //users.storeId = 
        console.log(users)
        this.staffnewSvc.createuser(users)
          .then(data => {
          //alert(tip);
          //跳转到员工list页面
          this.staffnewSvc.getstafflist();
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
  //获取门店list
  getStorelist(storename)
  {
    console.log(storename)
     let deferred = this.q.defer();
    let storeList = this.storeSvc.getstorebyname(storename).then((result)=>{
      console.log(result.datas);
      return result.datas;
    });
    deferred.resolve(storeList);
    return deferred.promise;

     // this.staffnewSvc.getstoreAlllist()
  }

}