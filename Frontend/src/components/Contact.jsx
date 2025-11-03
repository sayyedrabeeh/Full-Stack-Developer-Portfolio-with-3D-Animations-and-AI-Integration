
import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";

 
const SERVICE_ID = "service_9yd1n4p";         
const ADMIN_TEMPLATE_ID = "template_hjl2usu"; 
const REPLY_TEMPLATE_ID = "template_kpvwb8m";  
const PUBLIC_KEY = "D9EU6dPNWw6qO0DF7";             

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendEmail = async (templateId, variables) => {
    return emailjs.send(SERVICE_ID, templateId, variables, PUBLIC_KEY);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus("Please fill all required fields.");
      return;
    }

    setLoading(true);
    setStatus("");

    const payload = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone || "Not provided",
      message: formData.message,
      date: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    };

    try {
       
      await sendEmail('template_hjl2usu', payload);
      await sendEmail('template_kpvwb8m', payload);

      setStatus("Thank you! We sent you a confirmation email.");
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      setStatus("Failed to send. Try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section  id = 'contact' className="relative min-h-screen flex items-center justify-center overflow-hidden  py-20">
      <div className="absolute top-20 left-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-2xl mx-auto px-6"
      >
        <div className="text-center mb-10">
          <h2 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-blue-200">
            Get in Touch
          </h2>
          <p className="mt-3 text-purple-300/70">We'll reply in 24 hours</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Input label="Name *" name="name" value={formData.name} onChange={handleChange} />
            <Input label="Email *" type="email" name="email" value={formData.email} onChange={handleChange} />
          </div>

          <Input label="Phone (Optional)" name="phone" value={formData.phone} onChange={handleChange} />

          <div>
            <label className="block text-sm font-medium text-purple-200 mb-2">Message *</label>
            <textarea
              name="message"
              rows={5}
              required
              value={formData.message}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-white/5 text-white placeholder-purple-300/50 border border-purple-500/20 focus:ring-2 focus:ring-purple-500/40 focus:border-transparent backdrop-blur-sm resize-none"
              placeholder="Type your message..."
            />
          </div>

          {status && (
            <p className={`text-center text-sm font-medium ${status.includes("Thank") ? "text-green-400" : "text-red-400"}`}>
              {status}
            </p>
          )}

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="w-full py-4 text-lg font-bold bg-gradient-to-r from-purple-600 via-purple-500 to-blue-600 rounded-xl text-white shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all disabled:opacity-70"
          >
            {loading ? "Sending..." : "Send Message"}
          </motion.button>
        </form>
      </motion.div>
    </section>
  );
}

function Input({ label, name, type = "text", value, onChange }) {
  return (
    <div>
      <label className="block text-sm font-medium text-purple-200 mb-2">{label}</label>
      <input
        type={type}
        name={name}
        required={label.includes("*")}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-3 rounded-xl bg-white/5 text-white placeholder-purple-300/50 border border-purple-500/20 focus:ring-2 focus:ring-purple-500/40 focus:border-transparent backdrop-blur-sm"
        placeholder={label.replace("*", "")}
      />
    </div>
  );
}