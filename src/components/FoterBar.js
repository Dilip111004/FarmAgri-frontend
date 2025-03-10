import React from 'react';

export default function Footer() {
  return (
    <div>
      <footer
        className="bd-footer py-4 py-md-5 mt-5"
        style={{
          background: "linear-gradient(135deg, #E0FFE0 0%, #C1FFC1 25%, #FFFACD 50%, #FFE4B5 100%)",
        }}
      >
        <div className="container py-4 py-md-5 px-4 px-md-3 text-body-secondary">
          <div className="row">
            <div className="col-lg-3 mb-3">
              <a
                className="d-inline-flex align-items-center mb-2 text-body-emphasis text-decoration-none"
                href="/"
                aria-label="Farm Management"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="32"
                  className="d-block me-2"
                  viewBox="0 0 118 94"
                  role="img"
                >
                  <title>Farm Management</title>
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M24.509 0c-6.733 0-11.715 5.893-11.492 12.284.214 6.14-.064 14.092-2.066 20.577C8.943 39.365 5.547 43.485 0 44.014v5.972c5.547.529 8.943 4.649 10.951 11.153 2.002 6.485 2.28 14.437 2.066 20.577C12.794 88.106 17.776 94 24.51 94H93.5c6.733 0 11.714-5.893 11.491-12.284-.214-6.14.064-14.092 2.066-20.577 2.009-6.504 5.396-10.624 10.943-11.153v-5.972c-5.547-.529-8.934-4.649-10.943-11.153-2.002-6.484-2.28-14.437-2.066-20.577C105.214 5.894 100.233 0 93.5 0H24.508z"
                    fill="currentColor"
                  ></path>
                </svg>
                <span className="fs-5">Farm Management</span>
              </a>
              <ul className="list-unstyled small">
                <li className="mb-2">
                  Designed and developed to simplify farm operations and management.
                </li>
                <li className="mb-2">© {new Date().getFullYear()} Agriculture Farm Management System</li>
              </ul>
            </div>
            <div className="col-6 col-lg-2 offset-lg-1 mb-3">
              <h5>Quick Links</h5>
              <ul className="list-unstyled">
                <li className="mb-2"><a href="/dashboard">Dashboard</a></li>
                <li className="mb-2"><a href="/add-product">Add Product</a></li>
                <li className="mb-2"><a href="/buyer-dashboard">Buyer Dashboard</a></li>
                <li className="mb-2"><a href="/seller-dashboard">Seller Dashboard</a></li>
                <li className="mb-2"><a href="/support">Support</a></li>
              </ul>
            </div>
            <div className="col-6 col-lg-2 mb-3">
              <h5>Community</h5>
              <ul className="list-unstyled">
                <li className="mb-2"><a href="https://agriculture-forum.com" target="_blank" rel="noopener">Forum</a></li>
                <li className="mb-2"><a href="https://github.com/agri-farm-system" target="_blank" rel="noopener">GitHub</a></li>
                <li className="mb-2"><a href="https://stackoverflow.com/questions/tagged/farm-management" target="_blank" rel="noopener">Stack Overflow</a></li>
              </ul>
            </div>
            <div className="col-6 col-lg-2 mb-3">
              <h5>Legal</h5>
              <ul className="list-unstyled">
                <li className="mb-2"><a href="/terms">Terms of Service</a></li>
                <li className="mb-2"><a href="/privacy">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
