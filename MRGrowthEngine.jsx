// MR Growth Engine — v1
// Step 1: Offer Brain — editable source of truth. Pre-loaded with real positioning + proof.
// No generation yet; everything downstream will read from this state.

import React, { useState } from "react";

const C = {
  nightshade: "#3A2D4A",
  berry: "#6D2346",
  lavender: "#CEC3D1",
  cream: "#F7F4F1",
  ink: "#2A2230",
};

const DEFAULT_BRAIN = {
  identity:
    "A People & Culture leader who built AI transformation from inside the People seat — not a vendor, a peer. Led the AI-readiness shift at a 1,200-person omnichannel company and now helps other People leaders do the same.",
  thesis:
    "An AI-ready workforce isn't a tech purchase — it's a culture shift. People get redirected, not replaced.",
  model:
    "Three clocks moving at different speeds: Technology changes daily, People adapt weekly, Org design shifts yearly. Most transformations fail because they treat all three as one clock.",
  proof: [
    "AI Fluency Academy — designed and ran a multi-session fluency program reaching 150+ HQ team members inside a 1,200-person org. Real curriculum, real adoption.",
    "95 use cases across 14 teams — structured discovery catalogued 95 concrete AI use cases, organized into a three-horizon framework.",
    "60+ recoverable hours/month — discovery surfaced 60+ hours/month of recoverable capacity across teams.",
    "Shipped real tools — e.g. an HR inbox bot that freed ~12 hours/week across the People team. Builds, not just advises.",
    "AI Governance Board — stood up a governance body with a decision model and risk registry, so adoption scaled responsibly (EU AI Act / state-law aware).",
  ],
  offer:
    "Advisory for People leaders standing up AI transformation: fluency programs, use-case discovery, governance, and the culture work that makes it stick — drawn from having done it, not theorized it.",
  voice:
    "Warm, direct, personal. Story → takeaway. Learning in public. Signature thread: Innovate with Courage. Sign-off: — Shlanda. No vendor hype, no buzzword soup, no fake urgency.",
};

function Field({ label, value, onChange, rows = 3 }) {
  return (
    <label style={{ display: "block", marginBottom: 18 }}>
      <span
        style={{
          display: "block",
          fontFamily: "Arial, sans-serif",
          fontSize: 11,
          letterSpacing: 1,
          textTransform: "uppercase",
          color: C.berry,
          marginBottom: 6,
        }}
      >
        {label}
      </span>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        style={{
          width: "100%",
          boxSizing: "border-box",
          fontFamily: "Georgia, serif",
          fontSize: 14,
          lineHeight: 1.5,
          color: C.ink,
          padding: "10px 12px",
          border: "1px solid " + C.lavender,
          borderRadius: 6,
          background: "#fff",
          resize: "vertical",
        }}
      />
    </label>
  );
}

function ProspectInput({ label, value, onChange, placeholder }) {
  return (
    <label style={{ flex: "1 1 220px", display: "block", marginBottom: 14 }}>
      <span
        style={{
          display: "block",
          fontFamily: "Arial, sans-serif",
          fontSize: 11,
          letterSpacing: 1,
          textTransform: "uppercase",
          color: C.berry,
          marginBottom: 6,
        }}
      >
        {label}
      </span>
      <input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={{
          width: "100%",
          boxSizing: "border-box",
          fontFamily: "Georgia, serif",
          fontSize: 14,
          color: C.ink,
          padding: "10px 12px",
          border: "1px solid " + C.lavender,
          borderRadius: 6,
        }}
      />
    </label>
  );
}

export default function MRGrowthEngine() {
  const [brain, setBrain] = useState(DEFAULT_BRAIN);

  const setField = (k) => (v) => setBrain((b) => ({ ...b, [k]: v }));
  const setProof = (i) => (v) =>
    setBrain((b) => {
      const proof = [...b.proof];
      proof[i] = v;
      return { ...b, proof };
    });
  const addProof = () => setBrain((b) => ({ ...b, proof: [...b.proof, ""] }));
  const removeProof = (i) =>
    setBrain((b) => ({ ...b, proof: b.proof.filter((_, j) => j !== i) }));

  const [prospect, setProspect] = useState({
    name: "",
    title: "",
    company: "",
    industry: "",
    notes: "",
  });
  const setP = (k) => (e) =>
    setProspect((p) => ({ ...p, [k]: e.target.value }));

  const prospectReady =
    prospect.title.trim() && prospect.company.trim() && prospect.industry.trim();

  return (
    <div
      style={{
        fontFamily: "Georgia, serif",
        background: C.cream,
        minHeight: "100vh",
        color: C.ink,
        padding: "32px 24px",
      }}
    >
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <h1 style={{ color: C.nightshade, marginBottom: 2 }}>MR Growth Engine</h1>
        <p style={{ color: C.berry, marginTop: 0, fontStyle: "italic" }}>
          The Offer Brain — your source of truth. Edit anything; everything downstream reads from this.
        </p>

        <div
          style={{
            background: "#fff",
            border: "1px solid " + C.lavender,
            borderRadius: 10,
            padding: 24,
            marginTop: 20,
          }}
        >
          <Field label="Identity / positioning" value={brain.identity} onChange={setField("identity")} />
          <Field label="Core thesis" value={brain.thesis} onChange={setField("thesis")} rows={2} />
          <Field label="The model you teach" value={brain.model} onChange={setField("model")} />

          <span
            style={{
              display: "block",
              fontFamily: "Arial, sans-serif",
              fontSize: 11,
              letterSpacing: 1,
              textTransform: "uppercase",
              color: C.berry,
              marginBottom: 6,
            }}
          >
            Proof points
          </span>
          {brain.proof.map((p, i) => (
            <div key={i} style={{ display: "flex", gap: 8, marginBottom: 8 }}>
              <textarea
                value={p}
                onChange={(e) => setProof(i)(e.target.value)}
                rows={2}
                style={{
                  flex: 1,
                  boxSizing: "border-box",
                  fontFamily: "Georgia, serif",
                  fontSize: 14,
                  lineHeight: 1.5,
                  color: C.ink,
                  padding: "10px 12px",
                  border: "1px solid " + C.lavender,
                  borderRadius: 6,
                  resize: "vertical",
                }}
              />
              <button
                onClick={() => removeProof(i)}
                style={{
                  border: "1px solid " + C.lavender,
                  background: "#fff",
                  color: C.berry,
                  borderRadius: 6,
                  cursor: "pointer",
                  padding: "0 10px",
                  fontFamily: "Arial, sans-serif",
                }}
                aria-label="Remove proof point"
              >
                ×
              </button>
            </div>
          ))}
          <button
            onClick={addProof}
            style={{
              border: "1px dashed " + C.berry,
              background: "transparent",
              color: C.berry,
              borderRadius: 6,
              cursor: "pointer",
              padding: "6px 12px",
              fontFamily: "Arial, sans-serif",
              fontSize: 13,
              marginBottom: 18,
            }}
          >
            + Add proof point
          </button>

          <Field label="What you're selling (the offer)" value={brain.offer} onChange={setField("offer")} />
          <Field label="Voice / style" value={brain.voice} onChange={setField("voice")} />
        </div>

        <h2 style={{ color: C.nightshade, marginTop: 32, marginBottom: 2 }}>Prospect</h2>
        <p style={{ color: C.berry, marginTop: 0, fontStyle: "italic" }}>
          Who are we writing to? Title, company, and industry are required.
        </p>

        <div
          style={{
            background: "#fff",
            border: "1px solid " + C.lavender,
            borderRadius: 10,
            padding: 24,
            marginTop: 8,
          }}
        >
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <ProspectInput label="Name" value={prospect.name} onChange={setP("name")} placeholder="Jordan Lee" />
            <ProspectInput label="Title *" value={prospect.title} onChange={setP("title")} placeholder="Chief People Officer" />
          </div>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <ProspectInput label="Company *" value={prospect.company} onChange={setP("company")} placeholder="Northwind Retail" />
            <ProspectInput label="Industry *" value={prospect.industry} onChange={setP("industry")} placeholder="Multi-location retail" />
          </div>
          <label style={{ display: "block", marginTop: 4 }}>
            <span
              style={{
                display: "block",
                fontFamily: "Arial, sans-serif",
                fontSize: 11,
                letterSpacing: 1,
                textTransform: "uppercase",
                color: C.berry,
                marginBottom: 6,
              }}
            >
              Notes (optional)
            </span>
            <textarea
              value={prospect.notes}
              onChange={setP("notes")}
              rows={2}
              placeholder="Anything specific — a trigger event, mutual connection, recent announcement…"
              style={{
                width: "100%",
                boxSizing: "border-box",
                fontFamily: "Georgia, serif",
                fontSize: 14,
                lineHeight: 1.5,
                color: C.ink,
                padding: "10px 12px",
                border: "1px solid " + C.lavender,
                borderRadius: 6,
                resize: "vertical",
              }}
            />
          </label>
        </div>

        <p
          style={{
            fontFamily: "Arial, sans-serif",
            fontSize: 12,
            color: prospectReady ? C.berry : C.nightshade,
            opacity: prospectReady ? 1 : 0.6,
            marginTop: 14,
          }}
        >
          {prospectReady
            ? "Ready to generate. (Generation lands in Step 3.)"
            : "Next: fill title, company, and industry → then sequence generation."}
        </p>
      </div>
    </div>
  );
}
