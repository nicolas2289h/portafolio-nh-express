import { useState, useRef } from 'react';
import { motion } from 'framer-motion'
import { fadeIn } from '../variants'
import { BeatLoader } from "react-spinners";
import emailjs from '@emailjs/browser';

const initialValues = {
  user_name: '',
  user_email: '',
  message: ''
}

const Contact = () => {
  const [formData, setFormData] = useState(initialValues)
  const [errorName, setErrorName] = useState('')
  const [errorEmail, setErrorEmail] = useState('')
  const [estadoMensaje, setEstadoMensaje] = useState(false)
  const [loading, setLoading] = useState(false)
  const form = useRef();

  const resetEstadoMensaje = () => {
    setFormData(initialValues)
    setTimeout(() => {
      setEstadoMensaje(false)
    }, 3000);
  }

  const enviarEmail = () => {
    setLoading(true)
    emailjs.sendForm('service_mpbbpdl', 'template_8v57uuf', form.current, 'ywFaWQfBsDQGowwy2')
      .then((result) => {
        console.log(result.text)
        setEstadoMensaje(true)
        setLoading(false)
        resetEstadoMensaje()
      }, (error) => {
        console.log(error.text)
        setLoading(false)
      })
  }

  const verificarFormDataNombre = () => {
    const regexName = /^[a-zA-Z\s]*$/;

    if (!formData.user_name.match(regexName)) {
      setErrorName('El nombre no puede contener números ni símbolos');
      // document.querySelector('#inputNombre').focus()
      return
    } else {
      setErrorName('')
    }
  }

  const verificarFormDataEmail = () => {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.user_email.match(regexEmail) && formData.user_email.trim()) {
      setErrorEmail('Debe ser una correo electrónico válido.')
      // document.querySelector('#inputEmail').focus()
      return
    } else {
      setErrorEmail('')
    }
  }

  const handleSubmit = e => {
    e.preventDefault()

    if (errorEmail || errorName) return

    if (!formData.user_name.trim()) {
      document.querySelector('#inputNombre').value = ''
      document.querySelector('#inputNombre').focus()
    } else if (!formData.user_email.trim()) {
      document.querySelector('#inputEmail').value = ''
      document.querySelector('#inputEmail').focus()
    } else if (!formData.message.trim()) {
      document.querySelector('#textMensaje').value = ''
      document.querySelector('#textMensaje').focus()
    } else {
      enviarEmail()
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })

    // verificarFormDataNombre(e.target.value)
    // verificarFormDataEmail(e.target.value)
  }

  return (
    <section className='py-16 lg:section lg:mb-0 mb-[70px]' id='contact'>
      <div className="container mx-auto">
        <div className='flex flex-col lg:flex-row'>
          <motion.div className='flex-1 flex justify-start'
            variants={fadeIn('right', 0.3)}
            initial='hidden'
            whileInView={'show'}
            viewport={{ once: false, amount: 0.3 }}>
            <div>
              <h4 className='text-xl uppercase text-accent font-medium mb-2 tracking-wide'>Estemos en contacto</h4>
              <h2 className='text-[45px] lg:text-[90px] leading-none mb-12'>Trabajemos <br />Juntos!</h2>
            </div>
          </motion.div>
          <motion.form ref={form} action="" className='flex-1 border rounded-lg flex flex-col gap-y-3 pb-[60px] p-6 items-start bg-black bg-opacity-10'
            variants={fadeIn('right', 0.3)}
            initial='hidden'
            whileInView={'show'}
            viewport={{ once: false, amount: 0.3 }}
            onSubmit={handleSubmit}>
            <input id='inputNombre' type="text" placeholder='Nombre' name="user_name" value={formData.user_name} onChange={handleChange} onBlur={verificarFormDataNombre} className='bg-transparent border-b py-3 outline-none w-full placeholder:text-white focus:border-accent transition-all' />
            {errorName && <p className='text-white bg-red-700/25 border border-red-600 p-1 rounded-sm px-3'>{errorName}</p>}
            <input id='inputEmail' type="text" placeholder='Email' name="user_email" value={formData.user_email} onChange={handleChange} onBlur={verificarFormDataEmail} className='bg-transparent border-b py-3 outline-none w-full placeholder:text-white focus:border-accent transition-all' />
            {errorEmail && <p className='text-white bg-red-700/25 border border-red-600 p-1 rounded-sm px-3'>{errorEmail}</p>}
            <textarea id="textMensaje" cols="30" rows="1" placeholder='Mensaje' name="message" value={formData.message} onChange={handleChange} className='bg-transparent border-b py-8 outline-none w-full placeholder:text-white focus:border-accent transition-all resize-none mb-12'></textarea>
            <button disabled={loading} className='btn btn-lg'>{loading ? <BeatLoader color="#ffffff" size={11} /> : 'Enviar'}</button>
            {estadoMensaje ? <p>Mensaje enviado exitosamente!</p> : null}
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
