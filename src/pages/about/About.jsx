import {Alert, Button, CircularProgress, TextField} from "@mui/material";
import emailjs from '@emailjs/browser';
import "./About.css";
import {Form} from "react-router-dom";
import {useRef, useState} from "react";

function About() {
    const [isSending, setIsSending] = useState(false);
    const [showAlert, setShowAlert] = useState("");
    const form = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();

        setIsSending(true);

        emailjs.sendForm('service_act12fd', 'template_trgzk1q', form.current, {
            publicKey: "WnADqueCagRgiVFDH"
        })
            .then((result) => {
                console.log(result);
                setShowAlert("Message envoyé !");
                setIsSending(false);
            }, (error) => {
                console.log(error);
                setShowAlert("Erreur lors de l'envoi du message.");
                setIsSending(false);
            });
    }

    return (
        <>
            {showAlert !== "" && <Alert severity={showAlert.includes("Erreur") ? "error" : "success"} onClose={() => setShowAlert("")}>{showAlert}</Alert>}

            <h1>A propos</h1>
            <p>
                Je m'appelle Pierre-Jean Lefort, je suis étudiant en informatique à l'ENSIM.
            </p>

            <h2>Compétences</h2>
            <p>
                Actuellement, je suis en alternance chez <a href="https://o2.fr/" target="_blank">O2</a> en tant que développeur Full-Stack.
            </p>
            <p>
                Nous utilisons Angular ansi que NodeJS pour le développement de nos applications. Mais aussi des outils tel que Docker, Gitlab CI/CD, Jira, etc.
            </p>

            <h2>Me contacter</h2>
            <form ref={form} className="contactForm" onSubmit={handleSubmit}>
                <TextField label="Nom" variant="outlined" name="from_name" fullWidth />
                <TextField label="Email" type="email" variant="outlined" name="reply_to" fullWidth />
                <TextField label="Message" variant="outlined" name="message" fullWidth multiline rows={4} />

                {isSending ? <CircularProgress /> : <Button variant="contained" color="primary" type="submit">Envoyer</Button>}
            </form>

        </>
    )
}

export default About;