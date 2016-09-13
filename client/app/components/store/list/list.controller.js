/**
 * (description)
 * 
 * @author yourname
 */

export default class ListController {
    constructor($q, storeSvc, $scope, $http,$httpParamSerializer,NgTableParams, $state,$window,staffnewSvc) {
        "ngInject";
        this.$state = $state
        this.storeSvc = storeSvc;
        this.window = $window;
        this.scope = $scope;
        this.q = $q;
        //this.NgTableParams = NgTableParams;
        this.httpParamSerializer = $httpParamSerializer;
        this.d={};
        this.staffnewSvc = staffnewSvc;
        this.init();
        this.filter = {
            limit: 999999,
          //  offset:0
            };

    }
         /**
   * 获取格式化后的数据
   */ 
  getSearchFormData(){ 
    let filter = this.filter
    return filter;
  }

    init() {
        var self = this;
        var _this = this;
        var filter = this.filter;
         // this.tableParams = new this.NgTableParams({
         //   // page: 1,
         //    //offset:0 
         //    //count: 10 //每页几条
         // }, {
         //        counts: [],
         //        getData: function (params) {
         //            let formData = self.getSearchFormData(filter);//filter
         //            //formData.offset = (params.url().page - 1) * params.url().page;
         //            //formData.limit = params.url().count;                   
         //           self.loadPromise = self.storeSvc.getStoreAllList(formData);
  
         //            return self.loadPromise
         //                .then(result => {
         //                    self.loading = false;
         //                    if (result.datas) {
         //                        console.log(result)
         //                          _this.d={
         //                                 totalCount:result.totalCount
         //                                 }
         //                        params.total(result.totalCount);
         //                        return result.datas
         //                    }
         //                });
         //       }
         //    })

        self.loadPromise = self.storeSvc.getStoreAllList({
             limit: 999999
            })
        self.loadPromise.then((result) => {
          _this.d={
            totalCount:result.totalCount
          }
            this.scope.$data = result.datas;
        });   

         
    }
    search() {
        this.storeSvc.getStoreInfoList();
    }
    detail(id) {
        this.$state.go('storedetail', { id: id });
    }
    edit(id) {
        this.$state.go('storeedit', { id: id });
    }
    getstaffpageadd() {
        this.staffnewSvc.getstaffpage() 
    }
    goStaff(storeid) {
        this.$state.go('stafflist', { storeid: storeid });
    }
/**
   * [downloadExcel 导出模板]
   */
  exportExcel(){
   // debugger;
    let formData = this.getSearchFormData();
    this.window.open('/Staffmgt/Organization/storelist?format=excel&'+ this.httpParamSerializer(formData), '_blank');
  
        //this.storeSvc.exportExcellist()
  }
}