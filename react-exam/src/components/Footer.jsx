import { CiFacebook } from "react-icons/ci";
import { PiYoutubeLogoLight } from "react-icons/pi";
import { IoLogoInstagram } from "react-icons/io";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
    return (
        <>
            <div className="footer">
                <div className="footer_first_row">
                    <div className="sem">
                        <h2>ABOUT</h2>
                        <p>Contact Us</p>
                        <p>About Us</p>
                        <p>Careers</p>
                        <p>Flipkart Stories</p>
                        <p>Press</p>
                        <p>Corporate Information</p>
                    </div>
                </div>
                <div className="footer_secound_row">
                    <div className="sem">
                        <h2>GROUP COMPANIES</h2>
                        <p>Myntra</p>
                        <p>Cleartrip</p>
                        <p>Shopsy</p>
                    </div>
                </div>
                <div className="footer_third_row">
                    <div className="sem">
                        <h2>HELP</h2>
                        <p>Payments</p>
                        <p>Shipping</p>
                        <p>Cancellation & Returns</p>
                        <p>FAQ</p>
                    </div>
                </div>
                <div className="footer_forth_row">
                    <div className="sem">
                        <h2>CONSUMER POLICY</h2>
                        <p>Cancellation & Returns</p>
                        <p>Terms Of UseSecurity</p>
                        <p>Security</p>
                        <p>Privacy</p>
                        <p>Sitemap</p>
                        <p>Grievance Redressal</p>
                        <p>EPR Compliance</p>
                    </div>
                </div>
                <div className="footer_fifth_row">
                    <div className="sem">
                    <h2>Mail Us:</h2>
                    <p>Flipkart Internet Private Limited, </p>
                    <p> Buildings Alyssa, Begonia & </p>
                    <p> Clove Embassy Tech Village, </p>
                    <p> Outer Ring Road, Devarabeesanahalli Village, </p>
                    <p> Bengaluru, 560103, </p>
                    <p> Karnataka, India</p>
                    </div>
                    <div className="social">
                        <h2>Social:</h2>
                        <div className="social_icon">
                            <i><CiFacebook /></i>
                            <i><FaXTwitter /></i>
                            <i><PiYoutubeLogoLight /></i>
                            <i><IoLogoInstagram /></i>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Footer;