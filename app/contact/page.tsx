import {LegalPage} from "../legal-content";
import ContactForm from "./ContactForm";
export const metadata={title:"Contact",alternates:{canonical:"https://thepopmoment.com/contact"}};
export default function Page(){return <LegalPage compact title="Contact" intro="How can we help?"><ContactForm/></LegalPage>}
