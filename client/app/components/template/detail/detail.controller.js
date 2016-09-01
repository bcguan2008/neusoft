/**
 * (description)
 * 
 * @author anyunfei
 */

export default class DetailController {
 constructor($scope,Api,$http) {
      "ngInject";
      this.name = 'detail';
      var _this = this;
      this.d={};
      this.api.get('/Template/detail',{templateNo:this.$state.params.id}).then(res=>{
          _this.d=res;
      })

  }
}