/**
 * (description)
 * 
 * @author yourname
 */

export default class ListController {
    constructor($q, storeSvc, $scope, $http, NgTableParams, $state) {
        "ngInject";
        this.$state = $state
        this.storeSvc = storeSvc;
        this.q = $q;
        this.NgTableParams = NgTableParams;
        this.init();
    }
    init() {
        var self = this;
        this.tableParams = new this.NgTableParams({
            page: 1,
            count: 10 //每页几条
        }, {
                counts: [],
                getData: function (params) {
                    self.loadPromise = self.storeSvc.getStoreInfoList(params);
                    return self.loadPromise
                        .then(result => {
                            self.loading = false;
                            if (result.datas) {
                                console.log(result)
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
   * [downloadExcel 导出模板]
   */
  exportExcel(){
        this.storeSvc.exportExcellist()
  }
}