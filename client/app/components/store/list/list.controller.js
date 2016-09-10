/**
 * (description)
 * 
 * @author yourname
 */

export default class ListController {
    constructor($q, storeSvc, $scope, $http, NgTableParams, $state,templateSvc,$window) {
        "ngInject";
        this.$state = $state
        this.storeSvc = storeSvc;
        this.window = $window;
        this.q = $q;
        this.NgTableParams = NgTableParams;
        this.d={};
        this.templateSvc=templateSvc;
        this.init();
        this.filter = {
            limit: 10,
            offset:0
            };

    }
         /**
   * ��ȡ��ʽ���������
   */ 
  getSearchFormData(){ 
    let filter = this.filter
    return filter;
  }

    init() {
        var self = this;
        var _this = this;
        var filter = this.filter;
        this.tableParams = new this.NgTableParams({
            page: 1,
            offset:0 
            //count: 10 //ÿҳ����
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
            })
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
   * [downloadExcel ����ģ��]
   */
  exportExcel(){
   // debugger;
    let formData = this.getSearchFormData();
        formData.page = this.tableParams.page();
        //return this.Api.get(this.baseUrl+'stafflist?format=excel');  
       
    this.window.open('/Staffmgt/Organization/storelist?format=excel', '_blank');
  
        //this.storeSvc.exportExcellist()
  }
}