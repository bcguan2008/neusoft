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
    }

    init() {
        var self = this;
        this.tableParams = new this.NgTableParams({
            count: 100
        }, {
            counts: [],
            getData: function (params) {
                self.loadPromise = self.storeSvc.getStoreInfoList(params);
                return self.loadPromise
                    .then(result => {
                        self.loading = false;
                        if (result) {
                            params.total(1);
                            return result
                        }
                    });
            }
        })
    }

    goList() {
        this.$state.go('storeMlist');
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
}