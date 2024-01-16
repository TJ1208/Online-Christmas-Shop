import GetToken from "../../api/sirv-token";

const Footer = () => {
    return (
        <>
            <div className="flex mt-5">
                <footer className="border-slate-200 border-t-2 w-full flex items-center justify-between">
                    <a href="https://www.flaticon.com/free-icons/sparkles" title="sparkles icons">Sparkles icons created by Aranagraphics - Flaticon</a>
                    <GetToken />
                </footer>
            </div>

        </>

    )
}

export default Footer;