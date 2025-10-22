import React, { useEffect, useState } from "react";
import axios from "axios";
import { ENDPOINT } from "../endpoints";

const Terms = () => {
  const [terms, setTerms] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchTerms = async () => {
      try {
        const res = await axios.get(ENDPOINT.TERMS_CONDITION_LIST, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTerms(res.data.data);
      } catch (error) {
        console.error("Failed to fetch Terms", error);
      }
    };
    fetchTerms();
  }, [token]);

  return (
    <div className="min-h-screen bg-white text-gray-800 pb-12 flex items-center justify-center">
      {terms.map((item, index) => (
        <div key={index} className="max-w-3xl bg-white p-8 relative">
          <div className="custom-border-box">
            <p className="font-semibold text-lg text-gray-900">
              Effective Date: <span className="font-semibold">{item.date}</span>
            </p>

            <p className="font-semibold text-lg mt-2 text-gray-900">
              Welcome to STG Distribution!
            </p>

            <p className="mt-3 text-gray-800 leading-relaxed">{item.data}</p>
          </div>

          <div className="mb-5">
            <div className="text-gray-700 leading-relaxed whitespace-pre-line">
              {item.info}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Terms;
