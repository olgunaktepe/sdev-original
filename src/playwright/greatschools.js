const { chromium, devices } = require('playwright');
//const deviceInfo = devices['iPhone 11 Pro'];
const deviceInfo = devices[Object.keys(devices)[ Object.keys(devices).length * Math.random() << 0]];


const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'wvgu_main',
  password: 'kH?Q1o,e_n.#',
  database: 'wvgu_main'
});
connection.connect((err) => {
  if (err) throw err;
  console.log('Connected!');
});

//deviceInfo.viewport.width= 500;
//deviceInfo.viewport.height= 500;

var input = JSON.parse(process.argv[2]);

//input.proxy = 'http://207.135.203.210:46503';
//input.username = 'nrO4RNssheWc8oJ';
//input.password = 'VmXFAu3iIwa26Pc';
input.url = 'https://www.greatschools.org/search/search.zipcode?distance=60&lat=33.5262326&lon=-117.3381427';

//input.url = 'https://example.com';

(async () => {
  //const browser = await chromium.launch({proxy:{server:input.proxy,user:input.username, password:input.password}});
	//const browser = await chromium.launch({proxy:{server:input.proxy}});  
	const browser = await chromium.launch();
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
    
  await page.goto(input.url, {timeout: 30*1000 });


  console.log("Getting token...");
  const token = await page.locator('meta[name="csrf-token"]').getAttribute('content');
  console.log("Token: "+token);

  var p = 278;
  var perpage = 1000;  
  var totalPages = 0;
  do{
    var res = await getPage(page,p,perpage,token);    
    if(!res.totalPages || res.errors){
        console.log(res);
        console.log("Failed");
        await browser.close();
        process.exit();
    }
    totalPages = res.totalPages;  
    
    for(x in res.items){
      var el = res.items[x];
      var data = mysql.escape(JSON.stringify(el));
      var rId = el.id;
      connection.query("INSERT INTO greatschools SET remote_id='"+rId+"', rating='"+el.rating+"' lat='"+el.lat+"', lng='"+el.lon+"', data="+data+"", (err) => {if(err) throw err; });
    }    
    
    console.log("Found: "+res.items.length);
    console.log("Progress: "+p+"/"+totalPages);
    p++;
  }while(p<totalPages);
  console.log("Scrape Done");

  //await page.screenshot({ path: 'gg.png' });      
  await browser.close();
  
  //matches = res.replace(/(\r\n|\n|\r)/gm, "").match(/<html><head><meta .*?><\/head><body><pre .*?>(.*?)<\/pre><\/body><\/html>/);
  //if(matches){res = matches[1]}    
  //console.log('RES_CONTENT:'+res);

})();

async function getPage(page,p,perpage,token){
  console.log("Getting page: "+p);
  await page.evaluate(([p,perpage,token]) => {
    window.res = '';
    fetch("https://www.greatschools.org/gsr/api/schools?page="+p+"&limit="+perpage+"&zip=90012&countsOnly=false&lat=34.065&lon=-118.240&distance=50000&extras=students_per_teacher%2Creview_summary%2Csaved_schools", {
      "headers": {
        "accept": "application/json, text/javascript, */*; q=0.01","accept-language": "en-US,en;q=0.9","sec-ch-ua": "\"Not.A/Brand\";v=\"8\", \"Chromium\";v=\"114\", \"Google Chrome\";v=\"114\"","sec-ch-ua-mobile": "?0","sec-ch-ua-platform": "\"Windows\"","sec-fetch-dest": "empty","sec-fetch-mode": "cors","sec-fetch-site": "same-origin",
      "x-csrf-token": token,
      "x-requested-with": "XMLHttpRequest"
      },
      "referrer": "https://www.greatschools.org/","referrerPolicy": "strict-origin-when-cross-origin","body": null,"method": "GET","mode": "cors","credentials": "include"
    }).then(res => res.json()).then(data => {obj = data;}).then(() => { window.res = obj;});		 
  }, [p,perpage,token]);

  var wait = 60;
  var res = '';
  do{
    console.log("Waiting for response..."+wait);
    await page.waitForTimeout(1000);
    res = await page.evaluate(() => { return window.res; });
    wait--;
  }while(res == '');

  return res;
}