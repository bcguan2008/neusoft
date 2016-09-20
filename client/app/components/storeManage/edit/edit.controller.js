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
        this.storeIntrLen = 0;
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
        let tipsCount = this.validate();

        if (tipsCount == null) {
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

    // 验证必填项(缺上传图片的验证)
    validate() {
        let tipsCount = 0;
        var storeName = $("#storeName").val(),
            storeIntr = $("#storeIntr").val(),
            brand = $("#brand").val(),
            province = $("#province").val(),
            city = $("#city").val(),
            county = $("#county").val(),
            address = $("#address").val(),
            phone = $("#phone").val();

        if (storeName.length == 0) {
            this.nameTips = true;
            tipsCount++;
        }

        if (storeIntr.length < 40) {
            this.intrTips = true;
            tipsCount++;
        }

        if (brand.length == 0) {
            this.brandTips = true;
            tipsCount++;
        }

        if (province.length == 0) {
            this.provinceTips = true;
            tipsCount++;
        }

        if (city.length == 0) {
            this.cityTips = true;
            tipsCount++;
        }

        if (county.length == 0) {
            this.countyTips = true;
            tipsCount++;
        }

        if (address.length == 0) {
            this.addressTips = true;
            tipsCount++;
        }

        if (phone.length == 0) {
            this.phoneTips = true;
            tipsCount++;
        }

        if (tipsCount > 0) {
            return tipsCount;
        }
        return null;
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