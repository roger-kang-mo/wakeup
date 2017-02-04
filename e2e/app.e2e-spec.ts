import { WakeupPage } from './app.po';

describe('wakeup App', function() {
  let page: WakeupPage;

  beforeEach(() => {
    page = new WakeupPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
