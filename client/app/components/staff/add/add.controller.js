export default class AddController {
  constructor($scope,$http,staffnewSvc,templateSvc,$q,storeSvc) {
    "ngInject";
    //var vm = this;
   
   this.name = 'add';
    this.staffnewSvc=staffnewSvc;
    this.templateSvc = templateSvc;
    this.storeSvc = storeSvc;
    this.scope = $scope;
    this.q = $q;
    this.d={};
    this.getTempList();
    this.gettemp={
      role_ids:'',
      role_info:''
    }
    this.options={
         storeId:'',
        storeName:''
    }
    this.selectSr={
        status:''
    }
    this.selectSex={
        sex:''
    }
  	this.users = {
  	    name: '',
  	    contact: '',
  	    rtx:'',//即时通讯账号
        storeId:'', //门店Id
        storeName: '', //门店名称
     // email: '1qqq@qq.component',
      role_ids: '', //模板ID
      templateName:'', // '模板名称', //模板名称
      password: '', //密码
      con_password: '',//确认密码
      gender:'', //性别
      status_id:''//状态
    };
    // 员工状态
    this.staffstatus = [{ id: 3, name: '冻结' }, { id: 1, name: '恢复' }];
    //性别
     this.sex = [{ id: 1, name: '男' }, { id: 3, name: '女' }];
  }  

	
 	/**
	   * [create 提交]
	   */
	createuser(){
      var users = this.users,
        options = this.options,
        gettemp = this.gettemp,
        selectSr = this.selectSr,
        selectSex = this.selectSex

        users.storename = options.store.name;
        users.storeId = options.store.organization_id;
        //users.role_ids =gettemp.role_ids;
        users.role_ids =gettemp.role_ids;
        users.role_info = gettemp.role_info;
        // console.log(selectSr.status.name) 
        // console.log(selectSex.sex.name)
        users.status_id = selectSr.status.id;
        users.gender = selectSex.sex.name;
        console.log(users)
        this.staffnewSvc.createuser(users)
          .then(data => {
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

  //获取功能模板 check 多选
  getTempList(){
      this.templateSvc.getPageAllTempList().then((result)=>{
      this.scope.datas= result.datas; 
    });
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

//判断checked 被选中
  updateSelection($event, id,name){
  var gettemp = this.gettemp
  var checkbox = $event.target;
  var action = (checkbox.checked?'add':'remove');
  //如果action 是add 则添加，要是remove 就是删除
  if (action=="add"){
    if( gettemp.role_ids==""){
      gettemp.role_ids=id; 
      gettemp.role_info=name; 
     }else{
         gettemp.role_ids=gettemp.role_ids+","+id;
         gettemp.role_info= gettemp.role_info+","+name;
     }
    }
    else{
       // 取消选中，则删除当前的id和template name
       var temp_name = gettemp.role_info.split(',')
        var words = gettemp.role_ids.split(',')
         for(var i=0;i<words.length;i++) 
         {
        
            if(words[i]==id)
            {
               words.splice(i,1);
               temp_name.splice(i,1);
            }
         }
         gettemp.role_ids= words.join(",")
         gettemp.role_info = temp_name.join(",")
    }

     console.log(gettemp.role_ids);
  }

}