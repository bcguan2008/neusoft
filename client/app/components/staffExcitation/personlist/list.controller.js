/**
 * (description)
 * 
 * @author yourname
 */

export default class ListController {
  constructor($scope,$http,staffExcitationSvc,NgTableParams) {
  	 "ngInject";
     this.name = 'list';
     this.staffExcitationSvc = staffExcitationSvc;
     this.NgTableParams = NgTableParams;

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
  this.init();

     $scope.vm.staffExcitation = [{ id: 1, name: 'name 1' }, { id: 2, name: 'name 2' }, { id: 3, name: 'name 3' }, { id: 4, name: 'name 4' }];
     $scope.vm.action = [{ id: 1, name: '一般好' }, { id: 2, name: '良' }, { id: 3, name: '优秀' }];
     $scope.vm.items = [
        {"id":"1","name":"name 1","description":"description 1","field3":"field3 1","field4":"field4 1","field5 ":"field5 1"}, 
        {"id":"2","name":"name 2","description":"description 1","field3":"field3 2","field4":"field4 2","field5 ":"field5 2"}, 
        {"id":"3","name":"name 3","description":"description 1","field3":"field3 3","field4":"field4 3","field5 ":"field5 3"}, 
        {"id":"4","name":"name 4","description":"description 1","field3":"field3 4","field4":"field4 4","field5 ":"field5 4"}, 
        {"id":"5","name":"name 5","description":"description 1","field3":"field3 5","field4":"field4 5","field5 ":"field5 5"}, 
        {"id":"6","name":"name 6","description":"description 1","field3":"field3 6","field4":"field4 6","field5 ":"field5 6"}, 
        {"id":"7","name":"name 7","description":"description 1","field3":"field3 7","field4":"field4 7","field5 ":"field5 7"}, 
        {"id":"8","name":"name 8","description":"description 1","field3":"field3 8","field4":"field4 8","field5 ":"field5 8"}, 
        {"id":"9","name":"name 9","description":"description 1","field3":"field3 9","field4":"field4 9","field5 ":"field5 9"}, 
        {"id":"10","name":"name 10","description":"description 1","field3":"field3 10","field4":"field4 10","field5 ":"field5 10"}, 
        {"id":"11","name":"name 11","description":"description 1","field3":"field3 11","field4":"field4 11","field5 ":"field5 11"}, 
    ];
  }


  /**
   * [init 初始化]
   */
  init(){
  	var vm = this;
    let self = this;
    this.tableParams = new this.NgTableParams({
      count: 10 //每页几条
    }, {
      counts:[],
      getData: function(params) {
      //  console.log(params.url().page);
        console.log(vm.filter.action_1.name)
        return self.staffExcitationSvc.getExcitationList(vm.filter)
        .then(result => {
          if(result && result.list){
          	 console.log(result.total)
            params.total(result.total);
            return result.list;
          }
        });
      }
    });
  }

  search_Excitation(){
  			//return staffExcitationSvc.getExcitationList(formData)
  			 this.tableParams.parameters({page : 1}).reload();
  }


		  /**
		   * [reset 重置]
		   */
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
  // 导出Excel
		exportExcel(){

		

		}
}