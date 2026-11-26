import {LegalPage} from "../legal-content";
import ContactForm from "./ContactForm";
export const metadata={title:"Contact",alternates:{canonical:"https://thepopmoment.com/contact"}};
export default function Page(){return <LegalPage title="Contact" intro="Questions about operator access, safari pilots or privacy? Send us a message."><ContactForm/><p>Alternatively, email <a href="mailto:hello@thepopmoment.com">hello@thepopmoment.com</a>.</p></LegalPage>}
