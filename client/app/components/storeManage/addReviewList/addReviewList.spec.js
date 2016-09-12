import AddReviewListModule from './addReviewList'
import AddReviewListController from './addReviewList.controller';
import AddReviewListComponent from './addReviewList.component';
import AddReviewListTemplate from './addReviewList.html';

describe('AddReviewList', () => {
  let $rootScope, makeController;

  beforeEach(window.module(AddReviewListModule.name));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new AddReviewListController();
    };
  }));

  describe('Module', () => {
    // top-level specs: i.e., routes, injection, naming
  });

  describe('Controller', () => {
    // controller specs
    it('has a name property [REMOVE]', () => { // erase if removing this.name from the controller
      let controller = makeController();
      expect(controller).to.have.property('name');
    });
  });

  describe('Template', () => {
    // template specs
    // tip: use regex to ensure correct bindings are used e.g., {{  }}
    it('has name in template [REMOVE]', () => {
      expect(AddReviewListTemplate).to.match(/{{\s?vm\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = AddReviewListComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(AddReviewListTemplate);
      });

      it('uses `controllerAs` syntax', () => {
        expect(component).to.have.property('controllerAs');
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(AddReviewListController);
      });
  });
});
