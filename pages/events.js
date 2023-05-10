import { useState } from "react"
import { useRouter } from "next/router"
function Eventlist({eventlist}){
    const [events,setEvents]=useState(eventlist)
    const router=useRouter()

    const fetchSportsEvents = async()=>{
        const response = await fetch(`http://localhost:3000/events?category=sports`)
        const data=await response.json()
        setEvents(data)
        router.push('/events?category=sports',undefined,{shallow:true})
    }

    return(
        <>
            <button onClick={fetchSportsEvents}>Sports Events</button>
            <h1>List of events</h1><hr/>
            {
                events.map(event=>{
                    return (
                        <div key={event.id}>
                            <h2>
                                {event.id} {event.title} {event.date} | {event.category}
                            </h2>
                            <p>{event.description}</p>
                            <hr/>
                        </div>
                    )
                })
            }
        </>
    )
}

export default Eventlist

export async function getServerSideProps(context){
    const {query}=context
    const {category}=query
    const queryString=category ? 'category=sports' : ''
    const response = await fetch(`http://localhost:3000/events?${queryString}`)
    const data=await response.json()

    return {
        props:{
            eventlist:data,
        }
    }
}