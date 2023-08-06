import React from "react";

const DashboardCards = () => {
  const cardsData = [
    { text: "Active Users", count: 250, color: "bg-primary" },
    { text: "Revenue", count: "$10,000", color: "bg-success" },
    { text: "Orders", count: 150, color: "bg-warning" },
    { text: "Feedbacks", count: 50, color: "bg-info" },
    { text: "New Customers", count: 30, color: "bg-danger" },
  ];

  return (
    <div className="card mt-3 py-4">
      <div className="container">
        <div className="row g-4 justify-content-center">
          {cardsData.map((card, index) => (
            <div key={index} className="col-12 col-sm-6 col-md-4 col-lg-3">
              <div className={`alert-warning border rounded text-center`}>
                <div className="card-title">{card.text}</div>
                <div className="card-body">
                  <h2>{card.count}</h2>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardCards;
