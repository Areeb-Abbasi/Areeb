import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../styles/supplements.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Supplements() {
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
    { name: "Iso Jacked 5lbs", image: "/images/IsoJacked5lbs.webp", price: 9000, desc: "Premium isolate protein for lean muscle recovery and growth." },
    { name: "Brown Rice Protein", image: "/images/brownrice.webp", price: 5600, desc: "Plant-based protein with smooth digestibility and essential amino acids." },
    { name: "Blade Whey", image: "/images/bladewhey.webp", price: 6000, desc: "High-performance whey protein designed for fast muscle repair." },
    { name: "Chocolate Brownie ISO", image: "/images/chocolatebrownieISO.webp", price: 30000, desc: "Rich chocolate brownie flavor with 25g of pure isolate protein." },
    { name: "Blade Predators", image: "/images/Bladepredators.webp", price: 28000, desc: "Advanced pre-workout formula for ultimate energy and focus." },
    { name: "Vanilla Sports Whey HD", image: "/images/vanillaSPORTSWHEYHD.webp", price: 22000, desc: "Delicious vanilla whey blend packed with BCAAs for endurance." },
    { name: "Gold Whey Chocolate", image: "/images/Gold-Whey-chocolate-canva.webp", price: 26000, desc: "Classic chocolate whey protein with gold-standard purity and taste." },
    { name: "Dymatize ISO 100", image: "/images/dymatizeiso100.webp", price: 17000, desc: "Hydrolyzed isolate protein powder with ultra-fast absorption rate." },
    { name: "Anabolic Prime Pro", image: "/images/ANABOLICPRIMEPRO.webp", price: 22000, desc: "An advanced anabolic protein blend for muscle recovery and mass." },
    { name: "Isotope Protein", image: "/images/ISOTOPE.webp", price: 23000, desc: "Military-grade isolate protein for athletes who demand the best." },
    { name: "Prostar Whey", image: "/images/prostar.webp", price: 28000, desc: "Balanced protein blend ideal for beginners and athletes alike." },
    { name: "Nitrotech Ripped", image: "/images/Nitrotechripped.webp", price: 17000, desc: "Whey protein + fat burner combo for lean muscle and definition." },
    { name: "Nitro Muscletech", image: "/images/Nitromuscletech.webp", price: 19500, desc: "Fast-absorbing whey complex that boosts recovery and strength." },
    { name: "100% Whey", image: "/images/100whey.webp", price: 28300, desc: "Pure whey protein delivering consistent performance results." },
    { name: "Levro Whey", image: "/images/levrowhey_1.webp", price: 22400, desc: "Ultra-filtered whey concentrate with a smooth creamy flavor." },
  ];

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [modalItem, setModalItem] = useState(null);
  const [formData, setFormData] = useState({
    name: user?.firstName || "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postal: "",
  });
  const [step, setStep] = useState(1);
  const [showFormModal, setShowFormModal] = useState(false);
  const [orders, setOrders] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [showOrdersModal, setShowOrdersModal] = useState(false);
  const perPage = 10;

  // ✅ Load orders for user
  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem(`orders_${user.email}`)) || [];
    setOrders(savedOrders);
  }, [user.email]);

  // ✅ Save order to localStorage
  const saveOrder = (order) => {
    const newOrders = [...orders, order];
    setOrders(newOrders);
    localStorage.setItem(`orders_${user.email}`, JSON.stringify(newOrders));
  };

  // ✅ Pagination logic
  const filtered = allSupplements.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );
  const totalPages = Math.ceil(filtered.length / perPage);
  const visibleSupplements = filtered.slice((page - 1) * perPage, page * perPage);

  const handleBuyNow = (item) => {
    setModalItem(item);
    setShowFormModal(true);
    setStep(1);
  };

  const handleConfirmOrder = () => {
    const order = {
      ...modalItem,
      ...formData,
      id: Date.now(),
      date: new Date().toLocaleString(),
    };
    saveOrder(order);
    setShowToast(true);
    setShowFormModal(false);
    setModalItem(null);
    setTimeout(() => setShowToast(false), 4000);
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

      {/* Search + My Orders */}
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
        <button className="btn btn-outline-danger" onClick={() => setShowOrdersModal(true)}>
          My Orders ({orders.length})
        </button>
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
                  <p>{item.desc}</p>
                  <p><strong>Rs. {item.price.toLocaleString()}</strong></p>
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
                <p>{modalItem.desc}</p>
                <ul>
                  <li><strong>Weight:</strong> 5 lbs</li>
                  <li><strong>Protein:</strong> 25g</li>
                  <li><strong>Brand:</strong> Premium Series</li>
                </ul>
                <p><strong>Price:</strong> Rs. {modalItem.price.toLocaleString()}</p>
                <button className="btn btn-success" onClick={() => handleBuyNow(modalItem)}>Buy Now</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Buy Now Form Modal */}
      {showFormModal && (
        <div className="buy-form-overlay">
          <div className="buy-form-modal">
            <h3>{step === 1 ? "Shipping Details" : "Review & Confirm"}</h3>
            <hr />
            {step === 1 ? (
              <div className="form-scroll">
                {["name", "email", "phone", "address", "city", "postal"].map((field) => (
                  <div className="mb-3" key={field}>
                    <label className="form-label text-capitalize">{field}</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData[field]}
                      onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                    />
                  </div>
                ))}
                <button className="btn btn-danger w-100" onClick={() => setStep(2)}>
                  Save & Continue
                </button>
              </div>
            ) :+ (
              <div>
                <h5>Confirm Your Details</h5>
                <ul className="list-group mb-3">
                  {Object.entries(formData).map(([k, v]) => (
                    <li className="list-group-item d-flex justify-content-between" key={k}>
                      <strong>{k}:</strong> <span>{v}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-danger text-center fw-bold">* Cash on Delivery Only *</p>
                <div className="d-flex justify-content-between">
                  <button className="btn btn-outline-secondary" onClick={() => setStep(1)}>Edit Details</button>
                  <button className="btn btn-success" onClick={handleConfirmOrder}>Confirm Order</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* My Orders Modal */}
      {showOrdersModal && (
        <div className="orders-overlay" onClick={() => setShowOrdersModal(false)}>
          <div className="orders-modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal-btn" onClick={() => setShowOrdersModal(false)}>&times;</button>
            <h3>My Orders</h3>
            <hr />
            {orders.length === 0 ? (
              <p>No orders yet.</p>
            ) : (
              orders.map((o) => (
                <div className="order-item mb-3" key={o.id}>
                  <h6>{o.name}</h6>
                  <p><strong>Price:</strong> Rs. {o.price}</p>
                  <p><strong>Date:</strong> {o.date}</p>
                  <hr />
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Toast */}
      {showToast && (
        <div className="order-toast">
          🎉 Order Confirmed! Thank you for shopping with us.
        </div>
      )}
    </div>
  );
}
