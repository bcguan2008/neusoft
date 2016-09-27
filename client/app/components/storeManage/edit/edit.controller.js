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
        // this.storeIntrTips = 1000;
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

            this.inputLength('storeIntr', res.storeDesc, 1000);
        });
    }

    // 输入字数限制
    inputLength(inputId, inputText, maxLength) {
        var len = 0;
        for (var i=0,round=0; i<inputText.length; i++,round++) {
            var a = inputText.charAt(i);
            if (a.match(/[^\x00-\xff]/ig)!=null) {
                len += 2;
            }else {
                len += 1;
            }

            if (len >= maxLength) {
                inputText = inputText.substr(0, round+1);
            }
        }

        if (inputId == "storeName") {
            this.d.storeName = inputText;
            this.storeNameLen = len;
        }

        if (inputId == "storeEnglishName") {
            this.d.storeEnglishName = inputText;
            this.storeENameLen = len;
        }

        if (inputId == "storeEnglishInitials") {
            this.d.storeEnglishInitials = inputText;
            this.storeEInitialsLen = len;
        }

        if (inputId == "storeIntr") {
            this.storeIntr = inputText;
            this.storeIntrTips = maxLength - len;
            this.storeIntrLen = len;
        }

        if (inputId == "storePhone") {
            this.d.storePhone = inputText;
            this.storePhoneLen = len;
        }

        if (inputId == "storeFloor") {
            this.d.storeFloor = inputText;
            this.storeFloorLen = len;
        }

        if (inputId == "storeBunkNo") {
            this.d.storeBunkNo = inputText;
            this.storeBunkNoLen = len;
        }
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
            var brandId = parseInt(checkbox[i].name);
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

    // 验证电话号码
    checkPhone(phone) {
        var pattern=/(^[0-9]{3,4}\-[0-9]{3,8}$)|(^[0-9]{3,8}$)|(^\([0-9]{3,4}\)[0-9]{3,8}$)|(^0{0}1[0-9]{10}$)/;
        if (pattern.test(phone)) {
            this.showCheckTips = false;
        }else {
            this.showCheckTips = true;
        }
    }

    // 提交
    save(id) {
        let tipsCount = this.validate();

        if (tipsCount == null) {
            var brandIds = this.brandIdArr;

            var params = {
                storeId: id,
                storeName: this.d.storeName,
                storeEnglishName: this.d.storeEnglishName,
                storeEnglishInitials: this.d.storeEnglishInitials,
                storeDesc: this.storeIntr,
                brandIds: brandIds.join(),
                storePhone: this.d.storePhone,
                storeFloor: this.d.storeFloor,
                storeBunkNo: this.d.storeBunkNo,
                supportWifi: this.d.supportWifi,
                storePicsrc: this.storePicsrc,
                bgPic: this.bgPic
            };

            this.storeManageSvc.updateStore(params)
                .then(res=>{
                    alert('提交成功');
                    // this.$state.go('storeMdetail', {id: id});
                }, err=>{
                    alert('提交错误');
                })
        }
    }

    // 验证必填项
    validate() {
        let tipsCount = 0;
        var storeName = $("#storeName").val(),
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
        if (this.d.storeName != "" && this.nameTips == true) {
            this.nameTips = false;
        }

        if (this.storeIntr != "" && this.intrTips == true) {
            this.intrTips = false;
        }

        this.getBrandIds();
        if (this.brandIdArr == "" && this.brandTips == true) {
            this.brandTips = false;
        }

        if (this.d.storePhone != "" && this.phoneTips == true) {
            this.phoneTips = false;
        }

        if (this.showStoreLogo == true && this.storePicTips == true) {
            this.storePicTips = false;
        }

        if (this.showBgPic == true && this.bgPicTips == true) {
            this.bgPicTips = false;
        }
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
}