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
        this.loadPromise = this.treeSvc.getselectSopTree(this.$state.params.id)

        //����������ڱ�����������ת��
        this.config = {
           //ָʾ�ӽڵ���ֶ���
            fieldOfChildren: 'child',
            //ָʾ�ڵ������ֶ�
            fieldOfName: 'name',
            //ָʾ�ڵ�id���ֶ�
            fieldOfId: 'nodeId'

        };

        
    }
    save(){     
       console.log(this.d);
       this.templateSvc.postEdit(this.d);
      // alert('����ɹ�');
       // this.api.post('/role/operate/act/save/rid'+this.d.rid,this.d).then(res=>{alert('����ɹ�'),err=>{alert(err)}})
    }

editInit(){
  
  let self = this;
  var _this = this;
   self.loading = true;
    self.loadPromise= self.templateSvc.getDetail({
      id: this.$state.params.id
    });
    return self.loadPromise.then(result => {
          if(result){
            self.loading = false;
               _this.d={
                 name:result.name,
                 description:result.description,
                 rid : result.rid
                // nodes:result.nodes
               }

          }
        });
    }

}