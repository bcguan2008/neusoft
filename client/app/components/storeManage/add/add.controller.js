/**
 * (description)
 *
 * @author yourname
 */

export default class AddController {
    constructor(Api, $http, storeSvc, $state, uploadSvc) {
        "ngInject";
        this.name = 'add';
        this.storeSvc = storeSvc;
        this.api = Api;
        this.$state = $state;
        this.uploadSvc = uploadSvc;
        this.d = {};
        this.init();

    }

    init() {
        var _this = this;
        this.api.get('/Organization/detail', {id: this.$state.params.id}).then(res=> {
            _this.loading = false;
            _this.d = res.datas;
        })
    }

    showBrandList() {
        this.isBrandListShow = true;
    }

    hideBrandList() {
        this.isBrandListShow = false;
    }

    save() {
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

            this.uploadSvc.upload(options).then(data=> {
                this.showStoreLogo = true;
                this.logoSrc = 'http://img1.ffan.com/orig/T1UEJTBmxT1RCvBVdK';
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
}