import {NextRequest,NextResponse} from "next/server";
import crypto from "crypto";
import {sbEnv,sbFetch} from "../../../../../lib/server-supabase";
export async function POST(req:NextRequest){
 try{
  const token=req.cookies.get("fr_guide_session")?.value;
  if(!token)return NextResponse.json({error:"Guide sign-in required"},{status:401});
  const hash=crypto.createHash("sha256").update(token).digest("hex");
  const gr=await sbFetch("safari_guides?session_token_hash=eq."+hash+"&session_expires_at=gt."+encodeURIComponent(new Date().toISOString())+"&role=eq.guide&status=eq.verified&select=id&limit=1");
  if(!gr.ok)return NextResponse.json({error:"Guide verification unavailable"},{status:503});
  const guide=(await gr.json())[0];if(!guide)return NextResponse.json({error:"Verified guide required"},{status:403});
  const form=await req.formData(),id=String(form.get("sessionId")||""),file=form.get("receipt"),guests=Number(form.get("guestCount"));
  if(!/^[0-9a-f-]{36}$/i.test(id)||!(file instanceof File)||file.size===0||file.size>5*1024*1024||!["image/jpeg","image/png","image/webp","application/pdf"].includes(file.type)||!Number.isInteger(guests)||guests<1||guests>20)return NextResponse.json({error:"Valid session, guest count and receipt (max 5MB) required"},{status:400});
  const own=await sbFetch("safari_sessions?id=eq."+id+"&guide_id=eq."+guide.id+"&status=eq.review&select=id&limit=1");
  if(!own.ok||!(await own.json())[0])return NextResponse.json({error:"Review session not found"},{status:404});
  const env=sbEnv(),ext={"image/jpeg":"jpg","image/png":"png","image/webp":"webp","application/pdf":"pdf"}[file.type]||"bin",ref=guide.id+"/"+crypto.randomUUID()+"."+ext;
  const upload=await fetch(env.url+"/storage/v1/object/park-entry-receipts/"+ref,{method:"POST",headers:{apikey:env.key!,Authorization:"Bearer "+env.key!,"Content-Type":file.type,"x-upsert":"false"},body:await file.arrayBuffer()});
  if(!upload.ok)return NextResponse.json({error:"Upload failed"},{status:502});
  const update=await sbFetch("safari_sessions?id=eq."+id+"&guide_id=eq."+guide.id+"&status=eq.review",{method:"PATCH",headers:{Prefer:"return=representation"},body:JSON.stringify({entry_receipt_reference:ref,declared_guest_count:guests,receipt_guest_count:null,receipt_status:"review",updated_at:new Date().toISOString()})});
  if(!update.ok)return NextResponse.json({error:"Receipt update failed"},{status:502});
  await sbFetch("safari_receipt_events",{method:"POST",body:JSON.stringify({session_id:id,guide_id:guide.id,event_type:"resubmitted",declared_guest_count:guests,receipt_reference:ref})});
  return NextResponse.json({ok:true,message:"Replacement submitted for independent review."});
 }catch{return NextResponse.json({error:"Receipt service unavailable"},{status:503})}
}