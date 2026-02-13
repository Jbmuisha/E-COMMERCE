"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faMinus, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useCart } from "@/context/Cart";
import "./Cart.css"; // We'll create this file next

export default function Cart() {
    const { isOpen, closeCart, cartItems, removeFromCart, updateQuantity } = useCart();
    const [showCheckout, setShowCheckout] = useState(false);

    // Prevent body scroll when cart or checkout modal is open
    useEffect(() => {
        const shouldLock = isOpen || showCheckout;
        if (shouldLock) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, showCheckout]);

    const calculateTotal = () => {
        return cartItems.reduce(
            (total, item) => total + item.price * item.quantity,
            0
        ).toFixed(2);
    };

    return (
        <>
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Overlay */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="cart-overlay"
                            onClick={closeCart}
                        />

                        {/* Cart Panel */}
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'tween', duration: 0.3 }}
                            className="cart-panel"
                        >
                            {/* Cart Header */}
                            <div className="cart-header">
                                <h2>Your Cart</h2>
                                <button
                                    onClick={closeCart}
                                    className="cart-close-button"
                                    aria-label="Close cart"
                                >
                                    <FontAwesomeIcon icon={faXmark} className="cart-close-icon" />
                                </button>
                            </div>

                            {/* Cart Items */}
                            <div className="cart-items">
                                {cartItems.length === 0 ? (
                                    <div className="cart-empty">
                                        Your cart is empty
                                    </div>
                                ) : (
                                    cartItems.map((item) => (
                                        <div key={item.id} className="cart-item">
                                            <div className="cart-item-image">
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                />
                                            </div>
                                            <div className="cart-item-details">
                                                <div className="cart-item-header">
                                                    <h3>{item.name}</h3>
                                                    <button
                                                        onClick={() => removeFromCart(item.id)}
                                                        className="cart-remove-button"
                                                    >
                                                        <FontAwesomeIcon icon={faTrash} className="cart-remove-icon" />
                                                    </button>
                                                </div>
                                                <p className="cart-item-category">{item.category}</p>
                                                <div className="cart-item-controls">
                                                    <div className="quantity-controls">
                                                        <button
                                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                            disabled={item.quantity <= 1}
                                                            className="quantity-button"
                                                        >
                                                            <FontAwesomeIcon icon={faMinus} className="quantity-icon" />
                                                        </button>
                                                        <span className="quantity-display">{item.quantity}</span>
                                                        <button
                                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                            className="quantity-button"
                                                        >
                                                            <FontAwesomeIcon icon={faPlus} className="quantity-icon" />
                                                        </button>
                                                    </div>
                                                    <span className="cart-item-price">${(item.price * item.quantity).toFixed(2)}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>

                            {/* Cart Footer */}
                            {cartItems.length > 0 && (
                                <div className="cart-footer">
                                    <div className="cart-subtotal">
                                        <span>Subtotal</span>
                                        <span className="cart-total">${calculateTotal()}</span>
                                    </div>
                                    <button
                                        className="checkout-button"
                                        onClick={() => {
                                            // Close the side cart first, then open the modal centered
                                            closeCart();
                                            // Wait for the slide-out animation to finish (~300ms), then show modal
                                            setTimeout(() => setShowCheckout(true), 320);
                                        }}
                                    >
                                        Checkout
                                    </button>
                                    <p className="cart-notice">
                                        Shipping & taxes calculated at checkout
                                    </p>
                                </div>
                            )}
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Checkout Modal */}
            <AnimatePresence>
                {showCheckout && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)', zIndex: 60 }}
                            onClick={() => setShowCheckout(false)}
                        />
                        <motion.div
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 30, opacity: 0 }}
                            transition={{ type: 'tween', duration: 0.2 }}
                            style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 'min(680px, 92vw)', maxHeight: '86vh', background: '#fff', borderRadius: 16, boxShadow: '0 20px 50px rgba(0,0,0,0.15)', zIndex: 70, display: 'flex', flexDirection: 'column' }}
                            aria-modal
                            role="dialog"
                        >
                            <div style={{ padding: '14px 18px', borderBottom: '1px solid #eee', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <h3 style={{ margin: 0, fontWeight: 800 }}>Checkout</h3>
                                <button onClick={() => setShowCheckout(false)} className="cart-close-button">
                                    <FontAwesomeIcon icon={faXmark} />
                                </button>
                            </div>
                            <div style={{ padding: 16, overflow: 'auto' }}>
                                {cartItems.map((item) => (
                                    <div key={item.id} style={{ display: 'flex', gap: 12, padding: '10px 0', borderBottom: '1px solid #f3f4f6' }}>
                                        <div style={{ width: 64, height: 64, borderRadius: 10, overflow: 'hidden', flex: '0 0 auto', border: '1px solid #eee', background: '#fafafa' }}>
                                            <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        </div>
                                        <div style={{ flex: 1, minWidth: 0 }}>
                                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                                                <div style={{ fontWeight: 700 }}>{item.name}</div>
                                                <div style={{ color: '#111', fontWeight: 800 }}>${(item.price * item.quantity).toFixed(2)}</div>
                                            </div>
                                            <div style={{ color: '#6b7280', fontSize: 13 }}>Qty {item.quantity} × ${item.price.toFixed(2)}</div>
                                        </div>
                                    </div>
                                ))}
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 12, fontWeight: 800 }}>
                                    <span>Total</span>
                                    <span>${calculateTotal()}</span>
                                </div>

                                <div style={{ display: 'grid', gap: 10, marginTop: 14 }}>
                                    <button style={{ height: 44, borderRadius: 12, background: '#111', color: '#fff', fontWeight: 800, border: '1px solid #111' }}>Pay with Card (Stripe)</button>
                                    <button style={{ height: 44, borderRadius: 12, background: '#ff7900', color: '#fff', fontWeight: 800, border: '1px solid #ff7900' }}>Pay with Orange Money</button>
                                    <button style={{ height: 44, borderRadius: 12, background: '#ef1c26', color: '#fff', fontWeight: 800, border: '1px solid #ef1c26' }}>Pay with Airtel Money</button>
                                </div>
                            </div>
                            <div style={{ padding: 12, borderTop: '1px solid #eee', display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
                                <button onClick={() => setShowCheckout(false)} style={{ height: 38, padding: '0 14px', borderRadius: 10, border: '1px solid #e5e7eb', background: '#fff', fontWeight: 700 }}>Close</button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}