import ClaimViewModule from './claimView'
import ClaimViewController from './claimView.controller';
import ClaimViewComponent from './claimView.component';
import ClaimViewTemplate from './claimView.html';

describe('ClaimView', () => {
  let $rootScope, makeController;

  beforeEach(window.module(ClaimViewModule.name));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new ClaimViewController();
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
      expect(ClaimViewTemplate).to.match(/{{\s?vm\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = ClaimViewComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(ClaimViewTemplate);
      });

      it('uses `controllerAs` syntax', () => {
        expect(component).to.have.property('controllerAs');
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(ClaimViewController);
      });
  });
});
