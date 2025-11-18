import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../styles/supplements.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Supplements() {
  useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
    
  const { isLoggedIn, user } = useAuth();
  const navigate = useNavigate();

  // ✅ Restrict access
  if (!isLoggedIn()) {
    return (
      <div className="locked-wrapper">
        <div className="locked-box text-center animate-fade">
          <h3 className="locked-title">🔒 Access Restricted</h3>
          <p className="locked-text">
            You need to <strong>log in</strong> to view the supplements store.
          </p>
          <button
            className="btn btn-danger mt-3 px-4 py-2"
            onClick={() => navigate("/login")}
          >
            Go to Login Page
          </button>
        </div>
      </div>
    );
  }

  // ✅ Product list
  const allSupplements = [
    { id: 1, name: "Iso Jacked 5lbs", image: "/images/IsoJacked5lbs.webp", price: 9000, desc: "Premium isolate protein for lean muscle recovery and growth." },
    { id: 2, name: "Brown Rice Protein", image: "/images/brownrice.webp", price: 5600, desc: "Plant-based protein with smooth digestibility and essential amino acids." },
    { id: 3, name: "Blade Whey", image: "/images/bladewhey.webp", price: 6000, desc: "High-performance whey protein designed for fast muscle repair." },
    { id: 4, name: "Chocolate Brownie ISO", image: "/images/chocolatebrownieISO.webp", price: 30000, desc: "Rich chocolate brownie flavor with 25g of pure isolate protein." },
    { id: 5, name: "Blade Predators", image: "/images/Bladepredators.webp", price: 28000, desc: "Advanced pre-workout formula for ultimate energy and focus." },
    { id: 6, name: "Vanilla Sports Whey HD", image: "/images/vanillaSPORTSWHEYHD.webp", price: 22000, desc: "Delicious vanilla whey blend packed with BCAAs for endurance." },
    { id: 7, name: "Gold Whey Chocolate", image: "/images/Gold-Whey-chocolate-canva.webp", price: 26000, desc: "Classic chocolate whey protein with gold-standard purity and taste." },
    { id: 8, name: "Dymatize ISO 100", image: "/images/dymatizeiso100.webp", price: 17000, desc: "Hydrolyzed isolate protein powder with ultra-fast absorption rate." },
    { id: 9, name: "Anabolic Prime Pro", image: "/images/ANABOLICPRIMEPRO.webp", price: 22000, desc: "An advanced anabolic protein blend for muscle recovery and mass." },
    { id: 10, name: "Isotope Protein", image: "/images/ISOTOPE.webp", price: 23000, desc: "Military-grade isolate protein for athletes who demand the best." },
    { id: 11, name: "Prostar Whey", image: "/images/prostar.webp", price: 28000, desc: "Balanced protein blend ideal for beginners and athletes alike." },
    { id: 12, name: "Nitrotech Ripped", image: "/images/Nitrotechripped.webp", price: 17000, desc: "Whey protein + fat burner combo for lean muscle and definition." },
    { id: 13, name: "Nitro Muscletech", image: "/images/Nitromuscletech.webp", price: 19500, desc: "Fast-absorbing whey complex that boosts recovery and strength." },
    { id: 14, name: "100% Whey", image: "/images/100whey.webp", price: 28300, desc: "Pure whey protein delivering consistent performance results." },
    { id: 15, name: "Levro Whey", image: "/images/levrowhey_1.webp", price: 22400, desc: "Ultra-filtered whey concentrate with a smooth creamy flavor." },
  ];

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [modalItem, setModalItem] = useState(null);
  const [formData, setFormData] = useState({
    name: user?.firstName || "",
    email: user?.email || "",
    phone: "",
    address: "",
    city: "",
    postal: "",
    country: "Pakistan",
    specialInstructions: ""
  });
  const [step, setStep] = useState(1);
  const [showFormModal, setShowFormModal] = useState(false);
  const [orders, setOrders] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [showOrdersModal, setShowOrdersModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState(null);
  const [editingOrder, setEditingOrder] = useState(null);
  const [cart, setCart] = useState([]);
  const [showCartModal, setShowCartModal] = useState(false);
  const [selectedCartItems, setSelectedCartItems] = useState(new Set());
  const perPage = 10;

  // ✅ Load orders and cart for user
  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem(`orders_${user.email}`)) || [];
    setOrders(savedOrders);

    const savedCart = JSON.parse(localStorage.getItem(`cart_${user.email}`)) || [];
    setCart(savedCart);
  }, [user.email]);

  // ✅ Save order to localStorage
  const saveOrder = (order) => {
    const newOrders = [...orders, order];
    setOrders(newOrders);
    localStorage.setItem(`orders_${user.email}`, JSON.stringify(newOrders));
  };

  // ✅ Update order in localStorage
  const updateOrder = (updatedOrder) => {
    const updatedOrders = orders.map(order =>
      order.id === updatedOrder.id ? updatedOrder : order
    );
    setOrders(updatedOrders);
    localStorage.setItem(`orders_${user.email}`, JSON.stringify(updatedOrders));
  };

  // ✅ Delete order from localStorage
  const deleteOrder = (orderId) => {
    const updatedOrders = orders.filter(order => order.id !== orderId);
    setOrders(updatedOrders);
    localStorage.setItem(`orders_${user.email}`, JSON.stringify(updatedOrders));
    setShowDeleteConfirm(false);
    setOrderToDelete(null);
  };

  // ✅ Save cart to localStorage
  const saveCart = (updatedCart) => {
    setCart(updatedCart);
    localStorage.setItem(`cart_${user.email}`, JSON.stringify(updatedCart));
  };

  // ✅ Add to cart function
  const handleAddToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
      showToastMessage("⚠️ Product already in cart!");
      return;
    }

    const newCartItem = {
      ...product,
      cartId: Date.now(),
      quantity: 1
    };

    const updatedCart = [...cart, newCartItem];
    saveCart(updatedCart);
    showToastMessage("✅ Product added to cart successfully!");
  };

  // ✅ Remove from cart
  const handleRemoveFromCart = (cartId) => {
    const updatedCart = cart.filter(item => item.cartId !== cartId);
    saveCart(updatedCart);
    showToastMessage("🗑️ Product removed from cart");
  };

  // ✅ Update quantity
  const handleQuantityChange = (cartId, newQuantity) => {
    if (newQuantity < 1) return;

    const updatedCart = cart.map(item =>
      item.cartId === cartId ? { ...item, quantity: newQuantity } : item
    );
    saveCart(updatedCart);
  };

  // ✅ Toggle cart item selection
  const handleToggleCartItem = (cartId) => {
    const newSelected = new Set(selectedCartItems);
    if (newSelected.has(cartId)) {
      newSelected.delete(cartId);
    } else {
      newSelected.add(cartId);
    }
    setSelectedCartItems(newSelected);
  };

  // ✅ Select all cart items
  const handleSelectAll = () => {
    if (selectedCartItems.size === cart.length) {
      setSelectedCartItems(new Set());
    } else {
      setSelectedCartItems(new Set(cart.map(item => item.cartId)));
    }
  };

  // ✅ Get selected cart items
  const getSelectedCartItems = () => {
    return cart.filter(item => selectedCartItems.has(item.cartId));
  };

  // ✅ Calculate total price for selected items
  const calculateSelectedTotal = () => {
    return getSelectedCartItems().reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  // ✅ Proceed to checkout from cart
  const handleProceedToCheckout = () => {
    const selectedItems = getSelectedCartItems();
    if (selectedItems.length === 0) {
      showToastMessage("⚠️ Please select at least one product to checkout");
      return;
    }

    setModalItem({
      name: "Multiple Products",
      price: calculateSelectedTotal(),
      cartItems: selectedItems,
      isCartOrder: true
    });
    setShowCartModal(false);
    setShowFormModal(true);
    setStep(1);
  };

  // ✅ Show toast message
  const showToastMessage = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  // ✅ Pagination logic
  const filtered = allSupplements.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );
  const totalPages = Math.ceil(filtered.length / perPage);
  const visibleSupplements = filtered.slice((page - 1) * perPage, page * perPage);

  const handleBuyNow = (item) => {
    setModalItem({ ...item, isCartOrder: false });
    setShowFormModal(true);
    setStep(1);
  };

  const handleConfirmOrder = () => {
    let order;

    if (modalItem.isCartOrder) {
      // Cart order
      order = {
        id: Date.now(),
        date: new Date().toLocaleString(),
        ...formData,
        items: modalItem.cartItems,
        totalPrice: modalItem.price,
        type: "cart"
      };

      // Remove purchased items from cart
      const updatedCart = cart.filter(item =>
        !modalItem.cartItems.some(cartItem => cartItem.cartId === item.cartId)
      );
      saveCart(updatedCart);
      setSelectedCartItems(new Set());
    } else {
      // Single product order
      order = {
        ...modalItem,
        ...formData,
        id: Date.now(),
        date: new Date().toLocaleString(),
        type: "single"
      };
    }

    saveOrder(order);
    showToastMessage("🎉 Order Confirmed! Thank you for shopping with us.");
    setShowFormModal(false);
    setModalItem(null);
  };

  // ✅ Validate before next step
  const handleSaveAndContinue = () => {
    const required = ["name", "email", "phone", "address", "city", "postal", "country"];
    const isEmpty = required.some((field) => !formData[field].trim());
    if (isEmpty) {
      showToastMessage("⚠️ Please fill in all required fields before continuing.");
      return;
    }
    setStep(2);
  };

  // ✅ Handle edit order details
  const handleEditOrder = (order) => {
    setEditingOrder(order);
    setFormData({
      name: order.name || user?.firstName || "",
      email: order.email || user?.email || "",
      phone: order.phone || "",
      address: order.address || "",
      city: order.city || "",
      postal: order.postal || "",
      country: order.country || "Pakistan",
      specialInstructions: order.specialInstructions || ""
    });
    setShowOrdersModal(false);
    setShowFormModal(true);
    setStep(1);
  };

  // ✅ Save edited order
  const handleSaveEditedOrder = () => {
    const required = ["name", "email", "phone", "address", "city", "postal", "country"];
    const isEmpty = required.some((field) => !formData[field].trim());
    if (isEmpty) {
      showToastMessage("⚠️ Please fill in all required fields before saving.");
      return;
    }

    const updatedOrder = {
      ...editingOrder,
      ...formData
    };

    updateOrder(updatedOrder);
    setShowFormModal(false);
    setEditingOrder(null);
    showToastMessage("✅ Order Updated Successfully!");
  };

  // ✅ Handle delete confirmation
  const handleDeleteClick = (order) => {
    setOrderToDelete(order);
    setShowDeleteConfirm(true);
  };

  return (
    <div className="supplement-page">
      {/* Hero */}
      <div className="supp-hero">
        <img src="/images/chooserightsupplement.webp" alt="Choose Right Supplement" />
        <div className="supp-hero-text">
          <h1>Fuel Your Fitness Journey</h1>
          <p>Explore top-rated supplements for muscle growth, recovery, and endurance.</p>
        </div>
      </div>

      {/* Search + Cart + My Orders */}
      <div className="supp-search container d-flex justify-content-between align-items-center mt-4">
        <input
          type="text"
          className="form-control w-50"
          placeholder="Search supplements..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />
        <div className="d-flex gap-3">
          <button
            className="btn btn-outline-primary position-relative"
            onClick={() => setShowCartModal(true)}
          >
            🛒 Cart
            {cart.length > 0 && (
              <span className="cart-badge position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {cart.length}
              </span>
            )}
          </button>
          <button className="btn btn-outline-danger" onClick={() => setShowOrdersModal(true)}>
            My Orders ({orders.length})
          </button>
        </div>
      </div>

      {/* Products */}
      <section className="container mt-5">
        <div className="row">
          {visibleSupplements.map((item, i) => (
            <div className="col-md-4 col-lg-3 mb-4" key={i}>
              <div className="supp-card shadow-sm" onClick={() => setModalItem(item)}>
                <img src={item.image} alt={item.name} />
                <div className="supp-card-body">
                  <h5>{item.name}</h5>
                  <p className="supp-desc">{item.desc}</p>
                  <p className="supp-price"><strong>Rs. {item.price.toLocaleString()}</strong></p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="pagination-wrapper text-center mt-4">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              className={`page-btn ${page === i + 1 ? "active" : ""}`}
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </section>

      {/* Product Modal */}
      {modalItem && !showFormModal && (
        <div className="custom-modal-overlay" onClick={() => setModalItem(null)}>
          <div className="custom-modal-container" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal-btn" onClick={() => setModalItem(null)}>&times;</button>
            <div className="custom-modal-content">
              <div className="modal-left">
                <img src={modalItem.image} alt={modalItem.name} />
              </div>
              <div className="modal-right">
                <h3>{modalItem.name}</h3>
                <p className="modal-desc">{modalItem.desc}</p>
                <ul className="modal-details">
                  <li><strong>Weight:</strong> 5 lbs</li>
                  <li><strong>Protein:</strong> 25g</li>
                  <li><strong>Brand:</strong> Premium Series</li>
                </ul>
                <p className="modal-price"><strong>Price:</strong> Rs. {modalItem.price.toLocaleString()}</p>
                <div className="modal-buttons d-flex gap-2">
                  <button className="btn btn-outline-primary" onClick={() => handleAddToCart(modalItem)}>
                    Add to Cart
                  </button>
                  <button className="btn btn-success" onClick={() => handleBuyNow(modalItem)}>Buy Now</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ✅ Buy Now Form Modal */}
      {showFormModal && (
        <div className="buy-form-overlay" onClick={() => setShowFormModal(false)}>
          <div className="buy-form-modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal-btn" onClick={() => setShowFormModal(false)}>&times;</button>
            <h3>{editingOrder ? "Edit Order Details" : step === 1 ? "Shipping Details" : "Review & Confirm"}</h3>
            <hr />
            {step === 1 ? (
              <div className="form-scroll">
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">Full Name *</label>
                      <input
                        type="text"
                        className="form-control"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Enter your full name"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">Email *</label>
                      <input
                        type="email"
                        className="form-control"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">Phone Number *</label>
                      <input
                        type="tel"
                        className="form-control"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="03XX-XXXXXXX"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">Country *</label>
                      <select
                        className="form-control"
                        value={formData.country}
                        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      >
                        <option value="Pakistan">Pakistan</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">Street Address *</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="House #, Street, Area"
                  />
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">City *</label>
                      <input
                        type="text"
                        className="form-control"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        placeholder="Your city"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">Postal Code *</label>
                      <input
                        type="text"
                        className="form-control"
                        value={formData.postal}
                        onChange={(e) => setFormData({ ...formData, postal: e.target.value })}
                        placeholder="XXXXX"
                      />
                    </div>
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">Special Instructions (Optional)</label>
                  <textarea
                    className="form-control"
                    rows="3"
                    value={formData.specialInstructions}
                    onChange={(e) => setFormData({ ...formData, specialInstructions: e.target.value })}
                    placeholder="Any special delivery instructions..."
                  />
                </div>

                <button
                  className="btn btn-danger w-100 py-3"
                  onClick={editingOrder ? handleSaveEditedOrder : handleSaveAndContinue}
                >
                  {editingOrder ? "Save Changes" : "Continue to Review"}
                </button>
              </div>
            ) : (
              <div className="review-step-container">
                <div className="review-header">
                  <h4>Review & Confirm</h4>
                </div>

                <div className="review-content-scrollable">
                  {/* Order Summary Section */}
                  <div className="review-section">
                    <h5 className="review-section-title">Order Summary</h5>
                    {modalItem.isCartOrder ? (
                      <div className="order-items-list">
                        {modalItem.cartItems.map((item) => (
                          <div key={item.cartId} className="review-order-item">
                            <div className="review-item-main">
                              <img src={item.image} alt={item.name} className="review-item-img" />
                              <div className="review-item-info">
                                <h6 className="review-item-name">{item.name}</h6>
                                <p className="review-item-meta">Quantity: {item.quantity}</p>
                              </div>
                            </div>
                            <p className="review-item-price">Rs. {(item.price * item.quantity).toLocaleString()}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="review-order-item">
                        <div className="review-item-main">
                          <img src={modalItem.image} alt={modalItem.name} className="review-item-img" />
                          <div className="review-item-info">
                            <h6 className="review-item-name">{modalItem.name}</h6>
                            <p className="review-item-desc">{modalItem.desc}</p>
                          </div>
                        </div>
                        <p className="review-item-price">Rs. {modalItem.price.toLocaleString()}</p>
                      </div>
                    )}
                  </div>

                  {/* Total Amount Section */}
                  <div className="review-total-section">
                    <div className="total-amount-display">
                      <span className="total-label">Total Amount:</span>
                      <span className="total-value">Rs. {modalItem.price.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Shipping Information Section */}
                  <div className="review-section">
                    <h5 className="review-section-title">Shipping Information</h5>
                    <div className="shipping-info-container">
                      <div className="shipping-info-row">
                        <div className="shipping-info-group">
                          <label>Name:</label>
                          <span>{formData.name}</span>
                        </div>
                        <div className="shipping-info-group">
                          <label>Email:</label>
                          <span>{formData.email}</span>
                        </div>
                      </div>
                      <div className="shipping-info-row">
                        <div className="shipping-info-group">
                          <label>Phone:</label>
                          <span>{formData.phone}</span>
                        </div>
                        <div className="shipping-info-group">
                          <label>Country:</label>
                          <span>{formData.country}</span>
                        </div>
                      </div>
                      <div className="shipping-info-group full-width">
                        <label>Address:</label>
                        <span>{formData.address}, {formData.city}, {formData.postal}</span>
                      </div>
                      {formData.specialInstructions && (
                        <div className="shipping-info-group full-width">
                          <label>Special Instructions:</label>
                          <span>{formData.specialInstructions}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Fixed Action Buttons */}
                <div className="review-actions-fixed">
                  <p className="cod-notice">* Cash on Delivery Only *</p>
                  <div className="action-buttons">
                    <button className="btn btn-outline-secondary" onClick={() => setStep(1)}>
                      Edit Details
                    </button>
                    <button className="btn btn-success" onClick={handleConfirmOrder}>
                      Confirm Order
                    </button>
                  </div>
                </div>
              </div>
            )}  </div>
        </div>
      )}

      {/* ✅ Cart Modal */}
      {showCartModal && (
        <div className="cart-overlay" onClick={() => setShowCartModal(false)}>
          <div className="cart-modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal-btn" onClick={() => setShowCartModal(false)}>
              &times;
            </button>
            <h3 className="cart-title">Your Shopping Cart</h3>
            <p className="cart-subtitle">{cart.length} item(s) in cart</p>
            <hr />

            {cart.length === 0 ? (
              <div className="empty-cart text-center py-5">
                <div className="empty-cart-icon">🛒</div>
                <h5>Your cart is empty</h5>
                <p>Add some supplements to get started!</p>
              </div>
            ) : (
              <>
                <div className="cart-header d-flex justify-content-between align-items-center mb-3">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={selectedCartItems.size === cart.length && cart.length > 0}
                      onChange={handleSelectAll}
                    />
                    <label className="form-check-label fw-bold">
                      Select All ({selectedCartItems.size}/{cart.length})
                    </label>
                  </div>
                  <span className="text-muted">Total: Rs. {calculateSelectedTotal().toLocaleString()}</span>
                </div>

                <div className="cart-items">
                  {cart.map((item) => (
                    <div className="cart-item-card" key={item.cartId}>
                      <div className="cart-item-header">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            checked={selectedCartItems.has(item.cartId)}
                            onChange={() => handleToggleCartItem(item.cartId)}
                          />
                        </div>
                        <img src={item.image} alt={item.name} className="cart-item-img" />
                        <div className="cart-item-details">
                          <h6 className="cart-item-name">{item.name}</h6>
                          <p className="cart-item-price">Rs. {item.price.toLocaleString()}</p>
                        </div>
                        <button
                          className="cart-item-delete btn btn-outline-danger btn-sm"
                          onClick={() => handleRemoveFromCart(item.cartId)}
                        >
                          🗑️
                        </button>
                      </div>

                      <div className="cart-item-controls">
                        <div className="quantity-controls">
                          <button
                            className="quantity-btn"
                            onClick={() => handleQuantityChange(item.cartId, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            -
                          </button>
                          <span className="quantity-display">{item.quantity}</span>
                          <button
                            className="quantity-btn"
                            onClick={() => handleQuantityChange(item.cartId, item.quantity + 1)}
                          >
                            +
                          </button>
                        </div>
                        <div className="item-total">
                          Rs. {(item.price * item.quantity).toLocaleString()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="cart-footer">
                  <div className="cart-total-section p-3 bg-light rounded mb-3">
                    <div className="d-flex justify-content-between align-items-center">
                      <h5 className="mb-0">Selected Total:</h5>
                      <h4 className="mb-0 text-danger">Rs. {calculateSelectedTotal().toLocaleString()}</h4>
                    </div>
                  </div>

                  <button
                    className="btn btn-success w-100 py-3"
                    onClick={handleProceedToCheckout}
                    disabled={selectedCartItems.size === 0}
                  >
                    Proceed to Checkout ({selectedCartItems.size} items)
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* ✅ Beautiful My Orders Modal */}
      {showOrdersModal && (
        <div className="orders-overlay" onClick={() => setShowOrdersModal(false)}>
          <div className="orders-modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal-btn" onClick={() => setShowOrdersModal(false)}>
              &times;
            </button>
            <h3 className="orders-title">My Orders</h3>
            <p className="orders-subtitle">Total Orders: {orders.length}</p>
            <hr />

            {orders.length === 0 ? (
              <div className="no-orders">
                <div className="no-orders-icon">📦</div>
                <h5>No orders yet</h5>
                <p>Start shopping to see your orders here!</p>
              </div>
            ) : (
              <div className="orders-list">
                {orders.map((order) => (
                  <div className="order-card" key={order.id}>
                    <div className="order-header">
                      <div className="order-product-info">
                        {order.type === "cart" ? (
                          <div className="multiple-products-indicator">
                            <span className="badge bg-primary">{order.items?.length || 0} items</span>
                          </div>
                        ) : (
                          <img src={order.image} alt={order.name} className="order-product-img" />
                        )}
                        <div className="order-product-details">
                          <h6 className="order-product-name">
                            {order.type === "cart" ? "Multiple Products" : order.name}
                          </h6>
                          <p className="order-price">Rs. {order.totalPrice?.toLocaleString() || order.price?.toLocaleString()}</p>
                        </div>
                      </div>
                      <span className="order-date">{order.date}</span>
                    </div>

                    <div className="order-actions">
                      <button
                        className="btn btn-outline-primary btn-sm"
                        onClick={() => setSelectedOrder(selectedOrder?.id === order.id ? null : order)}
                      >
                        {selectedOrder?.id === order.id ? "Hide Details" : "See Details"}
                      </button>
                    </div>

                    {selectedOrder?.id === order.id && (
                      <div className="order-details-expanded">
                        <div className="order-details-section">
                          <h6>Order Details</h6>
                          {order.type === "cart" ? (
                            <div className="multiple-products-list">
                              {order.items?.map((item, index) => (
                                <div key={index} className="product-detail-item mb-3">
                                  <img src={item.image} alt={item.name} />
                                  <div>
                                    <strong>{item.name}</strong>
                                    <p>{item.desc}</p>
                                    <p className="text-danger">
                                      <strong>Rs. {item.price?.toLocaleString()} x {item.quantity}</strong>
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="product-detail-item">
                              <img src={order.image} alt={order.name} />
                              <div>
                                <strong>{order.name}</strong>
                                <p>{order.desc}</p>
                                <p className="text-danger"><strong>Rs. {order.price?.toLocaleString()}</strong></p>
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="order-details-section">
                          <h6>Shipping Information</h6>
                          <div className="shipping-details">
                            <div><strong>Name:</strong> {order.name}</div>
                            <div><strong>Email:</strong> {order.email}</div>
                            <div><strong>Phone:</strong> {order.phone}</div>
                            <div><strong>Address:</strong> {order.address}, {order.city}, {order.postal}</div>
                            {order.country && <div><strong>Country:</strong> {order.country}</div>}
                            {order.specialInstructions && (
                              <div><strong>Instructions:</strong> {order.specialInstructions}</div>
                            )}
                          </div>
                        </div>

                        <div className="order-actions-expanded">
                          <button
                            className="btn btn-outline-warning btn-sm"
                            onClick={() => handleEditOrder(order)}
                          >
                            Edit Details
                          </button>
                          <button
                            className="btn btn-outline-danger btn-sm"
                            onClick={() => handleDeleteClick(order)}
                          >
                            Cancel Order
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ✅ Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="delete-confirm-overlay">
          <div className="delete-confirm-modal">
            <div className="delete-confirm-header">
              <h5>Confirm Cancellation</h5>
            </div>
            <div className="delete-confirm-body">
              <p>Are you sure you want to cancel this order?</p>
              <div className="order-preview">
                {orderToDelete.type === "cart" ? (
                  <div className="multiple-products-preview">
                    <span className="badge bg-primary">{orderToDelete.items?.length || 0} items</span>
                    <div>
                      <strong>Multiple Products</strong>
                      <p>Rs. {orderToDelete.totalPrice?.toLocaleString()}</p>
                    </div>
                  </div>
                ) : (
                  <>
                    <img src={orderToDelete.image} alt={orderToDelete.name} />
                    <div>
                      <strong>{orderToDelete.name}</strong>
                      <p>Rs. {orderToDelete.price?.toLocaleString()}</p>
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="delete-confirm-actions">
              <button
                className="btn btn-secondary"
                onClick={() => setShowDeleteConfirm(false)}
              >
                Keep Order
              </button>
              <button
                className="btn btn-danger"
                onClick={() => deleteOrder(orderToDelete.id)}
              >
                Yes, Cancel Order
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {showToast && (
        <div className={`order-toast ${toastMessage.includes('✅') ? 'toast-success' : toastMessage.includes('⚠️') ? 'toast-warning' : 'toast-info'}`}>
          {toastMessage}
        </div>
      )}
    </div>
  );
}