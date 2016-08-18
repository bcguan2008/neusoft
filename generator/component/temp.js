import <%= name %>Component from './<%= name %>.component';
export default angular.module('<%= name %>', [])
  .config(($stateProvider) => {
  "ngInject";
$stateProvider.state('<%= name %>', {
  url: '/<%= name %>',
  template: '<<%= name %>></<%= name %>>'
});
})
.component('<%= name %>', <%= name %>Component);
