﻿/**
 * (description)
 *
 * @author yourname
 */

export default class EditController {
    constructor(Api, $http, storeSvc, $state) {
        "ngInject";
        this.name = 'edit';
        this.storeSvc = storeSvc;
        this.api = Api;
        this.$state = $state;
        this.d = {};
        this.init();
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

    save(id) {
        var _this = this;
        //debugger;
        this.d.role_ids = [];
        //forEach报错
        // this.roles.forEach(function (item) {
        //     _this.d.role_ids.push(item.id)
        // });
        this.api.post('/Organization/inputAjax', {
            organization_id: this.d.organization_id,
            name: this.d.name,
            contact: this.d.contact,
            principal: this.d.principal,
            remark: this.d.remark,
            role_info: this.d.role_info

        }).then(res=> {
            alert('提交成功');
            this.$state.go('storedetail', {id: id});
        }, err=> {
            alert('提交错误')
        })

    }

    goClaimList(){
        this.$state.go('storeMclaimlist');
    }

    back() {
        this.$state.go('storeMlist');
    }
}