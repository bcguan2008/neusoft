/**
 * (description)
 *
 * @author yourname
 */

export default class AddController {
    constructor(Api, $http, storeSvc, $state, uploadSvc, storeManageSvc) {
        "ngInject";
        this.name = 'add';
        this.storeSvc = storeSvc;
        this.api = Api;
        this.$state = $state;
        this.uploadSvc = uploadSvc;
        this.storeManageSvc = storeManageSvc;
        this.d = {};
        this.init();
        this.getProvince();
        this.storeIntrTips = 1000;
        this.storeIntrLen = 0;
    }

    init() {
        // var _this = this;
        // this.api.get('/Organization/detail', {id: this.$state.params.id}).then(res=> {
        //     _this.loading = false;
        //     _this.d = res.datas;
        // })
    }

    // 城市选择
    getProvince() {
        this.storeManageSvc.getProvinceList()
            .then(res=>{
                this.provinceList = res;
            })
    }

    getCity(provinceId) {
        this.storeManageSvc.getCityList(provinceId)
            .then(res=>{
                this.cityList = res;
            })
    }

    getRegion(cityId) {
        this.storeManageSvc.getRegionList(cityId)
            .then(res=>{
                this.regionList = res;
            })
    }

    showBrandList() {
        this.isBrandListShow = true;
    }

    hideBrandList() {
        this.isBrandListShow = false;
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
    
    // test 上传图片
    uploadFile(file, errFile) {
        let errInfo = this.catchErrFileError(errFile);
        if (errInfo && errInfo['data']) {
            this.uploadErrorMsg = errInfo['msg'];
            return;
        }

        if (file) {
            let options = {
                file: file
            };

            // this.uploadSvc.upload(options).then(data=> {
                this.logoSrc = 'http://img1.ffan.com/orig/T1UEJTBmxT1RCvBVdK';
                this.showStoreLogo = true;
                this.showDeleteBtn = true;
            // });
        }
    }

    catchErrFileError(errFile) {
        //本身错误信息
        let errInfo = {
            data: false,
            msg: ''
        };
        if (errFile && errFile.length > 0) {
            switch (errFile[0]['$error']) {
                case 'pattern':
                    errInfo = {
                        data: true,
                        msg: '上传文件类型错误'
                    };
                    break;
                case 'maxSize':
                    errInfo = {
                        data: true,
                        msg: '上传文件最大的值为5M'
                    };
                    break;
                default:
                    break;
            }
            return errInfo;
        }
    }

    // test 删除图片
    deleteFile() {
        this.showStoreLogo = false;
        this.logoSrc = '';
        this.showDeleteBtn = false;
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

    // 提交
    save() {
        this.submitting = true;
        let tipsCount = this.validate();

        if (tipsCount == null) {
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
    }

    // 验证必填项（缺图片）
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
}