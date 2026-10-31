"use client";

import { useState } from "react";
import { addContactMessage, newId } from "@/lib/storage";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [done, setDone] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    addContactMessage({
      id: newId("msg"),
      name: name.trim(),
      email: email.trim(),
      subject: subject.trim(),
      message: message.trim(),
      createdAt: new Date().toISOString(),
    });
    setDone(true);
  }

  if (done) {
    return (
      <div className="tb-card p-8 text-center">
        <p className="text-lg font-medium text-emerald-800">
          Thank you. Your message has been saved locally.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="tb-card space-y-5 p-6 sm:p-8">
      <input
        required
        placeholder="Your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="tb-input"
      />
      <input
        required
        type="email"
        placeholder="Email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="tb-input"
      />
      <input
        required
        placeholder="Subject"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        className="tb-input"
      />
      <textarea
        required
        rows={5}
        placeholder="How can we help?"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="tb-input min-h-[140px] resize-y"
      />
      <button type="submit" className="tb-btn-primary w-full sm:w-auto">
        Send message
      </button>
    </form>
  );
}
