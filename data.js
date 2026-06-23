/* ============================================================
   LONGEVITY LIFE ACADEMY — CEO Daily Marketing Snapshot
   Period: June 23–30 & July 2026
   CPL assumptions: Interest-Based $26 · Broad $17 · Bio-Age $30
   All figures linked to real Meta CRM ad set IDs.
   ============================================================ */
var LLA_CEO = {
  meta: {
    period_label: "Jun 23 – Jul 31, 2026",
    june_label: "Jun 23–30",
    july_label: "July (full)",
    cpl: { high: 26, normal: 17, bio: 30 },
    crm_base: "https://adsmanager.facebook.com/adsmanager/manage/adsets?act=&selected_adset_ids=",
    updated: "June 23, 2026"
  },

  // ── REAL CAMPAIGN AD SETS (with CRM IDs + strategic role) ──
  // leads = budget / cpl  (rounded in UI)
  adsets: [
    { id:"108776", name:"Adset 4_All_All_CPM_#108776", short:"Adset 4", status:"New",
      budget:550, cpl:26, age:"35–64", ageExact:"Ages 35–64", intent:"Interest-Based", socio:"Affluent — Top 5 / 10 / 10–25% income ZIPs",
      geo:"United States — nationwide", pricingView:"Sees $289/month (clear monthly price)",
      form:"Form 2 — $289/month", price:"Monthly", dest:"Lead Form", bio:false, accent:"#10B981", flagship:true,
      role:"Flagship affluent acquisition", issue:"Carries 29% of spend — primary interest-based, income-filtered engine driving the bulk of qualified monthly-price leads." },
    { id:"108719", name:"LLA Adset 2_All_All_CPM_#108719", short:"Adset 2", status:"Existing",
      budget:470, cpl:17, age:"35–64", ageExact:"Ages 35–64", intent:"Broad", socio:"Broad — no income filter",
      geo:"United States — nationwide", pricingView:"Sees $83/session (per-session framing)",
      form:"Form 1 — $83/Session", price:"Per-Session", dest:"Lead Form", bio:false, accent:"#06B6D4", flagship:false,
      role:"Volume / broad reach", issue:"Largest broad-targeting spend with no income filter — cheap leads but unqualified mix; candidate to trim under the 80/20 pricing shift." },
    { id:"108775", name:"Adset 3_All_All_CPM_#108775", short:"Adset 3", status:"New",
      budget:350, cpl:26, age:"35–64", ageExact:"Ages 35–64", intent:"Interest-Based", socio:"Affluent — Top 5 / 10 / 10–25% income ZIPs",
      geo:"United States — nationwide", pricingView:"Sees $289/month (clear monthly price)",
      form:"Form 2 — $289/month", price:"Monthly", dest:"Lead Form", bio:false, accent:"#34D399", flagship:false,
      role:"Affluent acquisition (scale-twin)", issue:"Second affluent interest-based set — same audience logic as #108776, validating the income-filtered thesis at scale." },
    { id:"108718", name:"LLA Adset 1_All_All_CPM_#108718", short:"Adset 1", status:"Existing",
      budget:320, cpl:17, age:"35–65+", ageExact:"Ages 35–65+", intent:"Broad", socio:"Broad — no income filter",
      geo:"United States — nationwide", pricingView:"Sees $83/session (per-session framing)",
      form:"Form 1 — $83/Session", price:"Per-Session", dest:"Lead Form", bio:false, accent:"#F59E0B", flagship:false,
      role:"Legacy broad / older age", issue:"Widest age (35–65+) with no filter — includes lower-intent older audiences; lowest-priority spend, reallocate toward affluent sets." },
    { id:"108777", name:"Adset 1_All_All_CPM_#108777", short:"Bio-Age", status:"New",
      budget:180, cpl:30, age:"35–65+", ageExact:"Ages 35–65+", intent:"Broad", socio:"Broad — no income filter",
      geo:"United States — nationwide", pricingView:"No price shown — “What's your bio age?” hook",
      form:"Website LP — “What's your bio age?”", price:"Bio-Age Hook", dest:"Website LP", bio:true, accent:"#A78BFA", flagship:false,
      role:"Awareness / curiosity test", issue:"Highest CPL ($30) — experimental bio-age hook to website LP; measures whether curiosity entry beats native forms before scaling." }
  ],

  // ── 80 / 20 PRICING STRATEGY TARGET (CEO directive) ──
  pricing_target: {
    pool: 1690,
    monthly:    { pct:80, budget:1352, cpl:26, leads:52 },
    per_session:{ pct:20, budget:338,  cpl:17, leads:20 },
    note: "CEO directive: shift presentation weight to the clear $289/month price (80%) and keep only 20% on the per-session ($83) framing."
  },

  // ── ALL MEASURES TAKEN (campaign optimization actions) ──
  measures: [
    { n:1, title:"Shifted budget into interest-based, income-filtered, core-age audiences",
      detail:"Moved spend out of pure broad reach and into interest-based targeting layered with Top 5 / 10 / 10–25% income ZIPs and a tightened 35–64 core age band. 58% of total daily budget now sits in three ad sets that did not exist a week ago.",
      ids:["108776","108775","108777"], tag:"Budget Reallocation", accent:"#10B981", metric:"58% of spend" },
    { n:2, title:"Added income-ZIP filtering for affluent targeting",
      detail:"Applied Top 5 / 10 / 10–25% household-income ZIP filtering to the two flagship interest-based ad sets so delivery concentrates on affluent US neighborhoods nationwide.",
      ids:["108775","108776"], tag:"Audience Quality", accent:"#34D399", metric:"48% affluent" },
    { n:3, title:"Narrowed age to the 35–64 core buyer band",
      detail:"New ad sets target a focused 35–64 age range — the core healthspan buyer — instead of the wider 35–65+ legacy band, lifting relevance on the highest-value cohort.",
      ids:["108776","108775","108719"], tag:"Age Targeting", accent:"#06B6D4", metric:"73% on 35–64" },
    { n:4, title:"Launched two new affluent interest-based ad sets",
      detail:"Stood up #108776 (flagship, $550/day) and #108775 ($350/day) as twin affluent interest-based engines to validate the income-filtered thesis at scale.",
      ids:["108776","108775"], tag:"New Ad Sets", accent:"#10B981", metric:"$900/day" },
    { n:5, title:"Launched a bio-age curiosity test to the website",
      detail:"Created #108777 ($180/day) driving to a website landing page with a “What's your bio age?” hook — testing whether a curiosity entry outperforms native lead forms before any scale-up.",
      ids:["108777"], tag:"Experiment", accent:"#A78BFA", metric:"$30 CPL test" },
    { n:6, title:"Reframed pricing toward the clear $289/month presentation",
      detail:"Per CEO 80/20 directive, shifted presentation weight so 80% of the lead-form pool sits behind the clear $289/month price (Form 2) and only 20% remains on the $83 per-session framing.",
      ids:["108775","108776","108718","108719"], tag:"Pricing", accent:"#F59E0B", metric:"80 / 20 split" }
  ]
};

// ── DERIVED TOTALS ──
LLA_CEO.totals = (function(){
  const a = LLA_CEO.adsets;
  const budget = a.reduce((s,x)=>s+x.budget,0);
  const leads  = a.reduce((s,x)=>s+x.budget/x.cpl,0);
  const blendedCpl = budget/leads;
  return { budget, leads: Math.round(leads), leads_raw: leads, blendedCpl };
})();

// ── MACRO GROUPINGS (budget + leads + %) ──
LLA_CEO.groups = (function(){
  const a = LLA_CEO.adsets, T = LLA_CEO.totals;
  function g(keyFn){
    const m = {};
    a.forEach(x=>{ const k=keyFn(x); (m[k]=m[k]||{budget:0,leads:0,ids:[]});
      m[k].budget+=x.budget; m[k].leads+=x.budget/x.cpl; m[k].ids.push(x.id); });
    return Object.entries(m).map(([k,v])=>({
      label:k, budget:v.budget, leads:+v.leads.toFixed(1),
      pctBudget:Math.round(v.budget/T.budget*100),
      pctLeads:Math.round(v.leads/T.leads_raw*100), ids:v.ids
    })).sort((x,y)=>y.budget-x.budget);
  }
  return {
    age:    g(x=> x.age==="35–64" ? "Ages 35–64 (core buyer)" : "Ages 35–65+ (incl. older)"),
    intent: g(x=> x.intent==="Interest-Based" ? "Interest-Based Targeting" : "Broad Targeting"),
    socio:  g(x=> x.socio.startsWith("Affluent") ? "Affluent — Top income ZIPs" : "Broad — no income filter"),
    price:  g(x=> x.bio ? "Bio-Age Hook" : (x.price==="Monthly" ? "Monthly $289" : "Per-Session $83")),
    status: g(x=> x.status)
  };
})();

// ── PERIOD PROJECTIONS (lead volume only) ──
LLA_CEO.periods = (function(){
  const T = LLA_CEO.totals;
  const mk = (days,label)=>({ days, label, budget: T.budget*days, leads: Math.round(T.leads_raw*days) });
  return { daily: mk(1,"Daily run-rate"), june: mk(8,"Jun 23–30"), july: mk(31,"July"), full: mk(39,"Full Period") };
})();

// ── DAILY LEAD QUOTA SCHEDULE (per campaign, per day) ──
LLA_CEO.daily_quota = (function(){
  const a = LLA_CEO.adsets, T = LLA_CEO.totals;
  return {
    perCampaign: a.map(x=>({ id:x.id, short:x.short, accent:x.accent, leads:+(x.budget/x.cpl).toFixed(1) }))
                   .sort((p,q)=>q.leads-p.leads),
    total: T.leads
  };
})();

// ── HEADLINE ANALYTICS (for KPI + insight cards) ──
LLA_CEO.analytics = (function(){
  const T = LLA_CEO.totals, G = LLA_CEO.groups, A = LLA_CEO.adsets;
  const hi = G.intent.find(g=>g.label.startsWith("Interest"));
  const broad = G.intent.find(g=>g.label.startsWith("Broad"));
  const aff = G.socio.find(g=>g.label.startsWith("Affluent"));
  const core = G.age.find(g=>g.label.startsWith("Ages 35–64"));
  const monthly = G.price.find(g=>g.label.startsWith("Monthly"));
  const affLeads = aff.leads;
  const costPerAffluentLead = aff.budget/affLeads;
  return {
    highIntentPct: hi.pctBudget, highIntentBudget: hi.budget, highIntentLeads: Math.round(hi.leads),
    broadPct: broad.pctBudget, broadBudget: broad.budget, broadLeads: Math.round(broad.leads),
    affluentPct: aff.pctBudget, affluentBudget: aff.budget, affluentLeads: Math.round(affLeads),
    corePct: core.pctBudget, coreBudget: core.budget, coreLeads: Math.round(core.leads),
    monthlyPct: monthly.pctBudget,
    costPerAffluentLead: +costPerAffluentLead.toFixed(2),
    blendedCpl: +T.blendedCpl.toFixed(2),
    newSpend: G.status.find(g=>g.label==="New").budget,
    newPct: G.status.find(g=>g.label==="New").pctBudget
  };
})();
