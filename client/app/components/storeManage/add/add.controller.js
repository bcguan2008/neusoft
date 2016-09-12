/**
 * (description)
 *
 * @author yourname
 */

export default class AddController {
    constructor(Api, $http, storeSvc, $state) {
        "ngInject";
        this.name = 'add';
        this.storeSvc = storeSvc;
        this.api = Api;
        this.$state = $state;
        this.d = {}
        this.init();

    }

    init() {
        var _this = this;
        this.api.get('/Organization/detail', {id: this.$state.params.id}).then(res=> {
            _this.loading = false;
            _this.d = res.datas;
        })
    }

    save() {
        var _this = this;
        //debugger;
        this.api.post('/Organization/inputAjax', {
            organization_id: this.d.organization_id,
            name: this.d.name,
            contact: this.d.contact,
            principal: this.d.principal,
            remark: this.d.remark
        }).then(res=> {
            alert('提交成功')
        }, err=> {
            alert('提交错误')
        })
    }

    goList() {
        this.$state.go('storeMlist');
    }

    back() {
        this.$state.go('storeMclaimlist');
    }
}