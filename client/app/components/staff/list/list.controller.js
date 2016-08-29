/**
 * (description)
 * 
 * @author yourname
 */

export default class ListController {
  constructor($scope,$http,staffnewSvc,NgTableParams) {
  	 "ngInject";
  	
    this.name = 'list';

    this.staffnewSvc=staffnewSvc;
  	 this.NgTableParams = NgTableParams;
  	 console.log("open")
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

		}
}