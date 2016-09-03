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
      return this.Api.get('/staffmgt/role/operate/act/nodes/type/sop',)
  }

  getAppTree(params){
      return this.Api.get('/staffmgt/role/operate/act/nodes/type/sop',)
  }

}

export default treeSvc
