/**
 * (description)
 * 
 * @author yourname
 */

export default class EditController {
    constructor($scope,Api,$http,treeSvc) {
      "ngInject";
      this.name = 'edit';
      this.Api = Api;
      this.treeSvc = treeSvc;
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
}