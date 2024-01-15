import { redirect } from "next/navigation";

async function Home() {
    redirect('/login');
}

export default Home;