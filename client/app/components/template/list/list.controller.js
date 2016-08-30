/**
 * (description)
 * 
 * @author yourname
 */

export default class ListController {
  constructor($scope,templateSvc,NgTableParams) {
  	 "ngInject";
    this.name = 'list';
    this.templateSvc = templateSvc;
    this.NgTableParams =NgTableParams;
    $scope.vm.items = [
        {"id":"1","name":"name 1","contact":"contact 1","storeName":"field3 1","field4":"field4 1","field5 ":"field5 1"}, 
        {"id":"2","name":"name 2","contact":"contact 1","storeName":"field3 2","field4":"field4 2","field5 ":"field5 2"}, 
        {"id":"3","name":"name 3","contact":"contact 1","storeName":"field3 3","field4":"field4 3","field5 ":"field5 3"}, 
        {"id":"4","name":"name 4","contact":"description 1","storeName":"field3 4","field4":"field4 4","field5 ":"field5 4"}, 
        {"id":"5","name":"name 5","contact":"description 1","storeName":"field3 5","field4":"field4 5","field5 ":"field5 5"}, 
        {"id":"6","name":"name 6","contact":"description 1","storeName":"field3 6","field4":"field4 6","field5 ":"field5 6"}, 
        {"id":"7","name":"name 7","contact":"description 1","storeName":"field3 7","field4":"field4 7","field5 ":"field5 7"}, 
        {"id":"8","name":"name 8","contact":"description 1","storeName":"field3 8","field4":"field4 8","field5 ":"field5 8"}, 
        {"id":"9","name":"name 9","contact":"description 1","storeName":"field3 9","field4":"field4 9","field5 ":"field5 9"}, 
        {"id":"10","name":"name 10","contact":"description 1","storeName":"field3 10","field4":"field4 10","field5 ":"field5 10"}, 
        {"id":"11","name":"name 11","contact":"description 1","storeName":"field3 11","field4":"field4 11","field5 ":"field5 11"}, 
    ];


  }
  /**
   * [init 初始化 页面获取数据]
   */

  init(){
    let self = this;
    var vm = this;
    this.tableParams = new this.NgTableParams({
      count: 10 //每页几条
    }, {
      counts:[],
      getData: function(params) {
       

        console.log(params.url().page);
        console.log(vm.filter)
        return self.templateSvc.getPageTempList()
        .then(result => {
          self.loading = false;
          if(result && result.list){
          	 console.log(result.total)
            params.total(result.total);
            return result.list;
          }
        });
      }
    });
  }

  creatnewTemplate(){
  		this.templateSvc.returnnewTemplate()
  }

}