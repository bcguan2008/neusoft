/**
 * (description)
 *
 * @author yourname
 */

export default class EditController {
    constructor(Api, $http, storeSvc, $state, storeManageSvc, uploadSvc) {
        "ngInject";
        this.name = 'edit';
        this.storeSvc = storeSvc;
        this.api = Api;
        this.$state = $state;
        this.storeManageSvc = storeManageSvc;
        this.uploadSvc = uploadSvc;
        this.d = {};
        this.init();
        this.storeIntrTips = 1000;
        this.storeIntrLen = 0;
        this.showStoreLogo = true;
        this.showLogoDeleteBtn = true;
        this.showBgPic = true;
        this.showBgDeleteBtn = true;

        this.myTimeout = null;
    }

    init() {
        let self = this;
        var _this = this;
        self.loading = true;
        self.loadPromise = self.storeManageSvc.getStoreDetail({storeId: this.$state.params.id});
        return self.loadPromise.then(res=> {
            self.loading = false;
            _this.d = res;
            _this.storeIntr = res.storeDesc;
            _this.storePicsrc = res.storePicsrc;
            _this.bgPic = res.bgPic;
            _this.brands = res.brands;

            this.inputStoreIntr();
        });
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
    }

    hideBrandPopup() {
        this.isAddBrandShow = false;
    }

    // 删除经营品牌
    deleteBrand(i) {
        this.brands.splice(i,1);
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

    // 验证必填项
    validate() {
        let tipsCount = 0;
        var storeName = $("#storeName").val(),
            storeIntr = $("#storeIntr").val(),
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

        this.getBrandIds();
        if (this.brandIdArr == "") {
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

        if (this.showStoreLogo == false) {
            this.storePicTips = true;
            tipsCount++;
        }

        if (this.showBgPic == false) {
            this.bgPicTips = true;
            tipsCount++;
        }

        if (tipsCount > 0) {
            return tipsCount;
        }
        return null;
    }

    // 获取经营品牌（提交时用）
    getBrandIds() {
        var count = $("#brandIds tr").length,
            brandIdArr = [];

        for (var i=0; i<count; i++) {
            var id = $("#brandIds tr")[i].id;
            brandIdArr.push(id);
        }

        this.brandIdArr = brandIdArr;
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
}