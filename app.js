/* ============================================================
   LLA Marketing Command Center — renderer
   ============================================================ */
(function(){
  var D = LLA_CEO, P = "daily";  // daily | june
  var crm = D.meta.crm_base;
  var $ = function(s,el){return (el||document).querySelector(s);};

  function money(n){return "$"+Math.round(n).toLocaleString();}
  function crmLink(id){return crm+id;}

  document.getElementById("updated").innerHTML = "Updated "+D.meta.updated+"<br>"+D.meta.period_label;
  document.getElementById("foot-updated").textContent = "Updated "+D.meta.updated;

  // ───────────────────────── OVERVIEW ─────────────────────────
  function periodData(){ return D.periods[P]; }

  function kpiBlock(){
    var A = D.analytics, T = D.totals, pd = periodData();
    var leadWord = P==="daily" ? "leads / day" : "leads ("+pd.label+")";
    var budWord  = P==="daily" ? "spend / day" : "spend ("+pd.label+")";
    return ''+
    '<section><div class="sec-head"><h2>Headline Metrics</h2>'+
      '<span class="note">All spend & lead figures · '+pd.label+'</span></div>'+
    '<div class="kpis">'+
      kpi("Daily Budget", money(pd.budget), "", "Across <b>5 active ad sets</b> · "+budWord, D.adsets[0].accent)+
      kpi("Lead Volume", Math.round(pd.leads).toLocaleString(), "leads", "Blended CPL <b>"+money(A.blendedCpl)+"</b> · "+leadWord, "#06B6D4")+
      kpi("Interest-Based", A.highIntentPct+"%", "of spend", "<b>"+money(A.highIntentBudget)+"/day</b> · women 35–65, top 5% income", "#10B981")+
      kpi("Locked Audience", "100%", "of spend", "Women · 35–65 · <b>Top 5% US household income</b>", "#A78BFA")+
    '</div></section>';
  }
  function kpi(lbl,val,unit,sub,accent){
    return '<div class="kpi" style="--accent:'+accent+'">'+
      '<div class="k-lbl">'+lbl+'</div>'+
      '<div class="k-val">'+val+(unit?'<span class="u">'+unit+'</span>':'')+'</div>'+
      '<div class="k-sub">'+sub+'</div></div>';
  }

  function splitBar(name,sub,pct,c,budget,leads){
    return '<div class="split">'+
      '<div class="top"><div class="name">'+name+'<span class="sm">'+sub+'</span></div>'+
      '<div class="pct" style="color:'+c+'">'+pct+'%</div></div>'+
      '<div class="track"><div class="fill" style="width:'+pct+'%;background:'+c+';--c:'+c+'"></div></div>'+
      '<div class="meta"><span><b>'+money(budget)+'</b>/day</span><span><b>~'+Math.round(leads)+'</b> leads/day</span></div>'+
    '</div>';
  }

  function targetingBlock(){
    var G = D.groups, T = D.totals;
    var intent = G.intent;
    var ib = intent.find(function(g){return g.label.indexOf("Interest")===0;});
    var br = intent.find(function(g){return g.label.indexOf("Broad")===0;});

    var html = '<section><div class="sec-head"><h2>Audience &amp; Targeting</h2>'+
      '<span class="note">One locked audience across every ad set — split only by targeting type</span></div>'+
    '<div class="grid3">';

    // Locked audience card
    html += '<div class="card"><h3>Locked Audience</h3><div class="csub">Every ad set — no exceptions</div>'+
      '<div class="lock-list">'+
        '<div class="lock-row"><span class="lock-lbl">Gender</span><b>Female only</b></div>'+
        '<div class="lock-row"><span class="lock-lbl">Age</span><b>35 – 65</b></div>'+
        '<div class="lock-row"><span class="lock-lbl">Income</span><b>Top 5% US household income</b></div>'+
        '<div class="lock-row"><span class="lock-lbl">Geo</span><b>United States — nationwide</b></div>'+
        '<div class="lock-row"><span class="lock-lbl">Coverage</span><b>100% of $'+Math.round(T.budget).toLocaleString()+'/day</b></div>'+
      '</div>'+
    '</div>';

    // Targeting type
    html += '<div class="card"><h3>Targeting Type</h3><div class="csub">Interest-based vs broad reach — inside the locked audience</div>'+
      splitBar("Broad Targeting","women 35–65, top 5% income",br.pctBudget,"#06B6D4",br.budget,br.leads)+
      splitBar("Interest-Based","women 35–65, top 5% income",ib.pctBudget,"#10B981",ib.budget,ib.leads)+
    '</div>';

    // Pricing view (replaces the age/socio split cards — those are now uniform)
    var monthlySpend = D.adsets.filter(function(x){return !x.bio;}).reduce(function(s,x){return s+x.budget;},0);
    var bioSpend = D.adsets.filter(function(x){return x.bio;}).reduce(function(s,x){return s+x.budget;},0);
    var monthlyPct = Math.round(monthlySpend/T.budget*100);
    var bioPct = Math.round(bioSpend/T.budget*100);
    var monthlyLeads = D.adsets.filter(function(x){return !x.bio;}).reduce(function(s,x){return s+x.budget/x.cpl;},0);
    var bioLeads = D.adsets.filter(function(x){return x.bio;}).reduce(function(s,x){return s+x.budget/x.cpl;},0);
    html += '<div class="card"><h3>Offer Presentation</h3><div class="csub">What the locked audience sees</div>'+
      splitBar("$289 / month","Form 2 — clear monthly price",monthlyPct,"#10B981",monthlySpend,monthlyLeads)+
      splitBar("Bio-Age Hook","website curiosity test",bioPct,"#A78BFA",bioSpend,bioLeads)+
    '</div>';

    html += '</div></section>';
    return html;
  }

  function adsetTable(){
    var rows = D.adsets.map(function(x){
      var statusChip = x.flagship
        ? '<span class="chip flag">★ Flagship · New</span>'
        : (x.status==="New" ? '<span class="chip new">New</span>' : '<span class="chip exist">Existing</span>');
      var intentChip = '<span class="chip" style="color:'+x.accent+';border-color:'+x.accent+'66">'+x.intent+'</span>';
      var leads = (x.budget/x.cpl);
      return '<tr>'+
        '<td><div class="idcell">'+
          '<a class="idlink" style="--ac:'+x.accent+'" href="'+crmLink(x.id)+'" target="_blank" rel="noopener">#'+x.id+' <span class="arr">↗</span></a>'+
          '<span class="adname">'+x.name+'</span>'+statusChip+
        '</div></td>'+
        '<td><div class="tagrow">'+intentChip+
          '<span class="chip">'+x.ageExact+'</span></div></td>'+
        '<td>'+x.socio+'</td>'+
        '<td><span class="price-pill">'+x.pricingView+'</span></td>'+
        '<td><div class="big-num">'+money(x.budget)+'</div><div class="tiny">'+x.geo+'</div></td>'+
        '<td><div class="big-num" style="color:'+x.accent+'">'+leads.toFixed(1)+'</div><div class="tiny">@ '+money(x.cpl)+' CPL · leads/day</div></td>'+
      '</tr>';
    }).join("");

    return '<section><div class="sec-head"><h2>Active Ad Sets</h2>'+
      '<span class="note">Real Meta CRM ad-set IDs — click any ID to open in Ads Manager</span></div>'+
    '<div class="tblwrap"><table>'+
      '<thead><tr><th>Campaign · CRM ID</th><th>Targeting &amp; Age</th><th>Socio-Economic</th><th>Pricing They See</th><th>Budget / Geo</th><th>Leads / Day</th></tr></thead>'+
      '<tbody>'+rows+'</tbody></table></div></section>';
  }

  function quotaBlock(){
    var q = D.daily_quota, max = Math.max.apply(null,q.perCampaign.map(function(x){return x.leads;}));
    var rows = q.perCampaign.map(function(x){
      var w = Math.round(x.leads/max*100);
      return '<div class="quota-row">'+
        '<div class="qid" style="background:'+x.accent+'">#'+x.id+'</div>'+
        '<div class="qbar"><div class="qfill" style="width:'+w+'%;background:'+x.accent+'">'+x.leads.toFixed(1)+'</div></div>'+
      '</div>';
    }).join("");
    return '<div class="card"><h3>Daily Lead Quota — per ad set</h3>'+
      '<div class="csub">Target leads each campaign should deliver per day · total ~<b style="color:#fff">'+q.total+' leads/day</b></div>'+
      rows+'</div>';
  }

  function pricingBlock(){
    var pt = D.pricing_target;
    return '<div class="card"><h3>Pricing Presentation</h3>'+
      '<div class="csub">What every lead-form audience sees — one clear price across the board</div>'+
      '<div class="price-hero">'+
        '<div class="ph-pct">100%</div>'+
        '<div class="ph-tx"><div class="ph-price">$289 <span>/ month</span></div>'+
          '<div class="ph-sub">All four lead-form ad sets — #108718 · #108719 · #108775 · #108776</div></div>'+
      '</div>'+
      '<div class="directive">'+pt.note+'</div>'+
    '</div>';
  }

  function renderOverview(){
    var el = document.getElementById("overview");
    el.innerHTML =
      explainer("In plain English", D.meta.explain_overview)+
      periodBar()+
      junePlan()+
      kpiBlock()+
      targetingBlock()+
      adsetTable()+
      '<section><div class="sec-head"><h2>Quotas &amp; Pricing</h2>'+
        '<span class="note">Daily delivery targets and the single $289/month pricing presentation</span></div>'+
        '<div class="grid2">'+quotaBlock()+pricingBlock()+'</div></section>';
    bindPeriod();
    requestAnimationFrame(function(){ /* trigger transitions */ });
  }

  function junePlan(){
    if(P!=="june") return "";
    var j = D.periods.june;
    return '<section><div class="sec-head"><h2>Plan · Jun 30 – Jul 7</h2>'+
      '<span class="note">8-day plan on current spend — the targets the team is working toward</span></div>'+
      '<div class="jp">'+
        jpStat("4","reps","handling inbound leads through Jul 7","#10B981")+
        jpStat("100","leads / day","daily target across all 5 ad sets","#06B6D4")+
        jpStat(Math.round(j.leads).toLocaleString(),"leads (Jun 30 – Jul 7)","projected over the 8-day window","#A78BFA")+
        jpStat(money(j.budget),"spend (Jun 30 – Jul 7)","at the current $1,720/day run-rate","#F59E0B")+
      '</div></section>';
  }
  function jpStat(big,lbl,sub,c){
    return '<div class="jp-card" style="--accent:'+c+'">'+
      '<div class="jp-big">'+big+'</div>'+
      '<div class="jp-lbl">'+lbl+'</div>'+
      '<div class="jp-sub">'+sub+'</div></div>';
  }

  function explainer(title, body){
    return '<div class="explain"><div class="ex-ic">i</div><div class="ex-tx">'+
      '<div class="ex-h">'+title+'</div><p>'+body+'</p></div></div>';
  }

  function periodBar(){
    function b(k,t){return '<button data-p="'+k+'" class="'+(P===k?'on':'')+'">'+t+'</button>';}
    return '<div class="period-bar"><span class="lbl">View</span>'+
      '<div class="seg">'+b("daily","Daily")+b("june","Plan · Jun 30 – Jul 7")+'</div></div>';
  }
  function bindPeriod(){
    document.querySelectorAll('.seg button').forEach(function(btn){
      btn.addEventListener("click",function(){ P=btn.getAttribute("data-p"); renderOverview(); });
    });
  }

  // ───────────────────────── MEASURES ─────────────────────────
  function renderMeasures(){
    var el = document.getElementById("measures");
    var cards = D.measures.map(function(m){
      var ids = m.ids.map(function(id){
        return '<a class="mid" style="--mac:'+m.accent+'" href="'+crmLink(id)+'" target="_blank" rel="noopener">#'+id+' ↗</a>';
      }).join("");
      return '<div class="measure" style="--accent:'+m.accent+'">'+
        '<div class="mnum">'+m.n+'</div>'+
        '<div class="mbody">'+
          '<div class="mhead"><span class="mtag">'+m.tag+'</span>'+
            '<span class="mmetric">'+m.metric+'</span></div>'+
          '<h3>'+m.title+'</h3>'+
          '<p>'+m.detail+'</p>'+
          '<div class="mids">'+ids+'</div>'+
        '</div></div>';
    }).join("");
    el.innerHTML =
      explainer("In plain English", D.meta.explain_measures)+
      '<section><div class="sec-head"><h2>All Measures Taken</h2>'+
        '<span class="note">Optimization actions applied to the Meta campaign · '+D.meta.updated+'</span></div>'+
        '<div class="measures">'+cards+'</div></section>';
  }

  // ───────────────────────── TABS ─────────────────────────
  document.querySelectorAll('.tab').forEach(function(t){
    t.addEventListener("click",function(){
      document.querySelectorAll('.tab').forEach(function(x){x.classList.remove("active");});
      document.querySelectorAll('.panel').forEach(function(x){x.classList.remove("show");});
      t.classList.add("active");
      document.getElementById(t.getAttribute("data-tab")).classList.add("show");
    });
  });

  renderOverview();
  renderMeasures();
})();
