import Link from 'next/link'
function Home(){
    return (
        <>
            <h1>Next Js pre-rendering</h1>
            <Link href='/user'>Users</Link>
            <Link href='/posts'>Posts</Link>
        </>
    )
    
    
}

export default Home