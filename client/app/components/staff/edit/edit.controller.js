/**
 * (description)
 * 
 * @author yourname
 */
export default class EditController {
  constructor($scope, Api, $state, staffnewSvc, templateSvc, $q) {
    "ngInject";

    this.name = 'edit';
    this.Api = Api;
    this.staffnewSvc = staffnewSvc;
    this.scope = $scope;
    this.$state = $state;
    this.q = $q;
    this.d = {};
    this.selectSr1 = {};
    this.templateSvc = templateSvc;
    this.gettemp = {
      role_ids: '',
      role_info: ''
    }
    
    // 员工状态
    this.staffstatus = [{ id: 3, name: '冻结' }, { id: 1, name: '正常' }];
    //性别
    this.sex = [{ id: 1, name: '男' }, { id: 3, name: '女' }];
    this.init();
  }

  //返回
  returnstafflistc() {
    this.staffnewSvc.getstafflist();
  }
  //updateEmployee
  updatestaff() {
    let self = this;

    self.d.role_ids  = this.templateDatas.filter(data=>{
      return data.ifChecked;
    }).map((data)=>{
      return data.rid;
    }).join(',');
    debugger;
    this.staffnewSvc.updateEmployee(this.d);
    this.staffnewSvc.getstafflist();
  }
  /**
 * [init 初始化]
 */

  init() {
    let self = this;
    self.loading = true;
    self.loadTempatePromise = this.templateSvc.getPageAllTempList({limit:999999});
    self.loadPromise = self.staffnewSvc.getDetail({
      id: this.$state.params.id,
      type: 1
    }).then(result=>{
      self.loading = false;
      if (result) {
        self.selectSex1 = {
          sex: result.genderName,
        }
        
        self.d = {
          id: result.uuid,
          name: result.name,
          contact: result.contact,
          rtx: result.rtx,
          storeName: result.storeName,
          email: result.email,
          employee_id: result.employee_id,
          employee_organization_name: result.employee_organization_name,
          role_ids: result.role_ids,
          role_info: result.role_info
        }
        /**
         * 给状态数组赋值
         */
        self.staffstatus.forEach((status)=>{
          if(status.id == result.status_id){
            self.d.status = status;
          }
        })

        /**
         * 拉template数据，并且回填
         */
        self.loadTempatePromise.then((result)=>{
          self.templateDatas = result.datas;
          let checkedTemplates = self.d.role_ids && self.d.role_ids.split(',');
          if(checkedTemplates && checkedTemplates.length>0){
            self.templateDatas.map(data=>{
              if(checkedTemplates.indexOf(data.rid)>-1){
                data.ifChecked = true ;
              }
            })
          }
        });
      }
    });
  
  }

}