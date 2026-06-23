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
      kpi("Interest-Based", A.highIntentPct+"%", "of spend", "<b>"+money(A.highIntentBudget)+"/day</b> · income-filtered affluent", "#10B981")+
      kpi("Affluent Reach", A.affluentPct+"%", "of spend", "Top income ZIPs · <b>"+money(A.costPerAffluentLead)+"</b> / affluent lead", "#A78BFA")+
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
    var G = D.groups;
    var intent = G.intent, socio = G.socio, age = G.age;
    var ib = intent.find(function(g){return g.label.indexOf("Interest")===0;});
    var br = intent.find(function(g){return g.label.indexOf("Broad")===0;});
    var aff = socio.find(function(g){return g.label.indexOf("Affluent")===0;});
    var bra = socio.find(function(g){return g.label.indexOf("Broad")===0;});
    var core = age.find(function(g){return g.label.indexOf("Ages 35–64")===0;});
    var older= age.find(function(g){return g.label.indexOf("Ages 35–65")===0;});

    var html = '<section><div class="sec-head"><h2>Audience &amp; Targeting</h2>'+
      '<span class="note">How the daily budget splits across targeting type, socio-economic tier &amp; exact age</span></div>'+
    '<div class="grid3">';

    // Targeting type
    html += '<div class="card"><h3>Targeting Type</h3><div class="csub">Interest-based vs broad reach</div>'+
      splitBar("Broad Targeting","no income filter",br.pctBudget,"#06B6D4",br.budget,br.leads)+
      splitBar("Interest-Based","income-filtered affluent",ib.pctBudget,"#10B981",ib.budget,ib.leads)+
    '</div>';

    // Socio-economic
    html += '<div class="card"><h3>Socio-Economic</h3><div class="csub">Household-income ZIP filtering</div>'+
      splitBar("Broad","no income filter",bra.pctBudget,"#F59E0B",bra.budget,bra.leads)+
      splitBar("Affluent","Top 5 / 10 / 10–25% income ZIPs",aff.pctBudget,"#A78BFA",aff.budget,aff.leads)+
    '</div>';

    // Age
    html += '<div class="card"><h3>Exact Age Bands</h3><div class="csub">Core buyer vs wider legacy range</div>'+
      splitBar("Ages 35–64","core healthspan buyer",core.pctBudget,"#10B981",core.budget,core.leads)+
      splitBar("Ages 35–65+","incl. older audiences",older.pctBudget,"#6B7AA0",older.budget,older.leads)+
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
    return '<section><div class="sec-head"><h2>June Plan · Jun 23–30</h2>'+
      '<span class="note">8-day plan on current spend — the targets the team is working toward</span></div>'+
      '<div class="jp">'+
        jpStat("4","reps","handling inbound leads through June 30","#10B981")+
        jpStat("100","leads / day","daily target across all 5 ad sets","#06B6D4")+
        jpStat(Math.round(j.leads).toLocaleString(),"leads in June","projected over the 8-day window","#A78BFA")+
        jpStat(money(j.budget),"spend in June","at the current $1,720/day run-rate","#F59E0B")+
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
      '<div class="seg">'+b("daily","Daily")+b("june","June Plan · Jun 23–30")+'</div></div>';
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
