/**
 * (description)
 * 
 * @author yourname
 */

export default class ListController {
  constructor($scope,$http,staffnewSvc,NgTableParams,$state) {
  	 "ngInject";
  	
    this.name = 'list';
    this.$state = $state;
    this.staffnewSvc=staffnewSvc;
  	this.NgTableParams = NgTableParams;
  	this.init();
// 员工状态

  	$scope.staffstatus = [{ id: 1, name: 'OK' }, { id: 2, name: 'Null' }, { id: 3, name: 'non' }];

// 模板

  	$scope.template_name = [{ id: 1, name: '模板1' }, { id: 2, name: '模板2' }, { id: 3, name: '模板3' }];
    
	// 区域

  	$scope.staffarea = [{ id: 1, name: '区域1' }, { id: 2, name: '区域2' }, { id: 3, name: '区域3' }];

//广场

  	$scope.square = [{ id: 1, name: '广场1' }, { id: 2, name: '广场2' }, { id: 3, name: '广场3' }];

//品牌
  	$scope.brand = [{ id: 1, name: '品牌1' }, { id: 2, name: '品牌2' }, { id: 3, name: '品牌3' }];


//门店
  	$scope.store = [{ id: 1, name: '门店1' }, { id: 2, name: '门店2' }, { id: 3, name: '门店3' }];



 this.filter = {
      limit: 10,
      name: '',
      phone: '',
      action_1: '',
      button_name: '',
      status: '',
      update_start_time: '',
      update_end_time: ''
    };


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


  searchbystaff(){

  	this.staffnewSvc.getstaffpage()

  }

	//this.staffnewSvc.getStaffInfoList()

/**
   * [init 初始化]
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
        return self.staffnewSvc.getPageUserList(vm.filter)
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

		   search(){
          this.tableParams.parameters({page : 1}).reload();
		}

        reset(){
        this.filter = {
          limit: 10,
          name: '',
          phone: '',
          action_1: '',
          status: '',
          update_start_time: '',
          update_end_time: ''
        };
    }

  /**
   * [detail 去detail页面]
   */
  detail(id){
    console.log("id==" & id)
    this.$state.go('staffdetail', {id: id});
  }
  //新增员工
  getstaffpageadd(){
      this.staffnewSvc.getstaffpage()

  } 
}