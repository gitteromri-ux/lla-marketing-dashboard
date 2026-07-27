/* ============================================================
   LONGEVITY LIFE ACADEMY — CEO Daily Marketing Snapshot
   Period: June 30 – July 7, 2026
   CPL assumptions: Interest-Based $21 · Broad $14 · Bio-Age $23
   All figures linked to real Meta CRM ad set IDs.
   Audience directive (site-wide): Women · Ages 35–65 · Top 5% US household income.
   ============================================================ */
var LLA_CEO = {
  meta: {
    period_label: "Jun 30 – Jul 7, 2026",
    june_label: "Jun 30 – Jul 7",
    cpl: { high: 21, normal: 14, bio: 23 },
    crm_base: "https://adsmanager.facebook.com/adsmanager/manage/adsets?act=&selected_adset_ids=",
    updated: "June 30, 2026",
    explain_overview: "This page shows where our Meta ad money goes every day to bring in new leads for the Longevity Life Academy course. Every ad set now targets the same core audience: women, ages 35–65, in the top 5% US household-income tier. We run 5 ad sets (each is a separate targeting angle on that same audience). Together they spend about $1,720 a day and bring in roughly 100 leads a day. Below you can see how the budget splits by targeting type, the exact ages we reach, the price every audience now sees ($289/month across the board), and how many leads each ad set should deliver. Click any blue ID to open that ad set in Meta Ads Manager.",
    explain_measures: "This page lists every change we made to the campaign this past week to get higher-quality leads for less. In short: we locked every ad set to a single audience — women, ages 35–65, top 5% US household income — launched 3 brand-new ad sets, started a 'What's your bio age?' curiosity test, and moved 100% of lead forms to the clear $289/month price. Each card explains one change and links to the ad sets it affected."
  },

  // ── REAL CAMPAIGN AD SETS (with CRM IDs + strategic role) ──
  // Audience for EVERY ad set: Women · Ages 35–65 · Top 5% US household income.
  // leads = budget / cpl  (rounded in UI)
  adsets: [
    { id:"108776", name:"Adset 4_All_All_CPM_#108776", short:"Adset 4", status:"New",
      budget:510, cpl:21, age:"35–65", ageExact:"Women · Ages 35–65", intent:"Interest-Based", socio:"Affluent — Top 5% US household income",
      gender:"Female", geo:"United States — nationwide", pricingView:"Sees $289/month (clear monthly price)",
      form:"Form 2 — $289/month", price:"Monthly", dest:"Lead Form", bio:false, accent:"#10B981", flagship:true,
      role:"Flagship affluent acquisition", issue:"Carries 29% of spend — primary interest-based engine on the locked audience (women 35–65, top 5% income), driving the bulk of qualified monthly-price leads." },
    { id:"108719", name:"LLA Adset 2_All_All_CPM_#108719", short:"Adset 2", status:"Existing",
      budget:430, cpl:14, age:"35–65", ageExact:"Women · Ages 35–65", intent:"Broad", socio:"Affluent — Top 5% US household income",
      gender:"Female", geo:"United States — nationwide", pricingView:"Sees $289/month (clear monthly price)",
      form:"Form 2 — $289/month", price:"Monthly", dest:"Lead Form", bio:false, accent:"#06B6D4", flagship:false,
      role:"Volume within locked audience", issue:"Largest broad-targeting spend inside the locked audience (women 35–65, top 5% income) — cheapest leads at the clear $289/month price." },
    { id:"108775", name:"Adset 3_All_All_CPM_#108775", short:"Adset 3", status:"New",
      budget:320, cpl:21, age:"35–65", ageExact:"Women · Ages 35–65", intent:"Interest-Based", socio:"Affluent — Top 5% US household income",
      gender:"Female", geo:"United States — nationwide", pricingView:"Sees $289/month (clear monthly price)",
      form:"Form 2 — $289/month", price:"Monthly", dest:"Lead Form", bio:false, accent:"#34D399", flagship:false,
      role:"Affluent acquisition (scale-twin)", issue:"Second interest-based set on the same locked audience as #108776 — validating the top-5%-income thesis at scale." },
    { id:"108718", name:"LLA Adset 1_All_All_CPM_#108718", short:"Adset 1", status:"Existing",
      budget:295, cpl:14, age:"35–65", ageExact:"Women · Ages 35–65", intent:"Broad", socio:"Affluent — Top 5% US household income",
      gender:"Female", geo:"United States — nationwide", pricingView:"Sees $289/month (clear monthly price)",
      form:"Form 2 — $289/month", price:"Monthly", dest:"Lead Form", bio:false, accent:"#F59E0B", flagship:false,
      role:"Legacy broad on locked audience", issue:"Broad-targeting set now aligned to the locked audience (women 35–65, top 5% income); lowest-priority spend, reallocate toward flagship interest-based sets." },
    { id:"108777", name:"Adset 1_All_All_CPM_#108777", short:"Bio-Age", status:"New",
      budget:165, cpl:23, age:"35–65", ageExact:"Women · Ages 35–65", intent:"Broad", socio:"Affluent — Top 5% US household income",
      gender:"Female", geo:"United States — nationwide", pricingView:"No price shown — “What's your bio age?” hook",
      form:"Website LP — “What's your bio age?”", price:"Bio-Age Hook", dest:"Website LP", bio:true, accent:"#A78BFA", flagship:false,
      role:"Awareness / curiosity test", issue:"Highest CPL ($23) — experimental bio-age hook to website LP on the locked audience; measures whether curiosity entry beats native forms before scaling." }
  ],

  // ── PRICING PRESENTATION (CEO directive) ──
  pricing_target: {
    pool: 1555,
    note: "CEO directive: 100% of lead-form audiences see the clear $289/month price. The per-session framing has been retired \u2014 every form now presents the single monthly price."
  },

  // ── ALL MEASURES TAKEN (campaign optimization actions) ──
  measures: [
    { n:1, title:"Locked every ad set to a single audience: women, 35–65, top 5% US household income",
      detail:"Consolidated all 5 ad sets onto one demographic audience — female, ages 35–65, top 5% household-income tier in the United States. This replaces the mixed male/female, mixed-income legacy targeting and concentrates every dollar on the highest-intent, highest-affluence cohort.",
      ids:["108718","108719","108775","108776","108777"], tag:"Audience Lock", accent:"#10B981", metric:"100% aligned" },
    { n:2, title:"Applied top 5% US household-income filtering across every ad set",
      detail:"Every ad set now delivers only inside the top 5% US household-income tier — no broad-income spillover on any campaign, on any targeting type.",
      ids:["108718","108719","108775","108776","108777"], tag:"Audience Quality", accent:"#34D399", metric:"Top 5% only" },
    { n:3, title:"Set exact age band to 35–65 on every ad set",
      detail:"All ad sets are set to the 35–65 age range — the core healthspan buyer band — replacing the wider 35–65+ legacy range.",
      ids:["108718","108719","108775","108776","108777"], tag:"Age Targeting", accent:"#06B6D4", metric:"Ages 35–65" },
    { n:4, title:"Launched two new interest-based ad sets on the locked audience",
      detail:"Stood up #108776 (flagship, $510/day) and #108775 ($320/day) as twin interest-based engines running against the locked women-35–65-top-5%-income audience.",
      ids:["108776","108775"], tag:"New Ad Sets", accent:"#10B981", metric:"$830/day" },
    { n:5, title:"Launched a bio-age curiosity test to the website",
      detail:"Created #108777 ($165/day) driving to a website landing page with a “What's your bio age?” hook on the locked audience — testing whether a curiosity entry outperforms native lead forms before any scale-up.",
      ids:["108777"], tag:"Experiment", accent:"#A78BFA", metric:"$23 CPL test" },
    { n:6, title:"Moved 100% of lead forms to the clear $289/month price",
      detail:"Per CEO directive, retired the per-session framing entirely. Every lead-form audience now sees the single, clear $289/month price (Form 2) — one consistent offer across all four lead-form ad sets.",
      ids:["108775","108776","108718","108719"], tag:"Pricing", accent:"#F59E0B", metric:"100% monthly" }
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
    age:    g(x=> "Ages 35–65 (women, top 5% income)"),
    intent: g(x=> x.intent==="Interest-Based" ? "Interest-Based Targeting" : "Broad Targeting"),
    socio:  g(x=> "Affluent — Top 5% US household income"),
    price:  g(x=> x.bio ? "Bio-Age Hook" : "Monthly $289"),
    status: g(x=> x.status)
  };
})();

// ── PERIOD PROJECTIONS (lead volume only) ──
LLA_CEO.periods = (function(){
  const T = LLA_CEO.totals;
  const mk = (days,label)=>({ days, label, budget: T.budget*days, leads: Math.round(T.leads_raw*days) });
  const daily = mk(1,"Daily run-rate");
  const june  = mk(8,"Jun 30 – Jul 7"); june.reps = 4; june.leadsPerDay = T.leads;
  return { daily: daily, june: june };
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
  const core = G.age[0];
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
