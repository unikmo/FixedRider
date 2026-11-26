import {NextRequest,NextResponse} from "next/server";
import nodemailer from "nodemailer";
export const runtime="nodejs";
const recipient="hello@thepopmoment.com";
const buckets=new Map<string,{count:number;until:number}>();
function result(status:number,error:string){return NextResponse.json({error},{status})}
const clean=(v:unknown)=>typeof v==="string"?v.trim():"";
export async function POST(req:NextRequest){
 const origin=req.headers.get("origin");if(origin&&origin!==req.nextUrl.origin&&origin!=="https://thepopmoment.com"&&origin!=="https://www.thepopmoment.com")return result(403,"origin_not_allowed");
 if(!req.headers.get("content-type")?.startsWith("application/json"))return result(415,"json_required");
 const raw=await req.text();if(raw.length>16000)return result(413,"payload_too_large");
 let b;try{b=JSON.parse(raw)}catch{return result(400,"invalid_json")}
 const name=clean(b?.name),email=clean(b?.email),company=clean(b?.company),message=clean(b?.message);
 if(name.length<2||name.length>120||email.length>254||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)||/[\r\n]/.test(email)||company.length>160||message.length<5||message.length>4000||b?.privacy!==true)return result(400,"invalid_enquiry");
 const now=Date.now();for(const [k,v] of buckets){if(v.until<=now)buckets.delete(k)}const key=req.headers.get("x-forwarded-for")?.split(",")[0]?.trim()||"unknown";const previous=buckets.get(key);if(previous&&previous.count>=5)return result(429,"try_later");buckets.set(key,{count:(previous?.count||0)+1,until:previous?.until||now+600000});
 const host=process.env.POPMOMENT_SMTP_HOST||process.env.SMTP_HOST, user=process.env.POPMOMENT_SMTP_USER||process.env.SMTP_USER, pass=process.env.POPMOMENT_SMTP_PASSWORD||process.env.SMTP_PASSWORD||process.env.SMTP_PASS;
 const from=process.env.POPMOMENT_ENQUIRY_FROM||process.env.CONTACT_FROM_EMAIL||process.env.RESEND_FROM_EMAIL;
 const text=["The Pop Moment contact enquiry","Name: "+name,"Email: "+email,"Company: "+(company||"Not supplied"),"",message].join("\n");
 try{if(host&&user&&pass){const port=Number(process.env.POPMOMENT_SMTP_PORT||process.env.SMTP_PORT||465);const transport=nodemailer.createTransport({host,port,secure:port===465,requireTLS:port!==465,auth:{user,pass},connectionTimeout:8000,greetingTimeout:8000,socketTimeout:10000});const delivery=await transport.sendMail({from:{name:"The Pop Moment",address:user},to:recipient,replyTo:email,subject:"The Pop Moment website enquiry",text});if(!delivery.accepted?.length||delivery.rejected?.length)return result(503,"delivery_unavailable")}else if(process.env.RESEND_API_KEY&&from){const r=await fetch("https://api.resend.com/emails",{method:"POST",headers:{Authorization:"Bearer "+process.env.RESEND_API_KEY,"Content-Type":"application/json"},body:JSON.stringify({from,to:[recipient],reply_to:email,subject:"The Pop Moment website enquiry",text}),signal:AbortSignal.timeout(12000)});if(!r.ok)return result(503,"delivery_unavailable")}else{return result(503,"mail_not_configured")}return NextResponse.json({accepted:true},{status:201})}catch{return result(503,"delivery_unavailable")}
}
