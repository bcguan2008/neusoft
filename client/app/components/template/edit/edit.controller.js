/**
 * (description)
 * 
 * @author yourname
 */

export default class EditController {
    constructor(Api,treeSvc,$state) {
      "ngInject";
      this.name = 'edit';
      this.api = Api;
      this.$state=$state;
      this.treeSvc = treeSvc;
      this.d={};
      this.api.get('/Template/detail',{templateNo:this.$state.params.id}).then(res=>{
          _this.d=res;
      })
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
        this.api.post('/Template/updateTemplate',this.d).then(res=>{alert('�޸ĳɹ�'),err=>{alert(err)}})
    }
}