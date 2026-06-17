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

  const [tone, setTone] = useState("peer-proof");
  const [seq, setSeq] = useState(null);
  const [loading, setLoading] = useState(false);
  const [genError, setGenError] = useState("");

  const TONES = {
    "peer-proof": {
      label: "Peer-with-proof",
      guide:
        "Open peer-to-peer (one People leader to another) and work ONE concrete proof point in early. Balanced. The ask is a short conversation, not a demo.",
    },
    "pure-peer": {
      label: "Pure peer",
      guide:
        "Open entirely on a shared problem or insight. No proof points in the first email; save them for follow-ups. The ask is just a conversation.",
    },
    "direct-value": {
      label: "Direct value",
      guide:
        "Name the outcome and the meeting ask quickly. Lead with the result they'd get. Concise and confident, still warm — never hypey.",
    },
  };

  function buildPrompt() {
    const proofList = brain.proof.filter(Boolean).map((p) => "- " + p).join("\n");
    const who = prospect.name ? prospect.name + ", " : "";
    return [
      "You are writing a 4-step cold email sequence on behalf of a real person. Write in HER voice, never as a vendor.",
      "",
      "=== HER OFFER BRAIN (source of truth — do not invent beyond this) ===",
      "Identity: " + brain.identity,
      "Thesis: " + brain.thesis,
      "Model: " + brain.model,
      "Proof points:\n" + proofList,
      "Offer: " + brain.offer,
      "Voice: " + brain.voice,
      "",
      "=== PROSPECT ===",
      who + prospect.title + " at " + prospect.company + " (" + prospect.industry + ")",
      prospect.notes ? "Notes: " + prospect.notes : "",
      "",
      "=== TONE FOR THIS SEQUENCE ===",
      TONES[tone].guide,
      "",
      "=== RULES ===",
      "- Audience is a senior People leader (CPO/CHRO/Head of People). Write peer-to-peer.",
      "- Anchor to a plausible OKR this person likely owns this year. Be specific to their title + industry.",
      "- 4 emails: (1) cold open, (2) proof/value, (3) different angle, (4) soft breakup.",
      "- Each email: tight. Email 1 under 90 words. No buzzword soup, no fake urgency, no 'hope this finds you well'.",
      "- Only use proof points that are TRUE per the brain. Never invent numbers or fabricate details about their company.",
      "- Sign emails as '— Shlanda'.",
      "- Subjects: lowercase-ish, human, curiosity or relevance — not salesy.",
      "- send_day: integer day offset from first send (email 1 = 0).",
      "",
      "Return ONLY valid JSON, no markdown, no preamble, in exactly this shape:",
      '{"okr_anchor":"one line naming the OKR you anchored to","emails":[{"step":1,"label":"Cold open","subject":"...","body":"...","send_day":0},{"step":2,"label":"Proof / value","subject":"...","body":"...","send_day":3},{"step":3,"label":"Different angle","subject":"...","body":"...","send_day":7},{"step":4,"label":"Soft breakup","subject":"...","body":"...","send_day":12}]}',
    ]
      .filter(Boolean)
      .join("\n");
  }

  async function generate() {
    setLoading(true);
    setGenError("");
    setSeq(null);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 2000,
          messages: [{ role: "user", content: buildPrompt() }],
        }),
      });
      const data = await res.json();
      const text = (data.content || [])
        .filter((b) => b.type === "text")
        .map((b) => b.text)
        .join("\n")
        .replace(/```json|```/g, "")
        .trim();
      const parsed = JSON.parse(text);
      setSeq(parsed);
    } catch (err) {
      setGenError(
        "Couldn't generate a clean sequence. Try again — if it keeps failing, the model returned something unparseable."
      );
    } finally {
      setLoading(false);
    }
  }

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

        <div style={{ display: "flex", gap: 8, alignItems: "center", marginTop: 18, flexWrap: "wrap" }}>
          <span
            style={{
              fontFamily: "Arial, sans-serif",
              fontSize: 11,
              letterSpacing: 1,
              textTransform: "uppercase",
              color: C.berry,
              marginRight: 4,
            }}
          >
            Tone
          </span>
          {Object.entries(TONES).map(([key, t]) => (
            <button
              key={key}
              onClick={() => setTone(key)}
              style={{
                fontFamily: "Arial, sans-serif",
                fontSize: 13,
                padding: "6px 12px",
                borderRadius: 20,
                cursor: "pointer",
                border: "1px solid " + (tone === key ? C.berry : C.lavender),
                background: tone === key ? C.berry : "#fff",
                color: tone === key ? "#fff" : C.nightshade,
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        <button
          onClick={generate}
          disabled={!prospectReady || loading}
          style={{
            marginTop: 16,
            fontFamily: "Arial, sans-serif",
            fontSize: 15,
            fontWeight: "bold",
            padding: "12px 24px",
            borderRadius: 8,
            border: "none",
            cursor: prospectReady && !loading ? "pointer" : "not-allowed",
            background: prospectReady && !loading ? C.nightshade : C.lavender,
            color: "#fff",
          }}
        >
          {loading ? "Writing the sequence…" : "Generate sequence"}
        </button>

        {genError && (
          <p style={{ color: C.berry, fontFamily: "Arial, sans-serif", fontSize: 13, marginTop: 12 }}>
            {genError}
          </p>
        )}

        {seq && (
          <div style={{ marginTop: 24 }}>
            {seq.okr_anchor && (
              <p
                style={{
                  fontFamily: "Arial, sans-serif",
                  fontSize: 12,
                  color: C.berry,
                  background: "#fff",
                  border: "1px solid " + C.lavender,
                  borderRadius: 6,
                  padding: "8px 12px",
                }}
              >
                <strong>Anchored to:</strong> {seq.okr_anchor}
              </p>
            )}
            {(seq.emails || []).map((em) => (
              <div
                key={em.step}
                style={{
                  background: "#fff",
                  border: "1px solid " + C.lavender,
                  borderRadius: 10,
                  padding: 20,
                  marginBottom: 14,
                }}
              >
                <div
                  style={{
                    fontFamily: "Arial, sans-serif",
                    fontSize: 11,
                    letterSpacing: 1,
                    textTransform: "uppercase",
                    color: C.berry,
                    marginBottom: 8,
                  }}
                >
                  Email {em.step} · {em.label} · day {em.send_day}
                </div>
                <div style={{ fontWeight: "bold", color: C.nightshade, marginBottom: 8 }}>
                  Subject: {em.subject}
                </div>
                <div style={{ whiteSpace: "pre-wrap", lineHeight: 1.6, color: C.ink }}>
                  {em.body}
                </div>
              </div>
            ))}
          </div>
        )}

        {!seq && (
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
              ? "Ready. Pick a tone and generate."
              : "Fill title, company, and industry to enable generation."}
          </p>
        )}
      </div>
    </div>
  );
}
