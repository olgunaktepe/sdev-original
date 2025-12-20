const { chromium, devices } = require('playwright');
//const deviceInfo = devices['iPhone 11 Pro'];
const deviceInfo = devices[Object.keys(devices)[ Object.keys(devices).length * Math.random() << 0]];

//deviceInfo.viewport.width= 500;
//deviceInfo.viewport.height= 500;

var input = JSON.parse(process.argv[2]);

//input.proxy = '95.211.175.167:13200';
//input.url = 'https://www.zillow.com/search/GetSearchPageState.htm?searchQueryState=%7B%22pagination%22%3A%7B%7D%2C%22usersSearchTerm%22%3A%22%22%2C%22mapBounds%22%3A%7B%22west%22%3A%22-118.08885532577928%22%2C%22east%22%3A%22-118.07458597382005%22%2C%22south%22%3A%2233.881615385287716%22%2C%22north%22%3A%2233.89052190572857%22%7D%2C%22isMapVisible%22%3Atrue%2C%22filterState%22%3A%7B%22sortSelection%22%3A%7B%22value%22%3A%22days%22%7D%2C%22isAllHomes%22%3A%7B%22value%22%3Atrue%7D%7D%2C%22isListVisible%22%3Atrue%2C%22mapZoom%22%3A18%7D&wants=%7B%22cat1%22%3A%5B%22mapResults%22%5D%7D&requestId=2';

(async () => {
	//const browser = await chromium.launch({proxy:{server:'http://'+input.proxy}});  
  const browser = await chromium.launch();  
	//const browser = await chromium.launch();
  const context = await browser.newContext({
    ...deviceInfo,
    locale: 'en-US',
    //locale: 'en-US,en',
    //geolocation: { longitude: 13.492507, latitude: 41.889938 },    
    permissions: ['notifications']
  }); 
  const page = await context.newPage();
  
  await page.addInitScript(() => {Object.defineProperty(navigator, 'webdriver', {get: () => false,});});
  await page.addInitScript(() => {Object.defineProperty(navigator, 'plugins', {get: () => [1, 2, 3, 4, 5],});});  
  await page.addInitScript(() => {window.navigator.chrome = {runtime: {},};});
    
  await page.goto(input.url, {timeout: 30*1000 })
  //await page.screenshot({ path: 'zillow.png' });    
  var res = await page.content();    
  await browser.close();
  
  matches = res.replace(/(\r\n|\n|\r)/gm, "").match(/<html><head><meta .*?><\/head><body><pre .*?>(.*?)<\/pre><\/body><\/html>/);
  if(matches){res = matches[1]}    
  console.log('RES_CONTENT:'+res);

})();