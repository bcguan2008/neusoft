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
    upload(options, url){
        return this
            .Upload
            .upload({
                // url:'/rule/center/fileUpload',
                url: url,
                data: options
            }).then(data=>{
                let status = data && data.data.status;
                if(status != 200){
                    let errorMsg = data.data && data.data.message;
                    alert(errorMsg);
                }else{
                    console.log('错误信息:',data);
                }
                return data;
            });
    };

    // upload(options){
    //     return this.Upload.upload({
    //         url:'/System/files/ajaxImageUpload',
    //         data:options
    //     }).then(data=>{
    //         let status = data && data.status;
    //         if(status == 200){
    //             let uploadStatus = data && data.data && data.data.status,
    //                 errorMsg = data && data.data && data.data.msg;
    //             if(uploadStatus != 200){
    //                 console.log('错误信息',errorMsg);
    //                 return;
    //             }else{
    //                 return data && data.data;
    //             }
    //         }else{
    //             console.log('错误信息:',data);
    //         }
    //     });
    // };
}