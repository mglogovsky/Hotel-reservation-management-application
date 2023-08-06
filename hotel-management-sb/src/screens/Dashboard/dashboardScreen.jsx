import Error from "../../components/common/Error";
import Loader from "../../components/common/reusable/Loader";
import useCardInfo from "../../hooks/controllers/useCardInfo";
import LineCharts from "./LineCharts";

const DashboardScreen = () => {
  const { data = [], isLoading, error } = useCardInfo();

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="card shadow-sm border mt-3 p-4">
          {error && <Error error={error} />}
          <div className="row g-4 justify-content-center">
            {data.map((card, index) => (
              <div key={index} className="col-12 col-sm-6 col-md-4 col-lg-3">
                <div
                  className={`border alert-primary shadow-sm rounded text-white text-center`}
                >
                  <div className="card-title">{card.name}</div>
                  <div className="card-body">
                    <h1 className="text-dark">{card.count}</h1>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <LineCharts />
    </div>
  );
};

export default DashboardScreen;
