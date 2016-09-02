/**
 * (description)
 * 
 * @author yourname
 */

export default class EditController {
    constructor(Api,treeSvc,$state,templateSvc) {
      "ngInject";
      this.name = 'edit';
      this.api = Api;
      this.$state=$state;
      this.treeSvc = treeSvc;
      this.templateSvc = templateSvc;
      this.d={};
      // this.api.get('/Template/detail',{templateNo:this.$state.params.id}).then(res=>{
      //     _this.d=res;
      // })
      this.editInit();
      this.initTree();
  }
    initTree(){
        //Լ���������׵���˵Ķ��ŵ��������
        this.form = {};

        //��ȥ�б����ݵ�promise
        this.loadPromise = this.treeSvc.get()

        //����������ڱ�����������ת��
        this.config = {
            //ָʾ�ӽڵ���ֶ���
            fieldOfChildren: 'child',
            //ָʾ�ڵ������ֶ�
            fieldOfName: 'categoryName',
            //ָʾ�ڵ�id���ֶ�
            fieldOfId: 'categoryId'
        };

        
    }
    save(){
      console.log(this.d)
      this.templateSvc.postEdit(this.d);
       // this.api.post('/Template/updateTemplate',this.d).then(res=>{alert('�޸ĳɹ�'),err=>{alert(err)}})
    }

editInit(){
  
  let self = this;
  var _this = this;
    return self.templateSvc.getDetail({
      id: this.$state.params.id
    }).then(result => {
          if(result){
            console.log(result)
               _this.d={
                 name:result.name,
                 describe:result.description,
                 rid : result.rid,
                 node:result.nodes
               }

          }
        });
    }

}