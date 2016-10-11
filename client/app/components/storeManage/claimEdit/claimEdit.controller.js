/**
 * (description)
 * 
 * @author yourname
 */

export default class ClaimEditController {
  constructor(Api, $http, storeSvc, $state, storeManageSvc, uploadSvc) {
    "ngInject";
    this.name = 'claimEdit';
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
    this.picId = 'storePic';
    this.bgId = 'storeBg';

    let self = this;
    self.storeNameLen = 0;
    self.storeENameLen = 0;
    self.storeEInitialsLen = 0;
    self.storeAddressLen = 0;
    self.storePhoneLen = 0;
    self.storeFloorLen = 0;
    self.storeBunkNoLen = 0;
  }

  init() {
    let self = this;
    var _this = this;
    self.loading = true;
    self.loadPromise = self.storeManageSvc.getClaimDetail({storeId: this.$state.params.id});
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

        if (len > maxLength) {
          inputText = inputText.substr(0, round);
          len -=2;
          break;
        }
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

    var n = [],
        selectedBrands = [];
    for (var i = 0; i < this.brands.length; i++) {
      if (n.indexOf(this.brands[i].brandId) == -1) {
        n.push(this.brands[i].brandId);
        selectedBrands.push(this.brands[i]);
      }
    }
    this.brands = selectedBrands;

    this.hideBrandPopup();
    this.changeRequired();
  }

  hideBrandPopup() {
    this.brandList = "";
    this.isAddBrandShow = false;
  }

  // 删除经营品牌
  deleteBrand(i) {
    this.brands.splice(i,1);
  }

  // 验证电话号码
  checkPhone(phone) {
    var pattern = /(^1[3|4|5|7|8][0-9]\d{8}$)|(^400-\d{3}-\d{4}$)|(^((\d{3,4}-)?\d{7,8})(-\d{2,4})?$)/;
    if (pattern.test(phone)) {
      this.showCheckTips = false;
    }else {
      this.showCheckTips = true;
    }
  }

  // 验证楼层输入
  checkFloor(floor) {
    var pattern=/^B[1-9]\d*$|^[1-9]\d*F$/;
    if (floor=="" || pattern.test(floor)) {
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
  save(id, forceOperate) {
    let tipsCount = this.validate();

    if (tipsCount == null) {
      var brandIds = this.brandIdArr;

      var params = {
        forceOperate: forceOperate,
        storeId: id,
        storeName: this.d.storeName,
        storeEnglishName: this.d.storeEnglishName,
        storeEnglishInitials: this.d.storeEnglishInitials,
        storeDesc: this.storeIntr,
        brandIds: brandIds.join(),
        storePhone: this.d.storePhone,
        storeFloor: this.d.storeFloor,
        storeBunkNo: this.d.storeBunkNo,
        storePicsrc: this.storePicsrc,
        bgPic: this.bgPic,
        plazaId: this.d.plazaId
      };

      if (this.d.supportWifi != undefined) {
        params.supportWifi =  this.d.supportWifi;
      }

      this.storeManageSvc.updateClaim(params)
          .then(res=>{
            alert('提交成功');
            this.$state.go('storeMview', {id: id});
          }, err=>{
            alert(err.data.RESULT.message)
            console.log(err);

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

  // 验证必填项 输入限制项
  validate() {
    let tipsCount = 0;
    var storeName = $("#storeName").val(),
        phone = $("#phone").val();

    if (storeName.length == 0) {
      this.nameTips = true;
      tipsCount++;
    }

    if (!this.checkEName(this.d.storeEnglishName)) {
      this.showStoreENameLimit = true;
      tipsCount++;
    }

    if (!this.checkEName(this.d.storeEnglishInitials)) {
      this.showStoreEInitialsLimit = true;
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
    if (this.showCheckTips) {
      this.phoneTips = false;
      tipsCount++;
    }

    if (this.showFloorTips) {
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

  // 英文名称输入格式限制
  checkEName(input, item) {
    var pattern = /^([A-Za-z0-9_])*$/;

    if (!pattern.test(input)) {
      return false;
    }else {
      if (item == "name") {
        this.showStoreENameLimit = false;
      }
      if (item == "initials") {
        this.showStoreEInitialsLimit = false;
      }
      return true;
    }
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

  hidePopupList() {
    this.isPopupListShow = false;
  }

  goClaimList(){
    this.$state.go('storeMclaimlist');
  }

  back(id) {
    this.$state.go('storeMview', {id: id});
  }

  goClaimDetail(id) {
    this.$state.go('storeMclaimdetail', {id: id});
  }

  goDetail(id) {
    this.$state.go('storeMdetail', {id: id});
  }
}