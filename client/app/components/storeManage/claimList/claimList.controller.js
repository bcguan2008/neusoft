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

        this.submitting = false;
    }

    init() {
        var self = this;
        var _this = this;
        var filter = this.filter;
        this.tableParams = new this.NgTableParams({
            page: 1,
            count: 10
        }, {
            getData: function (params) {
                self.loading = true;

                let formData = self.getSearchFormData(params.url());

                self.loadPromise = self.storeManageSvc.getClaimList(formData);
                return self.loadPromise
                    .then(result => {
                        self.loading = false;

                        if (result.datas) {
                            _this.storeInfo = {
                                totalCount: result.totalCount
                            };
                            params.total(result.totalCount);
                            self.submitting = false;
                            return result.datas
                        }
                    });
            }
        })
    }

    getSearchFormData(paramsUrl) {
        let params =  this.formatSearchObj();
        params.offset = (paramsUrl.page-1) * paramsUrl.count;
        params.limit = paramsUrl.count;

        return params;
    }

    // 选择所在区域
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

    // 查询
    search() {
        this.submitting = true;

        this.tableParams.parameters({
            page: 1
        }).reload();
    }

    // 格式化检索数据
    formatSearchObj() {
        let params = {};

        let status = parseInt(this.searchOptions.status);
        if (status > -1) {
            params.status = status;
        }

        if (this.searchOptions.storeName) {
            params.storeName = this.searchOptions.storeName;
        }

        if (this.searchOptions.brandName) {
            params.brandName = this.searchOptions.brandName;
        }

        if (this.searchOptions.provinceId) {
            params.provinceId = this.searchOptions.provinceId.provinceId;
        }

        if (this.searchOptions.cityId) {
            params.cityId = this.searchOptions.cityId.cityId;
        }

        if (this.searchOptions.regionId) {
            params.regionId = this.searchOptions.regionId.regionId;
        }

        return params;
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

    goDetail(id) {
        this.$state.go('storeMdetail', {id: id});
    }

    getstaffpageadd() {
        this.staffnewSvc.getstaffpage()
    }

    goStaff(storeid) {
        this.$state.go('stafflist', {storeid: storeid});
    }

    // 导出Excel
    exportExcel() {
        var params = this.formatSearchObj();

        var limit = $("#page .active span").html(),
            page = $("#page ul li.active a span").html();

        if (page == undefined) {
            page = 1;
        }
        page = parseInt(page);

        params.limit = parseInt(limit);
        params.offset = (page-1)*limit;

        var temp = "";
        for(var i in params){
            temp += i+"="+params[i]+"&";
        }
        temp = temp.substr(temp, temp.length-1)

        this.exportExcelUrl = "/storemanage/claim/excel?" + temp;
    }
}