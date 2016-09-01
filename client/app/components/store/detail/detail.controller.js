/**
 * (description)
 * 
 * @author anyunfei
 */

export default class DetailController {
    constructor(storeSvc,Api,$http,$state) {
        "ngInject";
        this.name = 'detail';      
        this.storeSvc = storeSvc;
        this.api = Api;
        this.$state = $state;
        this.init();
        this.d={}
    }
    init(){
        var _this = this;
        this.api.get('/Organization/detail',{id:this.$state.params.id}).then(res=>{
            _this.d=res;
        })
    }
    back(){
        this.$state.go('storelist');
    }

}