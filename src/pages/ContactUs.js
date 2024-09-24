import React, { useState } from 'react'
import header from "../assets/singing.webp"
import send from "../assets/send.svg"
import sent from "../assets/tick.svg"

const ContactUs = () => {

    const [sendState, setSendState] = useState({ message: "send", image: send, backgroundSize: "", pointerEvents: "" })

    const [formData, setFormData] = useState({ name: '', email: '', message: '' })

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
    
        setSendState({ message: "send", image: send, backgroundSize: "100% 0%", pointerEvents: "none" })
    
        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })
    
            if (response.ok) {
                await response.json()
                setFormData({ name: '', email: '', message: '' })
                setSendState({ message: "sent", image: sent, backgroundSize: "100% 0%", pointerEvents: "none" })
            } else {
                const result = await response.text()
                console.error('Error: ', result)
                alert('ERROR: ' + result)
                setSendState({ message: "send", image: send, backgroundSize: "", pointerEvents: "" })
            }
        } catch (error) {
            console.error('Error:', error)
            alert('An error occurred while sending the email.')
            setSendState({ message: "send", image: send, backgroundSize: "", pointerEvents: "" })
        }
    }
    

    return (
        <>
            <section className="header" style={{ backgroundImage: `url(${header})`, backgroundPosition: "bottom" }}>
                <div className="header-blur">
                    <div className="container-medium">
                        <h1 className="header-title">Contact Us</h1>
                    </div>
                </div>
            </section>

            <section className="contactus-main container-medium">
                <div className="contactFormArea">
                    <p>Any questions or queries? Don’t hesitate to ask!</p>
                    <form onSubmit={handleSubmit}>
                        <label className='contactFormLabel' htmlFor="name">Your name</label>
                        <input className="textinput input" type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />

                        <label className='contactFormLabel' htmlFor="email">Email address</label>
                        <input className="textinput input" type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />

                        <label className='contactFormLabel' htmlFor="message">Message</label>
                        <textarea className="textinput area" id="message" name="message" value={formData.message} onChange={handleChange} placeholder="Start typing..." style={{ height: "200px" }} required></textarea>

                        <button type="submit" className="sendbtn" style={{ backgroundSize: sendState.backgroundSize, pointerEvents: sendState.pointerEvents }}>
                            <div className="btntext">
                                <p>{sendState.message}</p>
                            </div>
                            <div className="btnsend" style={{ backgroundImage: `url(${sendState.image})` }}></div>
                        </button>
                    </form>
                </div>

                <div className="sidebar">
                    <iframe
                        className="contact-map"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6992.027811420826!2d153.29015359326266!3d-28.80865947506465!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b909e063a9af2f1%3A0xf871cef2c88053b0!2sLismore%20Baptist%20Church!5e0!3m2!1sen!2sau!4v1695274419760!5m2!1sen!2sau"
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Map of Lismore Baptist Church Location"
                    />
                    <p>Visit us at <em>96 Uralba St, Lismore NSW 2480</em></p>
                    <p className="mail">You can also contact us via our email address at</p>
                    <a href="mailto:office@lismorebaptist.org.au"><em>office@lismorebaptist.org.au</em></a>
                    <p className="call">Or call us at<br /><em>(02) 6622 4711</em></p>
                </div>
            </section>
        </>
    )
}

export default ContactUs
