export type ZanzibarZone={slug:string;name:string;aliases:string[]};
export const zanzibarZones:ZanzibarZone[]=[
["airport","Zanzibar Airport (ZNZ)",["airport","znz","abeid amani karume international airport"]],["stone-town","Stone Town",["stone town","park hyatt zanzibar","tembo house","zanzibar ferry terminal"]],["nungwi","Nungwi",["nungwi","langi langi","langi langi beach bungalows"]],["kendwa","Kendwa",["kendwa"]],["matemwe","Matemwe",["matemwe"]],["kiwengwa","Kiwengwa",["kiwengwa"]],["pwani-mchangani","Pwani Mchangani",["pwani mchangani"]],["pongwe","Pongwe",["pongwe"]],["uroa","Uroa",["uroa"]],["paje","Paje",["paje"]],["jambiani","Jambiani",["jambiani"]],["bwejuu","Bwejuu",["bwejuu"]],["dongwe","Dongwe",["dongwe"]],["pingwe","Pingwe",["pingwe","the rock restaurant"]],["michamvi","Michamvi",["michamvi"]],["chwaka","Chwaka",["chwaka"]],["kizimkazi","Kizimkazi",["kizimkazi"]],["makunduchi","Makunduchi",["makunduchi"]],["mtende","Mtende",["mtende"]],["jozani","Jozani",["jozani"]],["fumba","Fumba",["fumba"]],["mbweni","Mbweni",["mbweni"]],["bububu","Bububu",["bububu"]],["chuini","Chuini",["chuini"]],["mangapwani","Mangapwani",["mangapwani"]],["fukuchani","Fukuchani",["fukuchani"]],["kidoti","Kidoti",["kidoti"]],["kigomani","Kigomani",["kigomani"]],["kama","Kama",["kama"]],["kizimbani","Kizimbani",["kizimbani"]],["mbuyuni","Mbuyuni",["mbuyuni"]],["kijichi","Kijichi",["kijichi"]],["mtoni","Mtoni",["mtoni"]],["mazizini","Mazizini",["mazizini"]],["ferry-terminal","Zanzibar Ferry Terminal",["ferry","ferry terminal"]]
].map(([slug,name,aliases])=>({slug:slug as string,name:name as string,aliases:aliases as string[]}));

export type LockedFare={from:string;to:string;usd:number;status:"validation"|"locked";sourceNote:string};
export const lockedFares:LockedFare[]=[
 {from:"airport",to:"stone-town",usd:15,status:"validation",sourceNote:"Existing FixedRider launch reference fare"},
 {from:"airport",to:"nungwi",usd:40,status:"validation",sourceNote:"Existing FixedRider launch reference fare"},
 {from:"airport",to:"paje",usd:40,status:"validation",sourceNote:"Existing FixedRider launch reference fare"}
];
export function zoneBySlug(slug:string){return zanzibarZones.find(z=>z.slug===slug)}
export function resolveZone(input:string){const q=input.trim().toLowerCase();return zanzibarZones.find(z=>z.name.toLowerCase()===q||z.aliases.some(a=>q.includes(a)))}
export function canonicalPair(a:string,b:string):[string,string]{const ai=zanzibarZones.findIndex(z=>z.slug===a),bi=zanzibarZones.findIndex(z=>z.slug===b);return ai<=bi?[a,b]:[b,a]}
export function fareFor(a:string,b:string){const[x,y]=canonicalPair(a,b);return lockedFares.find(f=>{const[fx,fy]=canonicalPair(f.from,f.to);return fx===x&&fy===y})}
export function routeSlug(a:string,b:string){const[x,y]=canonicalPair(a,b);return `${x}-to-${y}`}
export function uniqueRoutePairs(){return zanzibarZones.flatMap((a,i)=>zanzibarZones.slice(i+1).map(b=>[a,b] as const))}
