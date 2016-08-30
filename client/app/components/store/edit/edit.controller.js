/**
 * (description)
 * 
 * @author yourname
 */

export default class EditController {
    constructor(Api,$http,storeSvc,$state) {
      "ngInject";
      this.name = 'edit';
      this.storeSvc = storeSvc;
      this.api = Api;
      this.$state = $state;
      this.init();
        this.d={}
    }
    init(){
        var _this = this;
        this.api.get('/Organization/detail',{id:this.$state.params.id}).then(res=>{
            _this.loading = false;
            _this.d=res;
            _this.roles = [
                {name:"模板1",id:1},
                {name:"模板2",id:2},
                {name:"模板3",id:3},
                {name:"模板4",id:4},
                {name:"模板5",id:5},
                {name:"模板6",id:6}
            ].map(function(item){
                item.checked = _this.d.role_ids.indexOf(item.id)>-1?true:false;
                return item;
            })
        })
    }
    
}