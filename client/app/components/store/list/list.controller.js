/**
 * (description)
 * 
 * @author yourname
 */

export default class ListController {
    constructor(storeSvc,$scope,$http,NgTableParams) {
    "ngInject";
    this.storeSvc = storeSvc;
    this.NgTableParams = NgTableParams;

    this.name = 'list';
    console.log(storeSvc);
    this.init();
  }
    init(){
        var _this = this;
      this.tableParams = new this.NgTableParams({
          count: 10 //Ã¿Ò³¼¸Ìõ
      }, {
          counts:[],
          getData: function(params) {
       

              //console.log(params.url().page);
              //console.log(vm.filter)
              return _this.storeSvc.getStoreInfoList(params)
              .then(result => {
                  _this.loading = false;
                  if(result && result.list){
                      console.log(result.total)
                      params.total(result.total);
                      return result.list;
                  }
              });
          }
      })
  }
  search(){
  	this.storeSvc.getStoreInfoList();
  }
}