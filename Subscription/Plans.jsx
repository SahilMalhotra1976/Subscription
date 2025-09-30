import React, { useState } from "react";
import "./Plans.css";

// simple Luhn algorithm check for realism
function luhnCheck(val = "") {
  const s = val.replace(/\D/g, "");
  let sum = 0;
  let flip = false;
  for (let i = s.length - 1; i >= 0; i--) {
    let n = parseInt(s[i], 10);
    if (flip) {
      n *= 2;
      if (n > 9) n -= 9;
    }
    sum += n;
    flip = !flip;
  }
  return sum % 10 === 0;
}

function maskCardNumber(num) {
  const s = (num || "").replace(/\D/g, "");
  if (s.length <= 4) return s;
  const last4 = s.slice(-4);
  return "•••• •••• •••• " + last4;
}

function detectBrand(num = "") {
  const s = num.replace(/\D/g, "");
  if (/^4/.test(s)) return "visa";
  if (/^5[1-5]/.test(s)) return "mastercard";
  if (/^3[47]/.test(s)) return "amex";
  if (/^6/.test(s)) return "discover";
  return "card";
}

export default function Plans() {
  const [selectedPlan, setSelectedPlan] = useState("Free");
  const [showPayment, setShowPayment] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  const [card, setCard] = useState({
    name: "",
    number: "",
    expiry: "",
    cvc: "",
  });

  const [error, setError] = useState("");

  const handleSelect = (plan) => {
    setSelectedPlan(plan);
    setSuccess(false);
    setError("");
    setShowPayment(plan === "Premium");
  };

  const handleChange = (field) => (e) => {
    let value = e.target.value;
    // simple input formatting
    if (field === "number") {
      value = value.replace(/[^\d]/g, "").slice(0, 16);
      // insert spaces
      value = value.match(/.{1,4}/g)?.join(" ") || value;
    }
    if (field === "expiry") {
      value = value.replace(/[^\d]/g, "").slice(0, 4);
      if (value.length >= 3) value = value.slice(0, 2) + "/" + value.slice(2);
    }
    if (field === "cvc") value = value.replace(/[^\d]/g, "").slice(0, 4);
    setCard((prev) => ({ ...prev, [field]: value }));
  };

  const handlePay = (e) => {
    e.preventDefault();
    setError("");
    // validations
    if (!card.name || !card.number || !card.expiry || !card.cvc) {
      setError("Please fill all payment fields.");
      return;
    }
    // basic expiry check MM/YY
    const [mm, yy] = (card.expiry || "").split("/");
    if (!mm || !yy || Number(mm) < 1 || Number(mm) > 12 || yy.length !== 2) {
      setError("Enter a valid expiry (MM/YY).");
      return;
    }
    // Luhn on numeric digits
    if (!luhnCheck(card.number.replace(/\s/g, ""))) {
      setError("Invalid card number.");
      return;
    }
    // cvc length
    if (card.cvc.length < 3 || card.cvc.length > 4) {
      setError("Invalid CVC.");
      return;
    }

    // simulate processing
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setSuccess(true);
      setShowPayment(false);
    }, 1700);
  };

  const brand = detectBrand(card.number);

  return (
    <div className="plans-root">
      <div className="plans-card">
        <h1>DEV@Deakin Plans</h1>
        <p className="subtitle">Choose a plan that fits you. Premium unlocks customization & analytics.</p>

        <div className="plan-options">
          <div
            className={`plan free ${selectedPlan === "Free" ? "selected" : ""}`}
            onClick={() => handleSelect("Free")}
            role="button"
            tabIndex={0}
          >
            <h3>Free</h3>
            <p className="price">0 / month</p>
            <ul>
              <li>Access to basic features</li>
              <li>Community support</li>
            </ul>
            <button className="choose-btn">Choose Free</button>
          </div>

          <div
            className={`plan premium ${selectedPlan === "Premium" ? "selected" : ""}`}
            onClick={() => handleSelect("Premium")}
            role="button"
            tabIndex={0}
          >
            <h3>Premium</h3>
            <p className="price">$9.99 / month</p>
            <ul>
              <li>Customization: themes & banners</li>
              <li>Analytics dashboard</li>
              <li>Priority support</li>
            </ul>
            <button className="choose-btn filled">Choose Premium</button>
          </div>
        </div>

        {/* Payment form */}
        {showPayment && (
          <div className="payment-area">
            <div className="card-visual">
              <div className={`brand ${brand}`} />
              <div className="chip" />
              <div className="number">{maskCardNumber(card.number)}</div>
              <div className="holder-label">Cardholder</div>
              <div className="holder">{card.name || "FULL NAME"}</div>
              <div className="expiry">{card.expiry || "MM/YY"}</div>
            </div>

            <form className="checkout-form" onSubmit={handlePay}>
              <label>
                Name on card
                <input value={card.name} onChange={handleChange("name")} placeholder="Full name" />
              </label>

              <label>
                Card number
                <input value={card.number} onChange={handleChange("number")} placeholder="4242 4242 4242 4242" />
              </label>

              <div className="row">
                <label className="small">
                  Expiry (MM/YY)
                  <input value={card.expiry} onChange={handleChange("expiry")} placeholder="MM/YY" />
                </label>

                <label className="small">
                  CVC
                  <input value={card.cvc} onChange={handleChange("cvc")} placeholder="123" />
                </label>
              </div>

              {error && <div className="error">{error}</div>}

              <button className="pay-btn" type="submit" disabled={processing}>
                {processing ? <span className="spinner" /> : `Pay $9.99`}
              </button>
            </form>
          </div>
        )}

        {success && (
          <div className="receipt">
            <h3>Payment successful</h3>
            <p>You are now subscribed to <strong>Premium</strong>.</p>
            <div className="receipt-row">
              <div>Plan</div>
              <div>Premium</div>
            </div>
            <div className="receipt-row">
              <div>Amount</div>
              <div>$9.99</div>
            </div>
            <div className="receipt-row">
              <div>Transaction ID</div>
              <div>{`TRX-${Math.random().toString(36).slice(2, 9).toUpperCase()}`}</div>
            </div>
            <div className="receipt-row">
              <div>Date</div>
              <div>{new Date().toLocaleString()}</div>
            </div>
          </div>
        )}

        {/* If Free selected */}
        {!showPayment && selectedPlan === "Free" && (
          <div className="info">You selected the Free plan — no payment required.</div>
        )}
      </div>
    </div>
  );
}
