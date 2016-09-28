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
            };

    }
<<<<<<< HEAD
         /**
   * 格式化后的数据
   */ 
=======
>>>>>>> master
  getSearchFormData(){ 
    let filter = this.filter
    return filter;
  }

    init() {
        var self = this;
        var _this = this;
        var filter = this.filter;
<<<<<<< HEAD
        this.tableParams = new this.NgTableParams({
            page: 1,
            offset:0 
            //count: 10 //每页几条
        }, {
               // counts: [],
                getData: function (params) {
                    let formData = self.getSearchFormData(filter);//filter
                    formData.page = params.url().page;
                    formData.offset = params.url().page;
                   self.loadPromise = self.storeSvc.getStoreInfoList(params);
                   // self.loadPromise = self.templateSvc.getPageAllTempList(formData);
                    return self.loadPromise
                        .then(result => {
                            self.loading = false;
                            if (result.datas) {
                                console.log(result)
                                  _this.d={
                                         totalCount:result.totalCount
                                         }
                                params.total(result.totalCount);
                                return result.datas
                            }
                        });
                }
=======
       

        self.loadPromise = self.storeSvc.getStoreAllList({
             limit: 999999
>>>>>>> master
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
        this.staffnewSvc.getstafflist(storeid);
    }
<<<<<<< HEAD
/**
   * [downloadExcel 导出模板]
   */
=======

>>>>>>> master
  exportExcel(){
    let formData = this.getSearchFormData();
    this.window.open('/Staffmgt/Organization/storelist?format=excel&'+ this.httpParamSerializer(formData), '_blank');
  }
}