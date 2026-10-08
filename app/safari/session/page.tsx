import ParkSession from "./ParkSession";
export default function Page(){
 return <div className="safariPilotPage">
  <nav aria-label="Safari Intelligence"><a href="/safari">Safari Intelligence</a><a href="/safari/pilot">Report a sighting</a></nav>
  <header><small>GUIDE-OPERATED WILDLIFE INTELLIGENCE</small><h1>Find what your guests came to see.</h1><p>One guide account. No visitor registration. Verify park entry, rank up to ten animals and receive relevant sightings. You decide where and how to drive.</p></header>
  <ParkSession/>
 </div>;
}