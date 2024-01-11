import Link from "next/link"

function UserDropdown(userData: any) {
    return (
        <>
            {
                userData.role == 2
                    ?
                    <>
                        <button className="btn-hover w-full p-2">Account</button>
                        <button className="btn-hover w-full p-2"><Link href="/admin">Admin</Link></button>
                        <button className="btn-hover w-full p-2">Logout</button>
                    </>
                    :
                    <>
                        <button className="btn-hover w-full p-2">Account</button>
                        <button className="btn-hover w-full p-2">Logout</button>
                    </>

            }

        </>
    )
}

export default UserDropdown;