import React, { useState, useRef } from "react";
import {
  type CountryType,
  type PhoneDataType,
  type StepOtpPropsType,
  type StepPhonePropsType,
  type StepProfilePropsType,
  type StepSuccessPropsType,
} from "../../../utils/types";
import { CameraIcon, CheckIcon, WaIcon } from "../../../assets/icons";

const COUNTRY_CODES: CountryType[] = [
  { code: "+1", flag: "🇺🇸", name: "United States" },
  { code: "+44", flag: "🇬🇧", name: "United Kingdom" },
  { code: "+91", flag: "🇮🇳", name: "India" },
  { code: "+92", flag: "🇵🇰", name: "Pakistan" },
  { code: "+49", flag: "🇩🇪", name: "Germany" },
  { code: "+33", flag: "🇫🇷", name: "France" },
  { code: "+55", flag: "🇧🇷", name: "Brazil" },
  { code: "+81", flag: "🇯🇵", name: "Japan" },
  { code: "+86", flag: "🇨🇳", name: "China" },
  { code: "+971", flag: "🇦🇪", name: "UAE" },
];

// ── Step 1 ──────────────────────────────────────────────
function StepPhone({ onNext }: StepPhonePropsType) {
  const [phone, setPhone] = useState<string>("");
  const [country, setCountry] = useState<CountryType>(COUNTRY_CODES[0]);
  const [open, setOpen] = useState<boolean>(false);
  const [agreed, setAgreed] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const ready = phone.length >= 6 && agreed;

  const submit = () => {
    if (!ready) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onNext({ phone, country });
    }, 1400);
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-bold text-white tracking-tight">
          Enter your number
        </h2>
        <p className="text-sm text-white/40 mt-1 leading-relaxed">
          WhatsApp will send an SMS to verify your phone number.
        </p>
      </div>

      {/* Country */}
      <div className="relative">
        <label className="block text-xs font-semibold tracking-widest text-white/40 uppercase mb-2">
          Country
        </label>
        <button
          onClick={() => setOpen((o) => !o)}
          className="w-full flex items-center justify-between bg-white/5 border border-white/10 rounded-2xl px-4 py-3.5 text-white text-sm hover:border-green-500/40 transition-colors"
        >
          <span>
            {country.flag}&nbsp;&nbsp;{country.name}
          </span>
          <span className="text-white/30 text-xs">{open ? "▲" : "▼"}</span>
        </button>
        {open && (
          <div className="absolute z-20 mt-1.5 w-full bg-slate-900 border border-white/10 rounded-2xl overflow-hidden shadow-2xl max-h-52 overflow-y-auto">
            {COUNTRY_CODES.map((c) => (
              <button
                key={c.code}
                onClick={() => {
                  setCountry(c);
                  setOpen(false);
                }}
                className="w-full flex items-center justify-between px-4 py-3 text-sm text-white hover:bg-green-500/10 border-b border-white/5 last:border-0 transition-colors"
              >
                <span>
                  {c.flag}&nbsp;&nbsp;{c.name}
                </span>
                <span className="text-green-400 font-mono text-xs">
                  {c.code}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Phone */}
      <div>
        <label className="block text-xs font-semibold tracking-widest text-white/40 uppercase mb-2">
          Phone Number
        </label>
        <div className="flex gap-2">
          <div className="flex items-center bg-white/5 border border-white/10 rounded-2xl px-4 text-green-400 font-mono text-sm whitespace-nowrap">
            {country.code}
          </div>
          <input
            type="tel"
            value={phone}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPhone(e.target.value.replace(/\D/g, ""))
            }
            placeholder="000 000 0000"
            className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-4 py-3.5 text-white text-sm font-mono tracking-widest placeholder-white/20 outline-none focus:border-green-500/50 transition-colors"
          />
        </div>
      </div>

      {/* Terms */}
      <div className="flex items-start gap-3">
        <button
          onClick={() => setAgreed((a) => !a)}
          className={`mt-0.5 w-5 h-5 min-w-5 rounded-md border-2 flex items-center justify-center transition-all ${agreed ? "bg-green-500 border-green-500" : "border-white/20"}`}
        >
          {agreed && <CheckIcon />}
        </button>
        <p className="text-xs text-white/35 leading-relaxed">
          I agree to the{" "}
          <span className="text-green-400 cursor-pointer hover:text-green-300 transition-colors">
            Terms of Service
          </span>{" "}
          and{" "}
          <span className="text-green-400 cursor-pointer hover:text-green-300 transition-colors">
            Privacy Policy
          </span>
        </p>
      </div>

      <button
        onClick={submit}
        disabled={!ready || loading}
        className={`w-full py-4 rounded-2xl text-sm font-bold tracking-wide transition-all duration-300 ${
          ready
            ? "bg-linear-to-r from-green-500 to-emerald-600 text-white shadow-lg shadow-green-500/30 hover:shadow-green-500/50 hover:scale-[1.01] active:scale-[0.99]"
            : "bg-white/8 text-white/25 cursor-not-allowed"
        }`}
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Sending…
          </span>
        ) : (
          "Send verification code →"
        )}
      </button>
    </div>
  );
}

// ── Step 2 ──────────────────────────────────────────────
function StepOtp({ data, onNext }: StepOtpPropsType) {
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState<boolean>(false);
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  const filled = otp.every((v) => v !== "");

  const change = (val: string, i: number) => {
    if (!/^\d?$/.test(val)) return;
    const next = [...otp];
    next[i] = val;
    setOtp(next);
    if (val && i < 5) refs.current[i + 1]?.focus();
  };

  const keydown = (e: React.KeyboardEvent<HTMLInputElement>, i: number) => {
    if (e.key === "Backspace" && !otp[i] && i > 0) refs.current[i - 1]?.focus();
  };

  const verify = () => {
    if (!filled) return;
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      onNext();
    }, 1200);
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-bold text-white tracking-tight">
          Verify your number
        </h2>
        <p className="text-sm text-white/40 mt-1">Code sent to</p>
        <p className="text-sm font-mono font-semibold text-green-400 mt-0.5">
          {data.country.code} {data.phone}
        </p>
      </div>

      <div className="flex gap-2 justify-between">
        {otp.map((v, i) => (
          <input
            key={i}
            ref={(el) => {
              refs.current[i] = el;
            }}
            maxLength={1}
            value={v}
            onChange={(e) => change(e.target.value, i)}
            onKeyDown={(e) => keydown(e, i)}
            className={`w-12 h-14 text-center text-xl font-bold font-mono rounded-2xl border-2 outline-none transition-all
              ${
                v
                  ? "bg-green-500/10 border-green-500/60 text-white"
                  : "bg-white/5 border-white/10 text-white focus:border-green-500/50"
              }`}
          />
        ))}
      </div>

      <button
        onClick={verify}
        disabled={!filled || loading}
        className={`w-full py-4 rounded-2xl text-sm font-bold tracking-wide transition-all duration-300 ${
          filled
            ? "bg-linear-to-r from-green-500 to-emerald-600 text-white shadow-lg shadow-green-500/30 hover:scale-[1.01]"
            : "bg-white/8 text-white/25 cursor-not-allowed"
        }`}
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Verifying…
          </span>
        ) : (
          "Verify →"
        )}
      </button>

      <p className="text-center text-xs text-white/30">
        Didn't receive it?{" "}
        <span className="text-green-400 cursor-pointer hover:text-green-300 transition-colors font-medium">
          Resend code
        </span>
      </p>
    </div>
  );
}

// ── Step 3 ──────────────────────────────────────────────
function StepProfile({ onNext }: StepProfilePropsType) {
  const [name, setName] = useState<string>("");
  const [about, setAbout] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const finish = () => {
    if (!name.trim()) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onNext(name);
    }, 1200);
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-bold text-white tracking-tight">
          Your profile
        </h2>
        <p className="text-sm text-white/40 mt-1 leading-relaxed">
          Add your name and a profile photo so friends can find you.
        </p>
      </div>

      {/* Avatar */}
      <div className="flex justify-center">
        <button className="relative w-24 h-24 rounded-full border-2 border-dashed border-green-500/40 hover:border-green-500/80 bg-green-500/5 hover:bg-green-500/10 flex flex-col items-center justify-center gap-1 transition-all group">
          <CameraIcon />
          <span className="text-green-400 text-[9px] font-bold tracking-widest uppercase group-hover:text-green-300 transition-colors">
            Photo
          </span>
        </button>
      </div>

      {/* Name */}
      <div>
        <label className="block text-xs font-semibold tracking-widest text-white/40 uppercase mb-2">
          Your Name
        </label>
        <input
          type="text"
          maxLength={25}
          value={name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setName(e.target.value)
          }
          placeholder="Full name"
          className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3.5 text-white text-sm placeholder-white/20 outline-none focus:border-green-500/50 transition-colors"
        />
        <div className="flex justify-end mt-1.5">
          <span className="text-xs font-mono text-white/20">
            {name.length}/25
          </span>
        </div>
      </div>

      {/* About */}
      <div>
        <label className="block text-xs font-semibold tracking-widest text-white/40 uppercase mb-2">
          About <span className="normal-case text-white/25">(optional)</span>
        </label>
        <input
          type="text"
          maxLength={60}
          value={about}
          onChange={(e) => setAbout(e.target.value)}
          placeholder="Hey there! I am using WhatsApp."
          className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3.5 text-white text-sm placeholder-white/20 outline-none focus:border-green-500/50 transition-colors"
        />
      </div>

      <button
        onClick={finish}
        disabled={!name.trim() || loading}
        className={`w-full py-4 rounded-2xl text-sm font-bold tracking-wide transition-all duration-300 ${
          name.trim()
            ? "bg-linear-to-r from-green-500 to-emerald-600 text-white shadow-lg shadow-green-500/30 hover:scale-[1.01]"
            : "bg-white/8 text-white/25 cursor-not-allowed"
        }`}
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Setting up…
          </span>
        ) : (
          "Create account →"
        )}
      </button>
    </div>
  );
}

// ── Step 4 ──────────────────────────────────────────────
function StepSuccess({ name }: StepSuccessPropsType) {
  return (
    <div className="flex flex-col items-center text-center gap-6 py-4">
      <div className="w-20 h-20 rounded-full bg-linear-to-br from-green-400 to-emerald-600 flex items-center justify-center shadow-2xl shadow-green-500/40">
        <svg
          width="36"
          height="36"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-white tracking-tight">
          Welcome, {name}! 🎉
        </h2>
        <p className="text-sm text-white/40 mt-2 leading-relaxed max-w-xs">
          Your WhatsApp account is ready. Start connecting with friends and
          family.
        </p>
      </div>

      <div className="w-full bg-white/5 border border-white/8 rounded-2xl p-4 text-left">
        {[
          { icon: "💬", label: "Send your first message" },
          { icon: "👥", label: "Create a group" },
          { icon: "📞", label: "Make a free call" },
        ].map(({ icon, label }) => (
          <div
            key={label}
            className="flex items-center gap-3 py-2.5 border-b border-white/5 last:border-0"
          >
            <span className="text-lg">{icon}</span>
            <span className="text-sm text-white/60">{label}</span>
            <span className="ml-auto text-white/20 text-xs">›</span>
          </div>
        ))}
      </div>

      <button className="w-full py-4 rounded-2xl text-sm font-bold tracking-wide bg-linear-to-r from-green-500 to-emerald-600 text-white shadow-lg shadow-green-500/30 hover:scale-[1.01] transition-all">
        Open WhatsApp
      </button>
    </div>
  );
}

// ── Root ─────────────────────────────────────────────────
export default function RegisterScreen() {
  const [step, setStep] = useState<number>(1);
  const [phoneData, setPhoneData] = useState<PhoneDataType | null>(null);
  const [userName, setUserName] = useState<string>("");

  const steps: string[] = ["Phone", "Verify", "Profile", "Done"];

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-5 relative overflow-hidden">
      <link
        href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap"
        rel="stylesheet"
      />

      {/* Ambient glows */}
      <div className="absolute -top-32 -left-20 w-96 h-96 rounded-full bg-green-500/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-16 w-80 h-80 rounded-full bg-emerald-500/8 blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-48 h-48 rounded-full bg-teal-400/5 blur-2xl pointer-events-none" />

      {/* Card */}
      <div
        className="relative w-full max-w-sm bg-white/3 backdrop-blur-xl border border-white/[0.07] rounded-3xl p-9 shadow-2xl"
        style={{ fontFamily: "'Syne', sans-serif" }}
      >
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-11 h-11 rounded-2xl bg-linear-to-br from-green-400 to-emerald-600 flex items-center justify-center shadow-lg shadow-green-500/30 shrink-0">
            <WaIcon />
          </div>
          <div>
            <div className="text-white font-bold text-lg leading-none">
              WhatsApp
            </div>
            <div className="text-green-400 text-[10px] font-semibold tracking-[2px] uppercase mt-0.5">
              Messenger
            </div>
          </div>
        </div>

        {/* Progress bar */}
        {step < 4 && (
          <div className="flex gap-1.5 mb-8">
            {steps.slice(0, 3).map((_, i) => (
              <div
                key={i}
                className={`h-1 rounded-full transition-all duration-500 ${
                  i + 1 === step ? "flex-2" : "flex-1"
                } ${
                  i + 1 <= step
                    ? "bg-linear-to-r from-green-400 to-emerald-500"
                    : "bg-white/10"
                }`}
              />
            ))}
          </div>
        )}

        {/* Steps */}
        {step === 1 && (
          <StepPhone
            onNext={(d) => {
              setPhoneData(d);
              setStep(2);
            }}
          />
        )}
        {step === 2 && phoneData && (
          <StepOtp data={phoneData} onNext={() => setStep(3)} />
        )}
        {step === 3 && (
          <StepProfile
            onNext={(n) => {
              setUserName(n);
              setStep(4);
            }}
          />
        )}
        {step === 4 && <StepSuccess name={userName} />}
      </div>
    </div>
  );
}
