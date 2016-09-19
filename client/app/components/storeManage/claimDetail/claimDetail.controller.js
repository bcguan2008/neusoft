/**
 * (description)
 *
 * @author yourname
 */

export default class ClaimDetailController {
    constructor(storeSvc, Api, $http, $state) {
        "ngInject";
        this.name = 'claimDetail';
        this.storeSvc = storeSvc;
        this.api = Api;
        this.$state = $state;
        this.init();
        this.d = {}
    }

    init() {
        let self = this;
        var _this = this;
        self.loading = true;
        self.loadPromise = this.api.get('/Organization/detail', {id: this.$state.params.id})
        return self.loadPromise.then(res=> {
            self.loading = false;
            _this.d = res.datas;

        })
    }

    goList(){
        this.$state.go('storeMlist');
    }

    back() {
        this.$state.go('storeMclaimlist');
    }
}