export default class AddController {
  constructor($scope, $http, staffnewSvc, templateSvc, $q, storeSvc) {
    "ngInject";
    //var vm = this;

    this.name = 'add';
    this.staffnewSvc = staffnewSvc;
    this.templateSvc = templateSvc;
    this.storeSvc = storeSvc;
    this.scope = $scope;
    this.q = $q;
    this.d = {};
    this.gettemp = {
      role_ids: '',
      role_info: ''
    }
    this.options = {
    }

    this.users = {
      name: '',
      contact: '',
      rtx: '',//即时通讯账号
      storeId: '', //门店Id
      storeName: '', //门店名称
      role_ids: '', //模板ID
      templateName: '', // '模板名称', //模板名称
      password: '', //密码
      con_password: '',//确认密码
      gender: '', //性别
      status_id: ''//状态
    };
    this.staffstatus = [{ id: 1, name: '正常' }, { id: 3, name: '冻结' }];
    this.sex = [{ id: 1, name: '男' }, { id: 3, name: '女' }];
    this.selectSr = {
      status: this.staffstatus[0]
    }
    this.selectSex = {
      sex: this.sex[0]
    }
  }

  $onInit() {
    this.getStorelist().then(result => {
      this.storelist = result;
    })
  }


  /**
   * [create 提交]
   */
  createuser() {
    var users = this.users,
      options = this.options,
      gettemp = this.gettemp,
      selectSr = this.selectSr,
      selectSex = this.selectSex
    if (options.store == undefined) {
      alert("请选择门店！")
      return false;
    } else {
      users.storeName = options.store.name;
      users.storeId = options.store.organization_id;
      users.share_id = options.store.share_id;
    }

    users.role_ids = gettemp.role_ids;
    users.role_info = gettemp.role_info;
    users.status_id = selectSr.status.id;
    users.gender = selectSex.sex.name;
    users.im = users.rtx;
    console.log(users.rtx)
    //vm.users.rtx

    if (gettemp.role_ids == "") {
      alert("请选择功能模板")
      return false;
    }
    else if (users.password !== users.con_password){
      alert('两次输入密码不一致')
      return false;
    }

    this.staffnewSvc.createuser(users)
      .then(success => {
        alert("创建成功！")
        //跳转到员工list页面
        this.staffnewSvc.getstafflist();
      });
  }

  //获取模板名称
  getTemplateList(temlateName) {
    let deferred = this.q.defer();
    let templateList = this.templateSvc.getPageTempbyname(temlateName).then((result) => {
      return result.datas;
    });
    deferred.resolve(templateList);
    return deferred.promise;
  }

  //获取功能模板 check 多选
  getTempList(organizationId) {
    let params = {
      limit: 999999,
      status: 0
    }
    if (organizationId > 0) {
      params.organizationId = organizationId;
    }

    this.loadPromise = this.templateSvc.getPageAllTempList(params);
    this.loadPromise.then((result) => {
      this.templateData = result.datas;
    });
  }

  changeStore(store) {
    this.getTempList(store.organizationId);
  }

  getStorelist(storename) {
    let deferred = this.q.defer();
    let storeList = this.storeSvc.getstorebyname(storename).then((result) => {
      return result.datas;
    });
    deferred.resolve(storeList);
    return deferred.promise;
  }


  //判断checked 被选中
  updateSelection($event, id, name) {
    var gettemp = this.gettemp
    var checkbox = $event.target;
    var action = (checkbox.checked ? 'add' : 'remove');
    //如果action 是add 则添加，要是remove 就是删除
    if (action == "add") {
      if (gettemp.role_ids == "") {
        gettemp.role_ids = id;
        gettemp.role_info = name;
      } else {
        gettemp.role_ids = gettemp.role_ids + "," + id;
        gettemp.role_info = gettemp.role_info + "," + name;
      }
    }
    else {
      // 取消选中，则删除当前的id和template name
      var temp_name = gettemp.role_info.split(',')
      var words = gettemp.role_ids.split(',')
      for (var i = 0; i < words.length; i++) {

        if (words[i] == id) {
          words.splice(i, 1);
          temp_name.splice(i, 1);
        }
      }
      gettemp.role_ids = words.join(",")
      gettemp.role_info = temp_name.join(",")
    }

    //console.log(gettemp.role_ids);
  }

}