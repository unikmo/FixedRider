import assert from "node:assert/strict";
const base=process.env.TEST_BASE_URL||"http://localhost:3000";
const checks=[["/","Stop driving blind."],["/imprint","TSquare Ventures LLC"],["/privacy","Privacy Policy"],["/terms","Terms of Service"],["/cookies","fr_guide_session"],["/contact","hello@thepopmoment.com"],["/safari/operator","Operator"],["/safari/guide-login","Guide"]];
for(const [path,needle] of checks){const r=await fetch(base+path,{redirect:"follow",signal:AbortSignal.timeout(20000)});assert.equal(r.status,200,path);const html=await r.text();assert.ok(html.toLowerCase().includes(needle.toLowerCase()),path+" missing "+needle);console.log("PASS",path);}
for(const path of ["/api/safari/operator-access","/api/safari/guide-access","/api/safari/sightings","/api/safari/session"]){const r=await fetch(base+path,{signal:AbortSignal.timeout(20000)});assert.equal(r.status,401,path);console.log("PASS unauthorized",path);}
const invalid=await fetch(base+"/api/contact",{method:"POST",headers:{"Content-Type":"application/json"},body:"{}",signal:AbortSignal.timeout(20000)});assert.equal(invalid.status,400);console.log("PASS contact rejects invalid input");
