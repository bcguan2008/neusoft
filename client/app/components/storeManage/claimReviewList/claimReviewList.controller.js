/**
 * (description)
 *
 * @author yourname
 */

export default class ClaimReviewListController {
    constructor($q, storeSvc, $scope, $http, NgTableParams, $state, templateSvc) {
        "ngInject";
        this.$state = $state;
        this.storeSvc = storeSvc;
        this.q = $q;
        this.NgTableParams = NgTableParams;
        this.d = {};
        this.templateSvc = templateSvc;
        this.init();
        this.filter = {
            limit: 10,
            offset: 0
        };

    }

    // 格式化后的数据
    getSearchFormData() {
        let filter = this.filter;
        return filter;
    }

    init() {
        var self = this;
        var _this = this;
        var filter = this.filter;
        this.tableParams = new this.NgTableParams({
            page: 1,
            offset: 0
            // count: 10 //每页几条
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
                            console.log(result);
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

    search() {
        this.submitting = true;
        // this.tableParams.parameters({page: 1}).reload();
        this.storeSvc.getStoreInfoList();
    }

    reset() {
        this.searchOptions = {
            publisherSubject: '-1',
            status: '-1'
        }
    }

    goClaimReviewDetail(id) {
        this.$state.go('storeMclaimreviewdetail', {id: id});
    }

    /**
     * [downloadExcel 导出模板]
     */
    exportExcel() {
        this.storeSvc.exportExcellist();
    }
}