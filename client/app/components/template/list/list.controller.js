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
  }
  /**
   * [init 初始化 页面获取数据]
   */

  init(){
    let self = this;
    this.tableParams = new this.NgTableParams({
      page: 1,
      count: 10
    }, {
      counts:[],
      getData: function(params) {
        return self.templateSvc.getPageAllTempList()
        .then(result => {
          self.loading = false;
          if(result && result.datas){
            params.total(result.totalCount);
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