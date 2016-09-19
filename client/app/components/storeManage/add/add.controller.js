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

    showBrandList() {
        this.isBrandListShow = true;
    }

    hideBrandList() {
        this.isBrandListShow = false;
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
            alert('提交成功');
            // test 保存成功则返回认领门店列表页
            this.goList();
        }, err=> {
            alert('提交错误');
            // test 需判断查重
            this.isPopupListShow = true;
        })
    }

    hidePopupList() {
        this.isPopupListShow = false;
    }

    goList() {
        this.$state.go('storeMlist');
    }

    back() {
        this.$state.go('storeMclaimlist');
    }
}