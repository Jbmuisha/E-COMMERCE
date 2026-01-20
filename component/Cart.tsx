"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faMinus, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { useCart } from "@/context/Cart";
import "./Cart.css"; // We'll create this file next

export default function Cart() {
    const { isOpen, closeCart, cartItems, removeFromCart, updateQuantity } = useCart();

    // Prevent body scroll when cart is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const calculateTotal = () => {
        return cartItems.reduce(
            (total, item) => total + item.price * item.quantity,
            0
        ).toFixed(2);
    };

    return (
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
                                        // Add your checkout logic here
                                        alert('Proceeding to checkout!');
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
    );
}