/**
 * Created by guanbingchang
 */

class treeSvc  {
  constructor(Api,$q) {
      "ngInject";
      this.q = $q;
    this.Api = Api;
  }
    //得到tree数据
  getSopTree(params){
    console.log("getSopTree")
      return this.Api.get('/role/operate/act/nodes/type/sop',params)
  }

  getAppTree(params){
      return this.Api.get('/role/operate/act/nodes/type/app',params)
  }
  //已选 http://demo1015.sit.ffan.com/staffmgt/role/operate/act/nodes/type/{{sop/app}}/rid/23239
  getselectSopTree(params){
      return this.Api.get('/role/operate/act/nodes/type/sop/rid/'+params)
  }
   getselectAppTree(params){
      return this.Api.get('/role/operate/act/nodes/type/app/rid/'+params)
  }
}

//http://demo1015.sit.ffan.com/staffmgt/role/operate/act/nodes/type/{{sop/app}}

export default treeSvc
