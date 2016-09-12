import EditReviewDetailModule from './editReviewDetail'
import EditReviewDetailController from './editReviewDetail.controller';
import EditReviewDetailComponent from './editReviewDetail.component';
import EditReviewDetailTemplate from './editReviewDetail.html';

describe('EditReviewDetail', () => {
  let $rootScope, makeController;

  beforeEach(window.module(EditReviewDetailModule.name));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new EditReviewDetailController();
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
      expect(EditReviewDetailTemplate).to.match(/{{\s?vm\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = EditReviewDetailComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(EditReviewDetailTemplate);
      });

      it('uses `controllerAs` syntax', () => {
        expect(component).to.have.property('controllerAs');
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(EditReviewDetailController);
      });
  });
});
