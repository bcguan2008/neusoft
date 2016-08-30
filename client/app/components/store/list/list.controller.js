/**
 * (description)
 * 
 * @author yourname
 */

export default class ListController {
    constructor(storeSvc,$scope,$http,NgTableParams,$state) {
        "ngInject";
        this.$state = $state
    this.storeSvc = storeSvc;
    this.NgTableParams = NgTableParams;
    this.name = 'list';
    //console.log(storeSvc);
    this.init();
  }
    init(){
        var _this = this;
      this.tableParams = new this.NgTableParams({
          count: 100 //每页几条
      }, {
          counts:[],
          getData: function(params) {
              //console.log(params.url().page);
              //console.log(vm.filter)
              return _this.storeSvc.getStoreInfoList(params)
              .then(result => {
                  _this.loading = false;
                  if(result){
                      params.total(1);
                      return result
                  }
              });
          }
      })
  }
  search(){
  	this.storeSvc.getStoreInfoList();
    }
  detail(id){
      this.$state.go('storedetail', {id: id});
  }
  edit(id){
      this.$state.go('storeedit', {id: id});
  }
    //新增员工
  getstaffpageadd(){
      this.staffnewSvc.getstaffpage()

  } 
}