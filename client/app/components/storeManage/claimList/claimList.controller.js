/**
 * (description)
 *
 * @author yourname
 */

export default class ClaimListController {
    constructor($q, storeSvc, $scope, $http, NgTableParams, $state, storeManageSvc) {
        "ngInject";
        this.$state = $state
        this.storeSvc = storeSvc;
        this.q = $q;
        this.NgTableParams = NgTableParams;
        this.storeManageSvc = storeManageSvc;
        this.init();
        this.getProvince();
        this.filter = {
            limit: 10,
            offset: 0
        };
    }

    init() {
        var self = this;
        var _this = this;
        var filter = this.filter;
        this.tableParams = new this.NgTableParams({
            page: 1,
            count: 10
        }, {
            // counts: [],
            getData: function (params) {
                let formData = self.getSearchFormData(filter);
                formData.page = params.url().page;
                formData.offset = params.url().page;

                // self.loadPromise = self.storeSvc.getStoreInfoList(params);
                // return self.loadPromise
                //     .then(result => {
                //         self.loading = false;
                //         if (result.datas) {
                //             _this.d = {
                //                 totalCount: result.totalCount
                //             };
                //             params.total(result.totalCount);
                //             return result.datas
                //         }
                //     });
            }
        })
    }

    getSearchFormData() {
        let filter = this.filter;
        return filter;
    }

    // 城市选择
    getProvince() {
        this.storeManageSvc.getProvinceList()
            .then(res=>{
                this.provinceList = res;
            })
    }

    getCity(provinceId) {
        this.storeManageSvc.getCityList(provinceId)
            .then(res=>{
                this.cityList = res;
            })
    }

    getRegion(cityId) {
        this.storeManageSvc.getRegionList(cityId)
            .then(res=>{
                this.regionList = res;
            })
    }

    reset() {
        this.searchOptions = {
            publisherSubject:'-1',
            status:'-1'
        }
    }

    goList() {
        this.$state.go('storeMlist');
    }

    goAdd() {
        this.$state.go('storeMadd');
    }

    goClaimDetail(id) {
        this.$state.go('storeMclaimdetail', {id: id});
    }

    search() {
        this.storeSvc.getStoreInfoList();
    }

    getstaffpageadd() {
        this.staffnewSvc.getstaffpage()
    }

    goStaff(storeid) {
        this.$state.go('stafflist', {storeid: storeid});
    }

    // 导出Excel
    exportExcel() {
        this.storeSvc.exportExcellist()
    }
}