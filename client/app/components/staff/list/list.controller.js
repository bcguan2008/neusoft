/**
 * (description)
 * 
 * @author yourname
 */

export default class ListController {
  constructor($scope, $http, staffnewSvc, NgTableParams, $state, templateSvc, $q, $window
    , $httpParamSerializer,commonSvc) {
     "ngInject";
    //var vm = this;
    //  this.name = 'list';
    this.$state = $state;
    this.window = $window;
    this.staffnewSvc = staffnewSvc;
    this.NgTableParams = NgTableParams;
    this.$scope = $scope;
    this.templateSvc = templateSvc;
    this.httpParamSerializer = $httpParamSerializer;
    this.commonSvc = commonSvc;
    this.q = $q;
    this.d = {};
    this.storelist = {};
    this.nowRow = null;
    this.status_1 =null;
    this.init();
    // 员工状态

    this.staffstatus = [{ id: 1, name: '正常' }, { id: 4, name: '异常' }, { id: 3, name: '冻结' }];
    this.filter = {
      name: '',
      offset: 0
    };
    this.selectObj = {
      status_name: ''
    };
  }

  searchbystaff() {
    this.staffnewSvc.getstaffpage()
  }
 

  //修改员工状态
  changeStatus() {
    this.staffnewSvc.changeStatus()
  }
  /**
  * 获取格式化后的数据
  */
  getSearchFormData() {
    let filter  = {
      name:this.filter.name,
      contact:this.filter.contact,
    }
    if(this.filter.store && this.filter.store.organization_id){
      filter.storeId = this.filter.store.organization_id;
    }

    if(this.filter.template != undefined){
      filter.templateName = this.filter.template.name;
    }

    let selectObj = this.selectObj;
    
    if (selectObj.status != undefined) {
      filter.status = selectObj.status.id;
    }
    
    return filter;
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
  //获取门店list
  getStorelist() {
    let deferred = this.q.defer();
    let storeList = this.commonSvc.getStoreInfoList().then((result) => {
      return result.datas;
    });
    deferred.resolve(storeList);
    return deferred.promise;
  }

  /**
   * [init 初始化]
   */
  init() {
    let self = this;
    this.getStorelist().then(result=>{
      this.storelist = result;
      this.storelist.forEach(store=>{
        if(store.organization_id == self.$state.params.id ){
          self.filter.store = store;
        }
      });
    }).then(()=>{
      this.tableParams = new this.NgTableParams({
        page: 1,
        count: 10
      }, {
          getData: function ($defer, params) {
            let paramsUrl = params.url();
            self.loading = true;
            let formData = self.getSearchFormData();//filter

          // formData.offset = (paramsUrl.page - 1) * paramsUrl.count;
            formData.offset = paramsUrl.page;
            formData.limit = paramsUrl.count;
            // formData.page = params.url().page;
            // formData.offset = params.url().page;

            self.loadPromise = self.staffnewSvc.getPageUserList(formData);
            return self.loadPromise
              .then(result => {
                self.loading = false;
                if (result) {
                  self.d = {
                    totalCount: result.totalCount
                  }
                  params.total(result.totalCount);
                  return result.datas;
                }
              });
          }
        });
    })
  }

  search() {
    this.tableParams.parameters({ page: 1 }).reload();
  }

  /**
   * 获取员工详情
   */
  detail(id) {
    this.$state.go('staffdetail', { id: id });
  }

  //跳转到新增员工
  getstaffpageadd() {
    this.staffnewSvc.getstaffpage()

  }
  edit(id) {
    //this.staffnewSvc.updatestaff()
    this.$state.go('staffedit', { id: id });
  }

  //更新员工状态
  changeStatus() {
    //debugger;
    this.staffnewSvc.changeStatus({ 
      id: this.nowRow.uid, 
      status: this.nowRow.status == '正常' ? 3 : 1 
      }).then(success => {
      //this.$modalInstance.close()
     
      alert("修改成功")
      $('#myModal').modal('hide');
      this.init();
    })
  }
  //传值给 冻结 窗口
  editInfo(a, b) {
    this.nowRow = b;
  }
  /**
   * [downloadExcel 导出模板]
   */
  exportExcel(){
   // debugger;
    let formData = this.getSearchFormData();
        formData.page = this.tableParams.page(); 
        formData.limit = this.tableParams.data.length;
    this.window.open('/Staffmgt/Employee/stafflist?format=excel&'+ this.httpParamSerializer(formData), '_blank');

  }
}