/* Campaign slides renderer — reads window.CAMPAIGN (pulled live from Meta) */
(function(){
  var C = window.CAMPAIGN; if(!C) return;
  var $ = function(s){return document.querySelector(s);};
  function M(n){return n>=1e6 ? (n/1e6).toFixed(1).replace(/\.0$/,'')+'M' : n>=1e3 ? Math.round(n/1e3)+'K' : String(n);}
  function sizeTxt(s){ if(!s) return '—'; return M(s[0])+'–'+M(s[1]); }
  function money(n){return '$'+Math.round(n).toLocaleString();}
  function st(a){return a.status==='ACTIVE' ? '<span class="pill on">Live</span>' : '<span class="pill off">Off</span>';}
  function reach(a){
    if(a.custom && a.custom.length) return '<span class="pill rt">Retargeting</span>';
    if(a.label.indexOf('TEST')===0) return '<span class="pill off">Test</span>';
    return a.size && a.size[0] > 60e6 ? '<span class="pill wide">Wide</span>' : '<span class="pill narrow">Interest + intent</span>';
  }
  function ruleHtml(a){
    if(a.custom && a.custom.length){
      return '<div class="r"><span>Only people already in our audiences</span></div><div class="list">'+a.custom.join(' · ')+'</div>';
    }
    if(!a.rules.length) return '<div class="r"><span>Broad — no interest rules</span></div>';
    return '<div class="r">'+a.rules.map(function(r){return r.replace(/ OR /g,' <b>OR</b> ');}).join(' <b>AND</b> ')+'</div>';
  }
  var live = C.adsets.filter(function(a){return a.status==='ACTIVE';});
  var liveBudget = live.reduce(function(s,a){return s+a.budget;},0);
  var adsTotal = C.adsets.reduce(function(s,a){return s+a.ads.length;},0);
  var adsLive = C.adsets.reduce(function(s,a){return s+a.ads.filter(function(x){return x.status==='ACTIVE';}).length;},0);

  /* ── Slide 1: Campaign Map ── */
  var rows = C.adsets.map(function(a){
    return '<tr class="'+(a.status==='ACTIVE'?'on':'off')+'">'+
      '<td><div class="cs-set">'+a.label+'<small>CRM #'+a.crm+' · '+a.id+'</small></div></td>'+
      '<td data-l="Status">'+st(a)+'</td>'+
      '<td data-l="Daily budget"><span class="cs-money">'+money(a.budget)+'<small>/day</small></span></td>'+
      '<td data-l="Audience">'+reach(a)+'</td>'+
      '<td data-l="Ages"><span class="cs-num">'+a.age+'</span></td>'+
      '<td data-l="Audience size"><span class="cs-num">'+sizeTxt(a.size)+'<small>people</small></span></td>'+
      '<td data-l="Ads"><span class="cs-num">'+a.ads.filter(function(x){return x.status==='ACTIVE';}).length+' / '+a.ads.length+'<small>live / loaded</small></span></td>'+
      '<td data-l="Role"><div class="cs-role">'+a.role+'</div></td>'+
    '</tr>';
  }).join('');
  $('#cmap').innerHTML =
    '<section class="cs-hero"><div class="cs-kicker">Slide 1 · Campaign map · pulled from Meta '+C.pulled+'</div>'+
    '<h2>Julie Masterclass — every ad set, one screen</h2>'+
    '<p>Campaign <b>'+C.name+'</b> (ID '+C.id+'). All ad sets optimise for <b>Purchase</b> on pixel 1440305917310328, lowest cost, Advantage+ audience <b>off</b>. Off sets hold ads but spend nothing until switched on.</p>'+
    '<div class="cs-stats">'+
      '<div class="cs-stat"><div class="v">'+C.adsets.length+'</div><div class="l">ad sets (incl. tests)</div></div>'+
      '<div class="cs-stat"><div class="v">'+live.length+'</div><div class="l">live right now</div></div>'+
      '<div class="cs-stat"><div class="v">'+money(liveBudget)+'</div><div class="l">live daily budget</div></div>'+
      '<div class="cs-stat"><div class="v">'+adsLive+' <span style="font-size:.5em;color:#8FB8E8">/ '+adsTotal+'</span></div><div class="l">ads live / loaded</div></div>'+
    '</div></section>'+
    '<section><div class="sec-head"><h2>All ad sets</h2><span class="note">Audience size = Meta monthly-active estimate for the saved targeting (US)</span></div>'+
    '<div class="tblwrap cs"><table class="cs-table"><thead><tr><th>Ad set</th><th>Status</th><th>Budget</th><th>Audience</th><th>Ages</th><th>Size</th><th>Ads</th><th>Role</th></tr></thead><tbody>'+rows+'</tbody></table></div>'+
    '<div class="cs-foot">Set 01 is frozen until 3 Oct 18:32 IDT. Set 03 targeting changed 2 Oct 18:26 IDT. Sets 04 / 05 / 06 and both TEST sets are paused ($10 placeholders; tests $60 / $500 never spent live).</div></section>';

  /* ── Slide 2: Settings ── */
  var cards = C.adsets.map(function(a){
    var on = a.status==='ACTIVE';
    return '<article class="cs-card '+(on?'on':'off')+'">'+
      '<div class="cs-card-head"><div class="t">'+a.label+' '+st(a)+'<small>'+a.name+'</small></div>'+
      '<div class="b"><div class="m">'+money(a.budget)+'<small>/day</small></div></div></div>'+
      '<div class="cs-kv">'+
        '<div><div class="k">Ages</div><div class="v">'+a.age+'</div></div>'+
        '<div><div class="k">Location</div><div class="v sm">'+a.geo+'</div></div>'+
        '<div><div class="k">Audience size</div><div class="v '+(a.size&&a.size[0]>60e6?'wide':'narrow')+'">'+sizeTxt(a.size)+'</div></div>'+
        '<div><div class="k">Advantage+ audience</div><div class="v">'+a.aplus+'</div></div>'+
        '<div><div class="k">Placements</div><div class="v sm">'+a.placements+'</div></div>'+
        '<div><div class="k">Optimisation</div><div class="v sm">'+a.opt+' · '+a.bid+(a.learning?' · '+a.learning.toLowerCase():'')+'</div></div>'+
      '</div>'+
      '<div class="cs-rule"><div class="k">Who sees it · '+reach(a)+'</div>'+ruleHtml(a)+'</div>'+
    '</article>';
  }).join('');
  $('#csettings').innerHTML =
    '<section class="cs-hero"><div class="cs-kicker">Slide 2 · Ad set settings</div><h2>How each ad set is configured</h2>'+
    '<p><b>Interest + intent</b> = 41 longevity interests <b>AND</b> a buying signal (Engaged Shoppers / top-income ZIPs). <b>Wide</b> = 70M+ people. <b>Retargeting</b> = our own site, cart, lead and video audiences only.</p></section>'+
    '<section><div class="cs-grid">'+cards+'</div></section>';

  /* ── Slide 3: Ads by ad set ── */
  var blocks = C.adsets.map(function(a){
    var on = a.status==='ACTIVE';
    var ads = a.ads.length ? '<div class="cs-ads">'+a.ads.map(function(ad){
      var liveAd = ad.status==='ACTIVE';
      return '<div class="cs-ad '+(liveAd?'on':'off')+(ad.kind==='Static'?' static':'')+'"><div class="ph"><img src="'+ad.img+'" alt="'+ad.name+'" loading="lazy">'+
        '<span class="st">'+(liveAd?'<span class="pill on">Live</span>':'<span class="pill off">Off</span>')+'</span><span class="kd">'+ad.kind+'</span></div>'+
        '<div class="nm">'+ad.name+'<small>Ad '+ad.id+'</small></div></div>';
    }).join('')+'</div>' : '<div class="cs-empty">No ads loaded in this ad set</div>';
    return '<section class="cs-setblock '+(on?'on':'off')+'"><div class="cs-sb-head"><div class="t">'+a.label+'</div>'+st(a)+
      '<div class="cfg">'+money(a.budget)+'/day · '+a.age+' · '+a.geo+' · '+(a.custom&&a.custom.length?'retargeting':(a.rules.length?a.rules.join(' AND '):'broad'))+'</div>'+
      '<div class="cnt">'+a.ads.filter(function(x){return x.status==='ACTIVE';}).length+' live · '+a.ads.length+' loaded</div></div>'+ads+'</section>';
  }).join('');
  $('#cads').innerHTML =
    '<section class="cs-hero"><div class="cs-kicker">Slide 3 · Ads by ad set · real creative previews</div><h2>Which ads sit in which ad set</h2>'+
    '<p>Previews are the actual square assets on each ad (video ads show their cover frame). Dimmed = paused. UGC covers in Sets 03 and 04 were replaced on 3 Oct; Set 06 keeps the original Julie cover.</p></section>'+blocks;
})();
(function(){var u=document.getElementById("updated");if(u&&window.CAMPAIGN){u.innerHTML="Campaign data "+window.CAMPAIGN.pulled+"<br>Overview/Measures tabs: Jun 30 – Jul 7 snapshot";}
var f=document.getElementById("foot-updated");if(f&&window.CAMPAIGN){f.textContent="Campaign slides pulled from Meta "+window.CAMPAIGN.pulled;}})();
