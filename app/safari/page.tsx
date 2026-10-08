import Link from "next/link";
export const metadata={title:"Safari Intelligence | Guide-operated wildlife sightings",description:"Wildlife sightings for registered safari guides. No visitor registration."};
export default function SafariHome(){return <main className="safariPilotPage">
 <nav aria-label="Safari Intelligence"><Link href="/safari">Safari Intelligence</Link><Link href="/safari/session">Guide workspace</Link></nav>
 <header><small>SAFARI INTELLIGENCE</small><h1>Know where the animals have been seen.</h1><p>Live wildlife information for registered guides. Visitors do not create accounts or share personal details.</p><Link className="pill gold" href="/safari/session">Open guide workspace →</Link></header>
 <section className="how shell"><div className="sectionHead"><div><small>ONE GUIDE. ONE SAFARI.</small><h2>Focus on the animals your guests want to see.</h2></div></div>
 <div className="steps"><article><span>01</span><h3>Verify park entry</h3><p>Upload official entry evidence and declare the number of paying guests. Unclear evidence requires review.</p></article>
 <article><span>02</span><h3>Rank your top ten</h3><p>Choose up to ten animal species in priority order for this safari.</p></article>
 <article><span>03</span><h3>Follow fresh sightings</h3><p>See reported locations, confirmations and approximate participating vehicles nearby. Mark an animal Seen to stop its alerts.</p></article></div>
 <p>Safari Intelligence supplies sightings information, not navigation instructions. Guides remain responsible for driving and complying with park rules.</p></section>
 </main>}