const Footer: React.FC = () => {
    return (
        <>
            <footer className="bg-black text-pink-light dm-serif-display-regular text-center p-5">
                <div className="grid grid-cols-2 p-2.5">
                    <div className="pb-4">
                        <h3 className="text-2xl pb-4 underline">Business Hours</h3>
                        <p>Monday - Friday: 9:00 AM - 9:00 PM</p>
                        <p>Saturday - Sunday: 10:00 AM - 10:00 PM</p>
                    </div>
                    <div className="pb-4">
                        <h3 className="text-2xl pb-4 underline">Social Media</h3>
                        <p><a href="https://www.instagram.com/mollytea_global/">Instagram</a></p>
                        <p><a
                            href="https://www.douyin.com/user/MS4wLjABAAAA_Ru-9VC248Ojr5IiOSsab9L-AK68vwXuS57Ar2aiDTC-alnEKDCBsjv2NRge1_rG">Tiktok</a>
                        </p>
                    </div>
                </div>
                <hr className="p-4"/>
                <p>&copy; 2026 Molly Tea. All rights reserved.</p>
            </footer>
        </>
    );
};

export default Footer;