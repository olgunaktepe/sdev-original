const { chromium, devices } = require('playwright');

var input = JSON.parse(process.argv[2]);

//input.proxy = '95.211.175.167:13200';
//input.url = 'https://www.zillow.com/search/GetSearchPageState.htm?searchQueryState=%7B%22pagination%22%3A%7B%7D%2C%22usersSearchTerm%22%3A%22%22%2C%22mapBounds%22%3A%7B%22west%22%3A%22-118.08885532577928%22%2C%22east%22%3A%22-118.07458597382005%22%2C%22south%22%3A%2233.881615385287716%22%2C%22north%22%3A%2233.89052190572857%22%7D%2C%22isMapVisible%22%3Atrue%2C%22filterState%22%3A%7B%22sortSelection%22%3A%7B%22value%22%3A%22days%22%7D%2C%22isAllHomes%22%3A%7B%22value%22%3Atrue%7D%7D%2C%22isListVisible%22%3Atrue%2C%22mapZoom%22%3A18%7D&wants=%7B%22cat1%22%3A%5B%22mapResults%22%5D%7D&requestId=2';

var url = 'https://wvgu.org/playwright/gmaps.html';


//input.lat = "34.04602170142056";
//input.lng = "-118.24341835510265";
//input.geo = [
//    "gyjjExcaqUzgAnFvo@rkAjMls@}\fdB}bAjzAeGbs@oYr~@iEb}@rGnv@eIlqAfY~bBcOrcAbEjo@aMxTqHboAeVlp@e\dK_LxWkXrH}M`[oOjC{JlRetAjj@u`@}UwFdGg[qW}]hPmPga@cR`KiHsCgFce@mJeCaEfIgK]PrTy[~Naa@jCu]jW__@iMcHzQuUuI}l@tSyL|U{Bzn@{^|j@_UiBwHaTsXqHlWx`@fAdSpJO~OzPda@fBgA|Mq\zHuXrf@dAdp@pIbKwDpRu\h@vD~m@}Ljc@|O~]iEnv@mShFgOny@}PEqH{OmFhJ}Kq@Rn[kRhSiz@ze@cF`Xae@xOkTnp@uVdAkZzVrIq^oDwMjY_lAkKifB`LkSpAsr@aHuKpIa[qL}eAmMuH|_@qh@pOuJdJdB|Mwt@vT|C|F}YvUkOtXuyA|KtLrG}UdI}@lBvIbIkRzMvHxKeMp@yXeUcb@`FwPeHkHoG|JyJ{q@pe@i]tIm{@tTsOnT{a@xDg_@jXwZNys@hKoJ}G{b@tEup@jYkn@rCmp@vLuFpGyd@|LmKuHem@|o@ok@jBefAzRkX|IpNnWiJh[xR`\sBds@w}@niAi|@tlAomBtv@{YvGsVLxP~Tg@`JmOeL{JfNaKgCyNti@_j@hsAu\~OwM",
//    "qdenEfq{mUbExaPkAz{FcIhs@vH?FtaJrmGV?ju@rl@?e@dv@bl@D`@du@~k@m@?lv@zm@ORtkBhk@Mj@vv@xTQRzZdVo@DxZf_@W?d[nUTTh\lUiCYxUpdAfDzBbKfd@vLjw@a@b[|y@jiA~iAnk@jLnwBrkAbpBkk@znAjnCgd@d@uAbVhQjNdTy[`M|EgW|b@_mApoEgUpuBzA~[lFjHnGcFgOzMpUro@|O_WuFyTvHrXuQzVwGll@iM^HfJlIeCb@`MdNgCrl@wvAxJvNleAaXnOvMvC}S|KC^paA_TnGKz_@_MvNcLwN?wj@aNmQ}J@n@l]og@CRjI~k@TeCfl@ee@jC`Rdd@r^ce@dMo@ed@xv@ud@eAcXeo@{h@b@?bGxb@tDxDrWsf@PWlF|`@@EhFam@lY_Lo@U_RoF|DmIwXfBkNiEtGqBwGzBkLsDrEaF}MyC`GnYh_AoJvF}`@ceAmErAfk@lgBpQ|nAhMeAyUevAnx@{c@pa@sD~FrZqZrJbChLxOiCyNxExAxIlSuDsRdGzAbInSyDuRtGlUxoAnBxF|f@}NpKs{@yPuC`QfBt@aJiFoYgMeBpL|@iB_KqPwCtOfB{Go_@xD}LtWztA}KzpA~zA{k@lYzvA`n@i`@tC~GwHn`Ayi@~Na^oMa^giBo{Ald@uMrWl`@dStCeKxL|Dvm@yQd@qLfZr`BcA`GuV{GjArTyJcKiNhG`K`\lQoTxW`Dhl@kUrCpQ{k@hP{AmIcCnK}AkJ|@nNm^yEyDlFhUlCuq@fNyp@w\kbAqkA_b@_mBmKj@`Pj{@gNhFnF_VqRtO}RcGo^uo@rNlk@lrAxdAc`@|A`CpXtMqNtWiApf@hf@kb@nCs[cPzZt^t^mCiEtRgNnGa|@iU~Czh@sPxFvChG~m@iZfZpY`Gn}@dLuJ}F{ZjEqSaL{MtG~Bl@kOxNcJrOrBWvVzImTtt@`Vxy@uZmQ`[`Y}\|l@gPzBnJ{i@lN|A~EbaA_WbIvFmIvNsXkEcY|HpS`Fs[tJdExVpMkDqAyH|FzF~OoDhBiJpDhS`R~K|CwNhR_@~Kqd@yG`c@lTxa@xFhg@oWpB{IfNq[`cB`DzV}\zc@ym@p|BqD~q@ch@l_@uYrj@jIjc@mJlDtC`\cOtBaNxd@he@dhBy]|`@B~n@gJ{Cyt@bWoFeH}m@p`@iI_FwHn^_LmB{IfPgFeO_RtBiO~a@}kAoz@i_@kgAsa@tGqk@}vAuiBgVw`BMcJrIuIgDcHtOdF_Ts`@dm@jEgUaTjFn@xQvGq@wHfG_DyReJjChQvXhYsKlQ_Y}OrYyXfLq\iMovAd_@q|FxwBamHlfDmc@z`@`DjYsj@krAik@{BgOe`@kEtC|Lf[eHBqNq_@{G~DhKjYcSgTkEvpApG{DFm`@tIxq@vFiDw@_m@dEfq@fICWgq@tEto@~H}DAoi@rFng@lGsFAg`@~Jd@nOvMzZ~{@cFuMeMAgl@~XieAznAu{BvbB}V`\~CdQmG{K}b@le@obBxiCar@`yBfDp_AqQtp@wC`p@xUlaA_IloAbBlr@tOld@uGftArI|lAsKbiAeBzmCjIpc@dHgD}GrDle@bb@qJhgAfS~pAqLbu@cFllDpNrn@d[xa@fB`aA`X~nBfZx]bg@nYlQT~L`t@fZ|LrAdLq{@n|@e~Az|Bcw@fiB[lq@iUruAaF|yBiOxw@LlaA}Y`|@tBxl@nLd\aMno@}vDkXugQuu\pAsqV{bMqACazEwnCHscCjYgk@_@qsbBf~o@|@epDedB?O}cgAk[areBYg_y@xSQPhNtV}L`GzGtaHmIl|g@[G_k@rvSR~r^qyAbkW|fEb}@|_@nqE~aA`aKz`DnjCbo@jbBrSvQzc@c`@tbE~vBSg@rmBnuD~lBrl@g@f@sv@bwAR~m@q`A",
//    "wfigE~}iqU~]jk@_J^qM|\_@~hAkU|_@cGje@zBlv@jPtRjHda@xp@nKfIhh@sB~b@dXhEtHdi@f[bFxDhO}OuIkGfR_`@v@uf@za@sCdQ|GlIyc@lg@xKvHgBtNmjArdAwLnd@tDlIc]tGqVf]kCdd@gIfDvBnPeMzIhHfOmQ|KqE{E}IfXqEeAuGnr@wQ{Jem@pN{Ql[ki@~Ou^qPgPpMeThu@cKnE~BlJaViK{T`c@cTpCm\dYuYrBeUnWn@nMbLlBaC`LgQvBkG`R{a@_JyNfUxA|ToEmIq`@_Fsu@va@aFmEoNtIwPiEwd@rJe`@ba@ca@xI_Pxa@gT~KmGfTeVxJwC|OuPeCwd@bVgSwBmQbIsNoHu_@l\cTAgUtNmZoBgNxPqb@zIaJh\aVjWlHz~@yzAqIyLhByOla@`G_}@aRap@zVaTpOq@~De[w_@cdAtR{J`i@sw@~Z`Fdd@mUbl@aKxFqQuEuNj[wa@xlAeQtn@m^vc@ww@|\mLti@sw@xf@q\tUiDn`CiqBheAasAzk@e`BdwBk}BlfEotGvg@eb@bHm^lPsGz_@wz@~QcFr\m{@zo@si@zImV`MTv\c^~OuTq@qO",
//    "qdenEfq{mUbExaPkAz{FcIhs@vH?FtaJrmGV?ju@rl@?e@dv@bl@D`@du@~k@m@?lv@zm@ORtkBhk@Mj@vv@xTQRzZdVo@DxZf_@W?d[nUTTh\\lUiCYxUpdAfDzBbKfd@vLjw@a@b[|y@jiA~iAnk@jLnwBrkAbpBkk@znAjnCgd@d@uAbVhQjNdTy[`M|EgW|b@_mApoEgUpuBzA~[lFjHnGcFgOzMpUro@|O_WuFyTvHrXuQzVwGll@iM^HfJlIeCb@`MdNgCrl@wvAxJvNleAaXnOvMvC}S|KC^paA_TnGKz_@_MvNcLwN?wj@aNmQ}J@n@l]og@CRjI~k@TeCfl@ee@jC`Rdd@r^ce@dMo@ed@xv@ud@eAcXeo@{h@b@?bGxb@tDxDrWsf@PWlF|`@@EhFam@lY_Lo@U_RoF|DmIwXfBkNiEtGqBwGzBkLsDrEaF}MyC`GnYh_AoJvF}`@ceAmErAfk@lgBpQ|nAhMeAyUevAnx@{c@pa@sD~FrZqZrJbChLxOiCyNxExAxIlSuDsRdGzAbInSyDuRtGlUxoAnBxF|f@}NpKs{@yPuC`QfBt@aJiFoYgMeBpL|@iB_KqPwCtOfB{Go_@xD}LtWztA}KzpA~zA{k@lYzvA`n@i`@tC~GwHn`Ayi@~Na^oMa^giBo{Ald@uMrWl`@dStCeKxL|Dvm@yQd@qLfZr`BcA`GuV{GjArTyJcKiNhG`K`\\lQoTxW`Dhl@kUrCpQ{k@hP{AmIcCnK}AkJ|@nNm^yEyDlFhUlCuq@fNyp@w\\kbAqkA_b@_mBmKj@`Pj{@gNhFnF_VqRtO}RcGo^uo@rNlk@lrAxdAc`@|A`CpXtMqNtWiApf@hf@kb@nCs[cPzZt^t^mCiEtRgNnGa|@iU~Czh@sPxFvChG~m@iZfZpY`Gn}@dLuJ}F{ZjEqSaL{MtG~Bl@kOxNcJrOrBWvVzImTtt@`Vxy@uZmQ`[`Y}\\|l@gPzBnJ{i@lN|A~EbaA_WbIvFmIvNsXkEcY|HpS`Fs[tJdExVpMkDqAyH|FzF~OoDhBiJpDhS`R~K|CwNhR_@~Kqd@yG`c@lTxa@xFhg@oWpB{IfNq[`cB`DzV}\\zc@ym@p|BqD~q@ch@l_@uYrj@jIjc@mJlDtC`\\cOtBaNxd@he@dhBy]|`@B~n@gJ{Cyt@bWoFeH}m@p`@iI_FwHn^_LmB{IfPgFeO_RtBiO~a@}kAoz@i_@kgAsa@tGqk@}vAuiBgVw`BMcJrIuIgDcHtOdF_Ts`@dm@jEgUaTjFn@xQvGq@wHfG_DyReJjChQvXhYsKlQ_Y}OrYyXfLq\\iMovAd_@q|FxwBamHlfDmc@z`@`DjYsj@krAik@{BgOe`@kEtC|Lf[eHBqNq_@{G~DhKjYcSgTkEvpApG{DFm`@tIxq@vFiDw@_m@dEfq@fICWgq@tEto@~H}DAoi@rFng@lGsFAg`@~Jd@nOvMzZ~{@cFuMeMAgl@~XieAznAu{BvbB}V`\\~CdQmG{K}b@le@obBxiCar@`yBfDp_AqQtp@wC`p@xUlaA_IloAbBlr@tOld@uGftArI|lAsKbiAeBzmCjIpc@dHgD}GrDle@bb@qJhgAfS~pAqLbu@cFllDpNrn@d[xa@fB`aA`X~nBfZx]bg@nYlQT~L`t@fZ|LrAdLq{@n|@e~Az|Bcw@fiB[lq@iUruAaF|yBiOxw@LlaA}Y`|@tBxl@nLd\\aMno@}vDkXugQuu\\pAsqV{bMqACazEwnCHscCjYgk@_@qsbBf~o@|@epDedB?O}cgAk[areBYg_y@xSQPhNtV}L`GzGtaHmIl|g@[G_k@rvSR~r^qyAbkW|fEb}@|_@nqE~aA`aKz`DnjCbo@jbBrSvQzc@c`@tbE~vBSg@rmBnuD~lBrl@g@f@sv@bwAR~m@q`A"
//];        


(async () => {	
    const browser = await chromium.launch();
    const context = await browser.newContext(); 
    const page = await context.newPage();
    
    await page.goto(url);

    await page.waitForTimeout(3000);

    var p = '_bg|EfnljQ?sDzAjATbAqBb@';
    var isInside = await page.evaluate((input) => {                    
        if(!input.geo)return;
                
        const lines = input.geo.map(p => google.maps.geometry.encoding.decodePath(p));        
		const point = new google.maps.LatLng(input.lat,input.lng);        
        var isInside = false;
        for (x in lines){
            var geo = new google.maps.Polygon({paths: lines[x]});
            if(google.maps.geometry.poly.containsLocation(point, geo)) isInside = true;
        }			                                
        return isInside;

    },input);
    console.log(isInside);
    await browser.close();
      
    var res = {'isInside': isInside}
    console.log('RES_CONTENT:'+JSON.stringify(res));
})();