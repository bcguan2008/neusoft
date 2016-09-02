/**
 * (description)
 * 
 * @author yourname
 */

export default class ListController {
  constructor(templateSvc,NgTableParams,$state,$location) {
     "ngInject";
    this.name = 'list';
    this.templateSvc = templateSvc;
    this.$state = $state;
    this.NgTableParams = NgTableParams;
    this.$location = $location;
    this.nowTemplate=null;
    this.init();
    this.filter = {
      limit: 10,
      };
  }
     /**
   * 获取格式化后的数据
   */ 
  getSearchFormData(){
    let filter = this.filter
    return filter
  }
  /**
   * [init 初始化 页面获取数据]
   */

  init($scope){
    let self = this;
    this.tableParams = new this.NgTableParams({
      page: 1,
      count: 10 //每页几条
    }, {
      counts:[],
      getData: function(params) {

        self.loading = true;
        let formData = self.getSearchFormData();
        formData.page = params.url().page;
        return self.templateSvc.getPageAllTempList(formData)
        .then(result => {
           self.loading = false;
          if(result){
            params.total(result.total);
            return result.datas; 
          }
        });
      }
    });
  }
//创建
  creatnewTemplate(){
    this.$location.url('/template/add');
  }
  //查看

  detail(id){
      this.$state.go('templatedetail',{id:id});
  }
  
  //修改
  edit(id){
      this.$state.go('templateedit', {id: id});
  }
  changeStatus(){
      var newStatus = this.nowTemplate.status=="1"?"3":"1";
      this.templateSvc.changeStatus({
          templateNo:this.nowTemplate.templateNo,
          status:newStatus,
          operatorId:"1111",
          operatorName:""
      }).then(res=>{
          this.nowTemplate.status=newStatus;
          alert("修改成功");
      })
  }
  //返回
  returnTemplatelist(){
    this.templateSvc.returnTemplatelist()
  }
  changeStatusAlert(row){
      this.nowTemplate = row;
  }
}