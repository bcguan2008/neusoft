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
         let self = this;
        var _this = this;
         self.loading = true;
        self.loadPromise = this.api.get('/Organization/detail',{id:this.$state.params.id})
       return self.loadPromise.then(res=>{
         self.loading = false;
         console.log(res.datas)
            _this.d=res.datas; 
            
        })
    }
    back(){
        this.$state.go('storelist');
    }

}