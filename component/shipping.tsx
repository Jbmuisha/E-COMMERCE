"use client";
import { useState } from "react";
export default function Shipping_and_return() {
  const [showReturn, setShowReturn] = useState(false); 
  const [feedback, setFeedback] = useState(""); 

  const handleCheckReturn = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); 
    setShowReturn(true);
    setFeedback(
      "Your return has been approved. The replacement item will be delivered soon."
    );
  };
  

  return (
    <main className="shipping-page mt-[40px] mb-[20px]">
    
      <section className="shipping">
        <h1>Shipping Information</h1>

        <form className="shipping-form">
          <div className="form-group">
            <label>Full Name</label>
            <input type="text" placeholder="John Doe" />
          </div>

          <div className="form-group">
            <label>Address</label>
            <input type="text" placeholder="Street, apartment, etc." />
          </div>

          <div className="form-group">
            <label>City</label>
            <input type="text" placeholder="Dubai" />
          </div>

          <div className="form-group">
            <label>Country</label>
            <input type="text" placeholder="United Arab Emirates" />
          </div>

          <div className="form-group">
            <label>Phone Number</label>
            <input type="tel" placeholder="+971 50 000 0000" />
          </div>

          <div className="form-group">
            <label>Shipping Method</label>
            <select>
              <option>Standard Shipping (3–5 days)</option>
              <option>Express Shipping (1–2 days)</option>
            </select>
          </div>

         
          <button
            className="btn-check-return"
            onClick={handleCheckReturn}
          >
            Check Return Status
          </button>
        </form>
      </section>

      
      {showReturn && (
        <section className="returnShipping">
          <h1>Returns & Replacement</h1>

          <div className="return-status">
            <label>Status</label>
            <p className="status approved">Approved</p>

            <label>Message</label>
            <p>{feedback}</p>

            <label>Delivery Update</label>
            <p>Tracking details will be shared shortly.</p>
          </div>
        </section>
      )}
    </main>
  );
}
