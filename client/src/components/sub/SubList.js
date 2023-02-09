import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getSubs } from "../../functions/sub";

const SubList = () => {
  const [subs, setSubs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getSubs().then((res) => {
      setSubs(res.data);
      setLoading(false);
    });
  }, []);

  const showSubs = () =>
    subs.map((s) => (
      <Link
        key={s._id}
        style={{ backgroundColor: "black", color: "white" }}
        to={`/sub/${s.slug}`}
        className="col btn btn-outlined-primary btn-lg btn-block btn-raised m-3"
      >
        <div key={s._id}>{s.name}</div>
      </Link>
    ));

  return (
    <div className="container">
      <div className="row" style={{ marginTop: "20px" }}>
        {loading ? <h4 className="text-center">Loading...</h4> : showSubs()}
      </div>
    </div>
  );
};

export default SubList;
