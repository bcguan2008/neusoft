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
    getSearchFormData(){
        let filter = this.filter
        return filter;
    }

    init() {
        var self = this;
        var _this = this;
        var filter = this.filter;


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
        this.staffnewSvc.getstafflist(storeid);
    }

    exportExcel(){
        let formData = this.getSearchFormData();
        this.window.open('/Staffmgt/Organization/storelist?format=excel&'+ this.httpParamSerializer(formData), '_blank');
    }
}