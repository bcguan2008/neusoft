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
        this.storeInfo = {};
        this.init();
        this.getProvince();
        this.storeIntrTips = 1000;
        this.storeIntrLen = 0;
    }

    init() {
        // var _this = this;
        // this.api.get('/Organization/detail', {id: this.$state.params.id}).then(res=> {
        //     _this.loading = false;
        //     _this.storeInfo = res.datas;
        // })
    }

    // 门店简介输入字数限制
    inputStoreIntr() {
        var len = 0;
        for (var i=0,round=0; i<this.storeInfo.storeIntr.length; i++,round++) {
            var a = this.storeInfo.storeIntr.charAt(i);
            if (a.match(/[^\x00-\xff]/ig)!=null) {
                len += 2;
            }else {
                len += 1;
            }

            if (len >= 1000) {
                this.storeInfo.storeIntr = this.storeInfo.storeIntr.substr(0, round+1);
            }
        }

        this.storeIntrTips = 1000 - len;
        this.storeIntrLen = len;
    }

    // 添加品牌弹窗
    showBrandPopup() {
        this.isAddBrandShow = true;

        this.searchBrandList("");
    }

    // 输入查询条件
    changeSearchName(name) {
        let self = this;
        clearTimeout(self.myTimeout);
        this.myTimeout = setTimeout(function () {
            self.searchBrandList(name);
        }, 1000);
    }

    // 调用经营品牌列表接口
    searchBrandList(name) {
        var _this = this;
        this.storeManageSvc.getBrandList(name)
            .then(result=>{
                _this.brandList = result.datas;
            });
    }

    // 经营品牌 保存，显示到已添加中
    addBrand() {
        var checkbox = $("#selectBrand input:checked"),
            addCount = checkbox.length;

        for (var i=0; i<addCount; i++) {
            var brandId = parseInt(checkbox[i].id);
            this.brands.push(
                {
                    brandId: brandId,
                    brandName: $(checkbox[i]).val()
                }
            )
        }

        var n = [];
        for (var i=0; i<this.brands.length; i++) {
            if (n.indexOf(this.brands[i].brandId) == -1) {
                n.push(this.brands[i].brandId);
            }else {
                this.brands.splice(i, 1);
            }
        }

        this.hideBrandPopup();
        this.changeRequired();
    }

    hideBrandPopup() {
        this.isAddBrandShow = false;
    }

    // 删除经营品牌
    deleteBrand(i) {
        this.brands.splice(i,1);
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


    hidePopupList() {
        this.isPopupListShow = false;
    }

    goList() {
        this.$state.go('storeMlist');
    }

    back() {
        this.$state.go('storeMclaimlist');
    }

    // test 上传logo图片
    uploadLogo(file, errFile) {
        let errInfo = this.catchErrFileError(errFile);
        if (errInfo && errInfo['data']) {
            this.uploadErrorMsg = errInfo['msg'];
            return;
        }

        if (file) {
            let options = {
                file: file
            };

            // this.uploadSvc.upload(options, url).then(data=> {
            this.storePicsrc = 'T1UEJTBmxT1RCvBVdK';
            this.showStoreLogo = true;
            this.showLogoDeleteBtn = true;

            this.changeRequired();
            // });
        }
    }

    //test 上传背景图片
    uploadBg(file, errFile) {
        let errInfo = this.catchErrFileError(errFile);
        if (errInfo && errInfo['data']) {
            this.uploadErrorMsg = errInfo['msg'];
            return;
        }

        if (file) {
            let option = {
                file: file
            };

            this.uploadSvc.upload(options, url).then(data=>{
                this.bgPic = 'T1UEJTBmxT1RCvBVdK';
                this.showBgPic = true;
                this.showBgDeleteBtn = true;

                this.changeRequired();
            });
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
    deleteLogo() {
        this.showStoreLogo = false;
        this.storePicsrc = "";
        this.showLogoDeleteBtn = false;
    }

    deleteBg() {
        this.showBgPic = false;
        this.bgPic = "";
        this.showBgDeleteBtn = false;
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

    // 验证必填项
    validate() {
        let tipsCount = 0;
        var storeName = $("#storeName").val(),
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

        if (this.storeIntrLen < 40) {
            this.intrTips = true;
            tipsCount++;
        }

        this.getBrandIds();
        if (this.brandIdArr == "") {
            this.brandTips = true;
            tipsCount++;
        }

        if (province == null) {
            this.provinceTips = true;
            tipsCount++;
        }

        if (city == null) {
            this.cityTips = true;
            tipsCount++;
        }

        if (county == null) {
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

        if (this.showStoreLogo == false || this.showStoreLogo == undefined) {
            this.storePicTips = true;
            tipsCount++;
        }

        if (this.showBgPic == false || this.showBgPic == undefined) {
            this.bgPicTips = true;
            tipsCount++;
        }

        if (tipsCount > 0) {
            return tipsCount;
        }
        return null;
    }

    // 获取该门店经营品牌
    getBrandIds() {
        var count = $("#brandIds tr").length,
            brandIdArr = [];

        for (var i=0; i<count; i++) {
            var id = $("#brandIds tr")[i].id;
            brandIdArr.push(id);
        }

        this.brandIdArr = brandIdArr;
    }

    // 输入必填项
    changeRequired() {
        var province = $("#province").val(),
            city = $("#city").val(),
            county = $("#county").val();

        if (this.storeInfo.storeName != "" && this.storeInfo.storeName != undefined && this.nameTips == true) {
            this.nameTips = false;
        }

        if (this.storeInfo.storeIntr != "" && this.storeInfo.storeIntr != undefined && this.intrTips == true) {
            this.intrTips = false;
        }

        this.getBrandIds();
        if (this.brandIdArr == "" && this.brandTips == true) {
            this.brandTips = false;
        }

        if (province != null && this.provinceTips == true) {
            this.provinceTips = false;
        }

        if (city != null && this.cityTips == true) {
            this.cityTips = false;
        }

        if (county != null && this.countyTips == true) {
            this.countyTips = false;
        }

        if (this.storeInfo.storeAddress != "" && this.storeInfo.storeAddress != undefined && this.addressTips == true) {
            this.addressTips = false;
        }

        if (this.storeInfo.storePhone != "" && this.storeInfo.storePhone != undefined && this.phoneTips == true) {
            this.phoneTips = false;
        }

        if (this.showStoreLogo == true && this.storePicTips == true) {
            this.storePicTips = false;
        }

        if (this.showBgPic == true && this.bgPicTips == true) {
            this.bgPicTips = false;
        }
    }
}