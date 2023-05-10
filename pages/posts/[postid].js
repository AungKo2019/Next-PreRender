import Link from 'next/link'
// import {useRouter} from 'next/router'
function Post({post}){
    // const router=useRouter()
    // if(router.isFallback){
    //     return <h1>Loading...</h1>
    // }
    return(
        <>
            <h2>
                {post.id} {post.title}
            </h2>
            <p>{post.body}</p>
        </>
    )
}

export default Post

export async function getStaticPaths(){
    // const response=await fetch('https://jsonplaceholder.typicode.com/posts')
    // const data=await response.json()

    // const paths=data.map(post=>{
    //     return {
    //         params:{
    //             postid:`${post.id}`
    //         }
    //     }
    // })
    return{
        // paths,
        paths:[
            {
                params:{ postid:'1'}
            },
            {
                params:{ postid:'2'}
            },
            {
                params:{ postid:'3'}
            },
           
            
        ],
        fallback:'blocking',
        
       
    }
}

export async function getStaticProps(context){
    const {params}=context
    console.log(context)
    console.log(params)
    const response=await fetch(`https://jsonplaceholder.typicode.com/posts/${params.postid}`)
    const data=await response.json()
    if(!data.id){
        return{
            notFound:true,
        }
    }
    return {
        props:{
            post:data
        },
        revalidate:10,
    }
}