/**
 * (description)
 *
 * @author yourname
 */

export default class ListController {
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
            offset: 0,
            count: 10 //每页几条
        }, {
            // counts: [],
            getData: function (params) {
                self.loading = true;
                let formData = self.getSearchFormData(filter);//filter

                formData.page = params.url().page;
                formData.offset = params.url().page;

                self.loadPromise = self.storeSvc.getStoreInfoList(formData);
                // self.loadPromise = self.templateSvc.getPageAllTempList(formData);
                return self.loadPromise
                    .then(result => {
                        self.loading = false;
                        if (result) {
                            console.log(result);
                            _this.d = {
                                totalCount: result.totalCount
                            };
                            params.total(result.totalCount);
                            return result.datas;
                        }
                    });
            }
        })
    }

    // 二维码
    showQrcode() {
        this.isQrcodeShow = true;
    }

    hideQrcode() {
        this.isQrcodeShow = false;
    }

    goClaimList(){
        this.$state.go('storeMclaimlist');
    }

    search() {
        this.storeSvc.getStoreInfoList();
    }

    detail(id) {
        this.$state.go('storeMdetail', {id: id});
    }

    edit(id) {
        this.$state.go('storeMedit', {id: id});
    }

    getstaffpageadd() {
        this.staffnewSvc.getstaffpage()
    }

    goStaff(storeid) {
        this.$state.go('stafflist', {storeid: storeid});
    }

    /**
     * [downloadExcel 导出模板]
     */
    exportExcel() {
        this.storeSvc.exportExcellist()
    }

    //test 二维码打印
    loada(src) {
        $(".ng-isolate-scope").hide();
        var imgHtml = '<img src="http://img4.ffan.com/T13CDTB4K_1RCvBVdK" id="printImg" style="height: 100%;">';
        $("body").append(imgHtml);

        if ((window.print())==true) {
            $("#printImg").remove();
            $(".ng-isolate-scope").show();
        }else {
            $("#printImg").remove();
            $(".ng-isolate-scope").show();
        }
    }
}