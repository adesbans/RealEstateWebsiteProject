const App = require('../pageobjects/app.page');

describe('Vue.js app', () => {
    it('should open and render', () => {
        App.open();

        // check for the bare minimum
        expect(App.pageHeader).toHaveTextContaining('Desbans Realty Group');
    });
});
