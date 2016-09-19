/**
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
        this.storeIntrTips = 1000;
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
        if (this.checkInput()) {
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
                this.$state.go('storeMdetail', {id: id});
            }, err=> {
                alert('提交错误')
            })
        }
    }

    //test 检查必填项(缺上传图片的验证)
    checkInput() {
        var name = $("#name").val(),
            storeIntr = $("#storeIntr").val(),
            brand = $("#brand").val(),
            province = $("#province").val(),
            city = $("#city").val(),
            county = $("#county").val(),
            address = $("#address").val(),
            phone = $("#phone").val();
        
        if (name.length == 0) {
            this.nameTips = true;
            return false;
        }
        else if (storeIntr.length < 40) {
            this.intrTips = true;
            return false;
        }
        else if (brand.length == 0) {
            this.brandTips = true;
            return false;
        }
        else if (province.length == 0) {
            this.provinceTips = true;
            return false;
        }
        else if (city.length == 0) {
            this.cityTips = true;
            return false;
        }
        else if (county.length == 0) {
            this.countyTips = true;
            return false;
        }
        else if (address.length == 0) {
            this.addressTips = true;
            return false;
        }
        else if (phone.length == 0) {
            this.phoneTips = true;
            return false;
        }
        else {
            return true;
        }
    }
    
    //test 输入必填项
    changeInput() {
        this.nameTips = false;
    }

    goClaimList(){
        this.$state.go('storeMclaimlist');
    }

    back() {
        this.$state.go('storeMlist');
    }

    showBrandPopup() {
        this.isAddBrandShow = true;
    }

    hideBrandPopup() {
        this.isAddBrandShow = false;
    }

    // 门店简介输入字数限制
    inputStoreIntr() {
        var len = 0;
        for (var i=0,round=0; i<this.storeIntr.length; i++,round++) {
            var a = this.storeIntr.charAt(i);
            if (a.match(/[^\x00-\xff]/ig)!=null) {
                len += 2;
            }else {
                len += 1;
            }

            if (len >= 1000) {
                this.storeIntr = this.storeIntr.substr(0, round+1);
            }
        }

        this.storeIntrTips = 1000 - len;
        this.storeIntrLen = len;
    }
}