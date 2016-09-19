/**
 * (description)
 * 
 * @author yourname
 */

export default class EditController {
  constructor(Api, treeSvc, $state, templateSvc) {
    "ngInject";
    this.name = 'edit';
    this.api = Api;
    this.$state = $state;
    this.treeSvc = treeSvc;
    this.templateSvc = templateSvc;
    this.d = {
      nodesSop: [],
      nodesApp: []
    }
    this.init();
  }

  formatNodes(treeNodes, nodes) {
    if (treeNodes && treeNodes.length > 0) {
      treeNodes.forEach(node => {
        if (node.checked) {
          nodes.push(node);
        }
        this.formatNodes(node.children, nodes);
      })
    }

    return nodes;
  }

  init() {
    let self = this;
    this.loading = true;
    this.loadPromise = self.templateSvc.getDetail({
      id: this.$state.params.id
    });

    this.form = {};
    this.loadPromisesop = this.treeSvc.getselectSopTree(this.$state.params.id);
    this.loadPromisesop.then(data => {
      self.d.nodesSop = self.formatNodes(data, self.d.nodesSop);

    })
    this.loadPromiseapp = this.treeSvc.getselectAppTree(this.$state.params.id);
    this.loadPromiseapp.then((data) => {
      self.d.nodesApp = self.formatNodes(data, self.d.nodesApp);
    })

    this.config = {
      fieldOfChildren: 'children',
      fieldOfName: 'name',
      fieldOfId: 'nodeId'
    };

    this.loadPromise.then(results => {
      if (results) {
        self.d.name = results.name;
        self.d.description = results.description;
        self.d.rid = results.rid;
      }
    });
  }


  save() {

    if (this.d.nodesApp.length == 0 && this.d.nodesSop == 0) {
      alert("请选择功能模板！")
      return false;
    }
    this.submitting = true;
    this.d.nodes = this.d.nodesApp.concat(this.d.nodesSop).map(node => {
      return node.nodeId;
    }).join(',');

    this.templateSvc.postEdit({
      rid: this.d.rid,
      description: this.d.description,
      name: this.d.name,
      nodes: this.d.nodes
    }).then(res => {
      this.submitting = false;
      alert('修改成功');
      this.templateSvc.returntemplist();
    },error=>{
      this.submitting = false;
    });
  }

}