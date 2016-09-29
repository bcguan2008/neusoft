/**
 * (description)
 * 
 * @author yourname
 */

export default class ListController {
  constructor($scope,$http,staffExcitationSvc,NgTableParams,$window,$httpParamSerializer) {
  	 "ngInject";
     this.name = 'list';
     this.staffExcitationSvc = staffExcitationSvc;
     this.NgTableParams = NgTableParams;
     this.window=$window;
     this.httpParamSerializer=$httpParamSerializer;
     this.filter = {
       offset: 0
    };
    this.selectMonth = {};
    this.selectTask={}
    this.init(); 

     // $scope.vm.staffExcitation = [{ id: 1, name: 'name 1' }, { id: 2, name: 'name 2' }, { id: 3, name: 'name 3' }, { id: 4, name: 'name 4' }];
     // $scope.vm.action = [{ id: 1, name: '一般好' }, { id: 2, name: '良' }, { id: 3, name: '优秀' }];
  }
  getSearchFormData()
  {
    
    let filter  = {
      month:this.filter.month,
      task:this.filter.task,
    }
//获取 选择月份
     let selectMonth = this.selectMonth; 
    if (selectMonth.value != undefined) {
      filter.month = selectMonth.value;
    }else{
      filter.month = 0
    }
//获取激励任务
    let selectTask = this.selectTask; 
    
    if (selectTask.value != undefined) {
      filter.task = selectTask.value;
    }else{
      filter.task = 0
    }

   //  console.log( filter)
    return filter;

  }

   /**
   * [init 初始化]
   */
  init(){

     let self = this;
      this.tableParams = new this.NgTableParams({
        page: 1,
        count: 10
      }, {
          getData: function ($defer, params) {
        
            let paramsUrl = params.url();
            self.loading = true;
            let formData = self.getSearchFormData();
           
           formData.offset = paramsUrl.page;
            formData.limit = paramsUrl.count;
             console.log(formData)
            //员工个人奖励汇总
            self.loadPromise = self.staffExcitationSvc.getBestirCollect(formData);
            return self.loadPromise
              .then(result => {
                self.loading = false;
                if (result) {
                  self.d = {
                    totalCount: result.totalCount
                  }
                  params.total(result.totalCount);
                  //需要汇总的数据
                  return result.datas;
                }
              });
          }
        });
  }


  search() {
    this.tableParams.parameters({ page: 1 }).reload();
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
   // debugger;
    let formData = this.getSearchFormData();
        formData.page = this.tableParams.page(); 
        formData.limit = this.tableParams.data.length;
        console.log(formData)
    this.window.open('/Staffmgt/Employee/stafflist?format=excel&'+ this.httpParamSerializer(formData), '_blank');

  }
}