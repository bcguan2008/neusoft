/**
 * (description)
 *
 * @author yourname
 */

export default class ClaimDetailController {
    constructor(storeSvc, Api, $http, $state, storeManageSvc, uploadSvc) {
        "ngInject";
        this.name = 'claimDetail';
        this.storeSvc = storeSvc;
        this.api = Api;
        this.$state = $state;
        this.storeManageSvc = storeManageSvc;
        this.uploadSvc = uploadSvc;
        this.init();
        this.d = {}
    }
    
    init() {
        let self = this;
        var _this = this;
        self.loading = true;
        self.loadPromise = self.storeManageSvc.getClaimDetail({storeId: this.$state.params.id});
        return self.loadPromise.then(res=> {
            self.loading = false;
            _this.d = res;

            // 简介字数
            var len = 0;
            for (var i=0,round=0; i<res.storeDesc.length; i++,round++) {
                var a = res.storeDesc.charAt(i);
                if (a.match(/[^\x00-\xff]/ig)!=null) {
                    len += 2;
                }else {
                    len += 1;
                }
            }
            _this.d.descLen = 1000 - len;
        })
    }

    // 字数限制
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

        if (inputId == "storeRemark") {
            this.storeIntr = inputText;
            this.storeRemarkTips = maxLength - len;
        }
    }

    // 上传经营权说明书
    uploadFile(file, errFile) {
        let errInfo = this.catchErrFileError(errFile);
        if (errInfo && errInfo['data']) {
            this.uploadErrorMsg = errInfo['msg'];
            alert(this.uploadErrorMsg);
            return;
        }

        if (file) {
            let options = {
                fileName: file
            };

            this.uploadSvc.upload(options).then(result=> {
                if (result && result.data) {
                    this.fileName = file.name;

                    this.picUrl = result.data.url;
                    this.operatingStatement = result.data.name;

                    this.showDeleteBtn = true;
                }
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
                default:
                    break;
            }
            return errInfo;
        }
    }

    // 删除经营权说明书
    deleteFile() {
        this.fileName = "";
        this.operatingStatement = "";
        this.showDeleteBtn = false;
    }

    goList(){
        this.$state.go('storeMlist');
    }

    back() {
        this.$state.go('storeMclaimlist');
    }

    // 门店认领
    receive(storeId) {
        var params = {
            storeId: storeId,
            remark: this.storeRemark,
            operatingStatement: this.operatingStatement
        };

        this.storeManageSvc.claimStore(params)
            .then(res=>{
                alert('认领成功');
                this.$state.go('storeMclaimlist');
            }, err=>{
                alert(err.data.RESULT.message);
            })
    }
}