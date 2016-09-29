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
        this.getProvince();
        this.storeIntrTips = 1000;
        this.storeIntrLen = 0;
        this.brands = [];

        this.picId = 'storePic';
        this.bgId = 'storeBg';
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
            this.storeInfo.storeName = inputText;
            this.storeNameLen = len;
        }

        if (inputId == "storeEnglishName") {
            this.storeInfo.storeEnglishName = inputText;
            this.storeENameLen = len;
        }

        if (inputId == "storeEnglishInitials") {
            this.storeInfo.storeEnglishInitials = inputText;
            this.storeEInitialsLen = len;
        }
        
        if (inputId == "storeIntr") {
            this.storeInfo.storeIntr = inputText;
            this.storeIntrTips = maxLength - len;
            this.storeIntrLen = len;
        }

        if (inputId == "storeAddress") {
            this.storeInfo.storeAddress = inputText;
            this.storeAddressLen = len;
        }
        
        if (inputId == "storePhone") {
            this.storeInfo.storePhone = inputText;
            this.storePhoneLen = len;
        }

        if (inputId == "storeFloor") {
            this.storeInfo.storeFloor = inputText;
            this.storeFloorLen = len;
        }

        if (inputId == "storeBunkNo") {
            this.storeInfo.storeBunkNo = inputText;
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

    // 验证电话号码
    checkPhone(phone) {
        var pattern=/(^[0-9]{3,4}\-[0-9]{3,8}$)|(^[0-9]{3,8}$)|(^\([0-9]{3,4}\)[0-9]{3,8}$)|(^0{0}1[0-9]{10}$)/;
        if (pattern.test(phone)) {
            this.showCheckTips = false;
        }else {
            this.showCheckTips = true;
        }
    }

    // 验证楼层输入
    checkFloor(floor) {
        var pattern=/^B[1-9]\d*$|^[1-9]\d*F$/;
        if (pattern.test(floor)) {
            this.showFloorTips = false;
        }else {
            this.showFloorTips = true;
        }
    }

    // 上传logo图片
    uploadLogo(file, errFile, id) {
        let errInfo = this.catchErrFileError(errFile, id);
        if (errInfo && errInfo['data']) {
            this.uploadErrorMsg = errInfo['msg'];
            alert(this.uploadErrorMsg);
            return;
        }

        if (file) {
            if (file.$ngfHeight > 640 || file.$ngfWidth > 640) {
                alert('尺寸要求640*640');
            }else {
                let options = {
                    fileName: file
                };

                this.uploadSvc.upload(options).then(result=> {
                    if (result && result.data) {
                        this.storePicUrl = result.data.url;
                        this.storePicsrc = result.data.name;

                        this.showStoreLogo = true;
                        this.showLogoDeleteBtn = true;

                        this.changeRequired();
                    }
                });
            }
        }
    }

    // 上传背景图片
    uploadBg(file, errFile, id) {
        let errInfo = this.catchErrFileError(errFile, id);
        if (errInfo && errInfo['data']) {
            this.uploadErrorMsg = errInfo['msg'];
            alert(this.uploadErrorMsg);
            return;
        }

        if (file) {
            if (file.$ngfHeight > 540 || file.$ngfWidth > 960) {
                alert('尺寸要求960*540');
            }else {
                let options = {
                    fileName: file
                };

                this.uploadSvc.upload(options).then(result=> {
                    if (result && result.data) {
                        this.bgPicUrl = result.data.url;
                        this.bgPic = result.data.name;

                        this.showBgPic = true;
                        this.showBgDeleteBtn = true;

                        this.changeRequired();
                    }
                });
            }
        }
    }

    catchErrFileError(errFile, id) {
        //本身错误信息
        let errInfo = {
            data: false,
            msg: ''
        };
        if (errFile && errFile.length > 0) {
            let tip;
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
                case 'minHeight':
                    if (id == 'storePic') {
                        tip = "尺寸要求640*640";
                    }
                    if (id == 'storeBg') {
                        tip = "尺寸要求960*540";
                    }
                    errInfo = {
                        data: true,
                        msg: tip
                    };
                    break;
                case 'minWidth':
                    if (id == 'storePic') {
                        tip = "尺寸要求640*640";
                    }
                    if (id == 'storeBg') {
                        tip = "尺寸要求960*540";
                    }
                    errInfo = {
                        data: true,
                        msg: tip
                    };
                    break;
                case 'maxSize':
                    errInfo = {
                        data: true,
                        msg: '大小不超过5M'
                    };
                    break;
                default:
                    break;
            }
            return errInfo;
        }
    }

    // 删除图片
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
    save(forceOperate) {
        this.submitting = true;
        let tipsCount = this.validate();

        if (tipsCount == null) {
            var isOwer;
            if ($("#isOwer").is(':checked')) {
                isOwer = 1;
            }else {
                isOwer = 0;
            }

            var brandIds = this.brandIdArr;

            var params = {
                forceOperate: forceOperate,
                storeName: this.storeInfo.storeName,
                isOwer: isOwer,
                storeEnglishName: this.storeInfo.storeEnglishName,
                storeEnglishInitials: this.storeInfo.storeEnglishInitials,
                storeDesc: this.storeInfo.storeIntr,
                brandIds: brandIds.join(),
                provinceId: this.storeInfo.provinceId.provinceId,
                cityId: this.storeInfo.cityId.cityId,
                regionId: this.storeInfo.regionId.regionId,
                storeAddress: this.storeInfo.storeAddress,
                storePhone: this.storeInfo.storePhone,
                storeFloor: this.storeInfo.storeFloor,
                storeBunkNo: this.storeInfo.storeBunkNo,
                supportWifi: this.storeInfo.supportWifi,
                storePicsrc: this.storePicsrc,
                bgPic: this.bgPic
            };

            this.storeManageSvc.saveStore(params)
                .then(res=>{
                    alert('提交成功');
                    this.goClaimList();
                }, err=>{
                    // alert('提交错误');

                    // 需判断查重
                    if (err.status == 1006) {
                        this.isPopupListShow = true;
                        this.repeatStore = err.data.repetition;
                    }
                })
        }else {
            document.body.scrollTop = 0;
        }
    }

    // 验证必填项 -> 输入项
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
        if (this.showCheckTips) {
            this.phoneTips = false;
            tipsCount++;
        }

        if (this.showFloorTips) {
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

    hidePopupList() {
        this.isPopupListShow = false;
    }

    goClaimList() {
        this.$state.go('storeMclaimlist');
    }

    back() {
        this.$state.go('storeMclaimlist');
    }

    goClaimDetail(id) {
        this.$state.go('storeMclaimdetail', {id: id});
    }

    goDetail(id) {
        this.$state.go('storeMdetail', {id: id});
    }
}