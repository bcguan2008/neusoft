/**
 * (description)
 *
 * @author yourname
 */

export default class ClaimListController {
    constructor($q, storeSvc, $scope, $http, NgTableParams, $state) {
        "ngInject";
        this.$state = $state
        this.storeSvc = storeSvc;
        this.q = $q;
        this.NgTableParams = NgTableParams;
        this.init();
        this.filter = {
            limit: 10,
            offset: 0
        };

        //test 城市选择
        this.error = {};
        this.list = [];
        let self = this;
        $http.get('../../../mock/list.json').success(function (data) {
            $scope.list = data;
            // self.list = data;
        });
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

                self.loadPromise = self.storeSvc.getStoreInfoList(params);
                return self.loadPromise
                    .then(result => {
                        self.loading = false;
                        if (result.datas) {
                            _this.d = {
                                totalCount: result.totalCount
                            };
                            params.total(result.totalCount);
                            return result.datas
                        }
                    });
            }
        })
    }

    getSearchFormData() {
        let filter = this.filter;
        return filter;
    }

    c() {
        this.error.province = false;
        this.error.city = false;
        this.error.area = false;
        this.selected2 = "";
        this.selected3 = "";
    }

    c2() {
        this.error.city = false;
        this.error.area = false;
        this.selected3 = "";
    }

    c3() {
        this.error.area = false;
    }

    submit() {
        this.error.province = this.selected ? false:true;
        this.error.city = this.selected2 ? false:true;
        this.error.area = this.selected3 ? false:true;
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