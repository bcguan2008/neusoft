/**
 * (description)
 *
 * @author yourname
 */

export default class ListController {
    constructor($q, storeSvc, $scope, $http, NgTableParams, $state, templateSvc, storeManageSvc, Api) {
        "ngInject";
        this.$state = $state;
        this.storeSvc = storeSvc;
        this.q = $q;
        this.NgTableParams = NgTableParams;
        this.d = {};
        this.templateSvc = templateSvc;
        this.storeManageSvc = storeManageSvc;
        this.api = Api;
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
            count: 10
        }, {
            getData: function (params) {
                self.loading = true;
                let formData = self.getSearchFormData(filter);

                formData.page = params.url().page;
                formData.offset = (params.url().page-1) * params.url().count;

                self.loadPromise = self.storeManageSvc.getStoreList(formData);
                return self.loadPromise
                    .then(result => {
                        self.loading = false;
                        if (result.datas) {
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
    showQrcode(storeId) {
        let self = this;
        this.api.get('/storemanage/store/code', {storeId: storeId})
            .then(result => {
                console.log(result);
                this.qrCodeUrl = result.qrCodeImgUrl;
            });
        this.singleStoreId = storeId;

        this.isQrcodeShow = true;
    }

    hideQrcode() {
        this.isQrcodeShow = false;
    }

    // 二维码打印
    printQrcode() {
        $(".ng-isolate-scope").hide();
        var imgHtml = '<img src="' +this.qrCodeUrl+ '" id="printImg" style="height: 100%;">';
        $("body").append(imgHtml);

        if ((window.print())==true) {
            $("#printImg").remove();
            $(".ng-isolate-scope").show();
        }else {
            $("#printImg").remove();
            $(".ng-isolate-scope").show();
        }
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

    // 导出 参数
    getDownloadParams() {
        var limit = $("#page .active span").html();
        var page = $("#page ul li.active a span").html();

        if (page == undefined) {
            page = 1;
        }

        limit = parseInt(limit);
        page = parseInt(page);
        var offset = (page-1)*limit;

        var params = {
            limit: limit,
            offset: offset
        }

        return params;
    }

    // 批量导出二维码
    batchDownQrcode() {
        var params = this.getDownloadParams();
        this.batchDownQrcodeUrl = "/storemanage/store/codeBatchDown?offset=" +params.offset+ "&limit=" +params.limit;
    }

    // 导出Excel
    exportExcel() {
        var params = this.getDownloadParams();
        this.exportExcelUrl = "/storemanage/store/excel?offset=" +params.offset+ "&limit=" +params.limit;
    }
}