export type ZanzibarZone={slug:string;name:string;aliases:string[]};
export const zanzibarZones:ZanzibarZone[]=[
["airport","Zanzibar Airport (ZNZ)",["airport","znz","abeid amani karume international airport"]],["stone-town","Stone Town",["stone town","park hyatt zanzibar","tembo house","zanzibar ferry terminal"]],["nungwi","Nungwi",["nungwi","langi langi","langi langi beach bungalows"]],["kendwa","Kendwa",["kendwa"]],["matemwe","Matemwe",["matemwe"]],["kiwengwa","Kiwengwa",["kiwengwa"]],["pwani-mchangani","Pwani Mchangani",["pwani mchangani"]],["pongwe","Pongwe",["pongwe"]],["uroa","Uroa",["uroa"]],["paje","Paje",["paje"]],["jambiani","Jambiani",["jambiani"]],["bwejuu","Bwejuu",["bwejuu"]],["dongwe","Dongwe",["dongwe"]],["pingwe","Pingwe",["pingwe","the rock restaurant"]],["michamvi","Michamvi",["michamvi"]],["chwaka","Chwaka",["chwaka"]],["kizimkazi","Kizimkazi",["kizimkazi"]],["makunduchi","Makunduchi",["makunduchi"]],["mtende","Mtende",["mtende"]],["jozani","Jozani",["jozani"]],["fumba","Fumba",["fumba"]],["mbweni","Mbweni",["mbweni"]],["bububu","Bububu",["bububu"]],["chuini","Chuini",["chuini"]],["mangapwani","Mangapwani",["mangapwani"]],["fukuchani","Fukuchani",["fukuchani"]],["kidoti","Kidoti",["kidoti"]],["kigomani","Kigomani",["kigomani"]],["kama","Kama",["kama"]],["kizimbani","Kizimbani",["kizimbani"]],["mbuyuni","Mbuyuni",["mbuyuni"]],["kijichi","Kijichi",["kijichi"]],["mtoni","Mtoni",["mtoni"]],["mazizini","Mazizini",["mazizini"]],["ferry-terminal","Zanzibar Ferry Terminal",["ferry","ferry terminal"]]
].map(([slug,name,aliases])=>({slug:slug as string,name:name as string,aliases:aliases as string[]}));

export type LockedFare={from:string;to:string;usd:number;status:"validation"|"locked";sourceNote:string};
export type MarketBenchmark={from:string;to:string;low:number;high:number;observed:string;source:string};
export const lockedFares:LockedFare[]=[
 {from:"airport",to:"stone-town",usd:15,status:"validation",sourceNote:"Existing FixedRider launch reference fare"},
 {from:"airport",to:"nungwi",usd:40,status:"validation",sourceNote:"Existing FixedRider launch reference fare"},
 {from:"airport",to:"paje",usd:40,status:"validation",sourceNote:"Existing FixedRider launch reference fare"}
];
export const marketBenchmarks:MarketBenchmark[]=[
 {from:"airport",to:"stone-town",low:15,high:25,observed:"2026-07/08",source:"Published Zanzibar operator rates"},
 {from:"airport",to:"nungwi",low:35,high:65,observed:"2026-07/08",source:"Published Zanzibar operator rates"},
 {from:"airport",to:"kendwa",low:35,high:65,observed:"2026-07/08",source:"Published Zanzibar operator rates"},
 {from:"airport",to:"paje",low:35,high:55,observed:"2026-07/08",source:"Published Zanzibar operator rates"},
 {from:"airport",to:"jambiani",low:35,high:55,observed:"2026-07/08",source:"Published Zanzibar operator rates"},
 {from:"airport",to:"matemwe",low:35,high:60,observed:"2026-07/08",source:"Published Zanzibar operator rates"},
 {from:"airport",to:"kiwengwa",low:35,high:60,observed:"2026-07/08",source:"Published Zanzibar operator rates"},
 {from:"airport",to:"kizimkazi",low:40,high:50,observed:"2026-07/08",source:"Published Zanzibar operator rates"},
 {from:"airport",to:"makunduchi",low:40,high:60,observed:"2026-07/08",source:"Published Zanzibar operator rates"},
 {from:"paje",to:"nungwi",low:55,high:65,observed:"2026",source:"Published beach-to-beach operator rates"},
 {from:"paje",to:"kendwa",low:55,high:65,observed:"2026",source:"Published beach-to-beach operator rates"},
 {from:"jambiani",to:"nungwi",low:55,high:65,observed:"2026",source:"Published beach-to-beach operator rates"},
 {from:"matemwe",to:"nungwi",low:40,high:40,observed:"2026",source:"Published beach-to-beach operator rate"},
 {from:"stone-town",to:"paje",low:35,high:45,observed:"2026",source:"Published Zanzibar operator rates"},
 {from:"stone-town",to:"nungwi",low:35,high:45,observed:"2026",source:"Published Zanzibar operator rates"},
 {from:"stone-town",to:"kendwa",low:35,high:45,observed:"2026",source:"Published Zanzibar operator rates"},
 {from:"paje",to:"michamvi",low:40,high:40,observed:"2026",source:"Published beach-to-beach operator rate"}
];
export function marketFor(a:string,b:string){const[x,y]=canonicalPair(a,b);return marketBenchmarks.find(f=>{const[fx,fy]=canonicalPair(f.from,f.to);return fx===x&&fy===y})}
export function zoneBySlug(slug:string){return zanzibarZones.find(z=>z.slug===slug)}
export function resolveZone(input:string){const q=input.trim().toLowerCase();return zanzibarZones.find(z=>z.name.toLowerCase()===q||z.aliases.some(a=>q.includes(a)))}
export function canonicalPair(a:string,b:string):[string,string]{const ai=zanzibarZones.findIndex(z=>z.slug===a),bi=zanzibarZones.findIndex(z=>z.slug===b);return ai<=bi?[a,b]:[b,a]}
export function fareFor(a:string,b:string){const[x,y]=canonicalPair(a,b);return lockedFares.find(f=>{const[fx,fy]=canonicalPair(f.from,f.to);return fx===x&&fy===y})}
export function routeSlug(a:string,b:string){const[x,y]=canonicalPair(a,b);return `${x}-to-${y}`}
export function uniqueRoutePairs(){return zanzibarZones.flatMap((a,i)=>zanzibarZones.slice(i+1).map(b=>[a,b] as const))}

export const seoPairSlugs=new Set([
"airport-to-stone-town","airport-to-nungwi","airport-to-kendwa","airport-to-matemwe","airport-to-kiwengwa","airport-to-paje","airport-to-jambiani","airport-to-kizimkazi",
"stone-town-to-nungwi","stone-town-to-kendwa","stone-town-to-matemwe","stone-town-to-kiwengwa","stone-town-to-paje","stone-town-to-jambiani",
"nungwi-to-paje","nungwi-to-jambiani","nungwi-to-matemwe","kendwa-to-paje","kendwa-to-jambiani","paje-to-michamvi"
]);
export function isSeoPair(a:string,b:string){return seoPairSlugs.has(routeSlug(a,b))}
export const destinationHubSlugs=["airport","stone-town","nungwi","kendwa","paje","jambiani","matemwe","kiwengwa"] as const;