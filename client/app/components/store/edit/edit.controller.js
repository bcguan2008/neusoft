/**
 * (description)
 * 
 * @author yourname
 */

export default class EditController {
    constructor(Api, $http, storeSvc, $state,templateSvc) {
        "ngInject";
        this.name = 'edit';
        this.storeSvc = storeSvc;
        this.templateSvc = templateSvc;
        this.api = Api;
        this.$state = $state;
        this.d = {}
        this.init();
    }
    init() {
        let self = this;
        self.loading = true;
        self.loadPromise = this.api.get('/Organization/detail', { id: this.$state.params.id })

        self.loadPromise.then(res => {
            self.loading = false;
            self.d = res.datas;
            self.getTempList().then((result) => {
                self.d.templateData = result.datas;
                self.d.templateData.map((template)=>{
                    if(self.d.role_ids && self.d.role_ids.indexOf(template.rid)>-1){
                        template.checked = true ;
                    }
                })
            });
        });
    }

    getTemplateName(item){
        if(!item){
        return '';
        }

        if(item.status =='1'){
        return item.name;
        }

        return item.name + '('+ item.statusName + ')';
    }


    save() {
        let self = this;
        let roleIdList = [] 
        console.log(this.d)

        //if (roleIdList) {}
        this.d.templateData.forEach((template)=>{
            template.checked && roleIdList.push(template.rid);
        });
        
     if(roleIdList.length==0){
        alert("请选择可使用的功能模板！")
        return false;
     }

        this.api.post('/Organization/inputAjax', {
            organization_id: this.d.organization_id,
            name: this.d.name,
            contact: this.d.contact,
            principal: this.d.principal,
            remark: this.d.remark,
            role_ids: roleIdList.join(',')

        }).then(res => { alert('提交成功'); this.back() }, err => { alert('提交错误') })

    }

    getTempList() {
        this.loadPromise = this.templateSvc.getPageAllTempList({
            limit: 999999,
            status:0
        });
        return this.loadPromise;
    }

    back() {
        this.$state.go('storelist');
    }

}