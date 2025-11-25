import React from "react";
import "../styles/whatsapp.css";
export default function WhatsApp() {
    const whatsappNumber = "923455551970";
    const message = "Hello! I have a query.";

    return (
        <a
            href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="whatsapp-float"
        >
            <img
                src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
                alt="WhatsApp"
                className="whatsapp-icon"
            />
            <span className="whatsapp-text">Contact us
            </span>
        </a>
    );
}
