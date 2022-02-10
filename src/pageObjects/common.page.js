class CommonPage {
    get bankingTab() {
        return $('//ul[@class="commbank-list"]//a[contains(text(),"Banking")]');
    }
    get homeloanTab() {
        return $('//ul[@class="commbank-list"]//a[contains(text(),"Home loans")]');
    }
    get insuranceTab() {
        return $('//ul[@class="commbank-list"]//a[contains(text(),"Insurance")]');
    }
    get investingTab() {
        return $('//ul[@class="commbank-list"]//a[contains(text(),"Investing & super")]');
    }
    get businessTab() {
        return $('//ul[@class="commbank-list"]//a[contains(text(),"Business")]');
    }
    get institutionalTab() {
        return $('//ul[@class="commbank-list"]//a[contains(text(),"Institutional")]');
    }
    
    get bannerDetails() {
        return $('div.banner-content h1');
    }


   

}
export default new CommonPage();
