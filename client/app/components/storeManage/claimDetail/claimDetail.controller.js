/**
 * (description)
 *
 * @author yourname
 */

export default class ClaimDetailController {
    constructor(storeSvc, Api, $http, $state, storeManageSvc) {
        "ngInject";
        this.name = 'claimDetail';
        this.storeSvc = storeSvc;
        this.api = Api;
        this.$state = $state;
        this.storeManageSvc = storeManageSvc;
        this.init();
        this.d = {}
    }
    
    init() {
        let self = this;
        var _this = this;
        self.loading = true;
        self.loadPromise = self.storeManageSvc.getStoreDetail({storeId: this.$state.params.id});
        return self.loadPromise.then(res=> {
            self.loading = false;
            _this.d = res;

            // 简介字数
            var len = 0;
            for (var i=0,round=0; i<res.storeDesc.length; i++,round++) {
                var a = res.storeDesc.charAt(i);
                if (a.match(/[^\x00-\xff]/ig)!=null) {
                    len += 2;
                }else {
                    len += 1;
                }
            }
            _this.d.descLen = 1000 - len;
        })
    }

    goList(){
        this.$state.go('storeMlist');
    }

    back() {
        this.$state.go('storeMclaimlist');
    }
}