module.exports = {
    get pageHeader() {
        return $(`h1[aria-label='header set']`);
    },
    get myEmailAddress() {
        return $('td[data-label=Email]');
    },
    open(path = '/') {
        browser.url(path);
    },
    changeColor(color) {
        // const button = $(`button*=Change to ${color}`);
        const button = $(`button[aria-label='set favorite color to ${color}']`);
        button.click();
    },
    clickLogin() {
        $('a=Login').click();
    },
    clickLogout() {
        $('a=Logout').click();
    },
};
