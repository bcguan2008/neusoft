/**
 * author chuxin
 * 公共服务
 */

//TODO 不需要这个upload，在FileUpLoader 里注入url 就可以了
import ngFileUpload from 'ng-file-upload';
export default class uploadSvc {
    constructor(Upload){
        'ngInject';
        this.Upload = Upload;
    }

    /**
     * 上传文件
     * @param params
     * @returns {*}
     */
    upload(options){
        return this
            .Upload
            .upload({
                url: '/System/files/ajaxImageUpload',
                data: options
            }).then(data=>{
                let status = data && data.data.status;
                if(status != 200){
                    let errorMsg = data.data && data.data.message;
                    alert(errorMsg);
                }else{
                    // console.log('错误信息:',data);
                    data = data.data;
                }
                return data;
            });
    };
}