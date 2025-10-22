import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import axios from "axios";
import { ENDPOINT, Image_URL } from "../endpoints";
import logo from "../assets/logo.png"; // 🖼️ replace with your actual logo path

const About = () => {
  const [slide, setSlide] = useState([]);
  const [companyinfo, setCompanyinfo] = useState([]);
  const [contact, setContact] = useState([]);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  // 📸 About slide list
  useEffect(() => {
    const fetchSlide = async () => {
      try {
        const res = await axios.get(ENDPOINT.ABOUT_SLIDE_LIST, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSlide(res.data.data);
      } catch (error) {
        console.log("Failed to fetch about", error);
      }
    };
    fetchSlide();
  }, [token]);

  // 🏢 Company info + contact list
  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const res = await axios.get(ENDPOINT.COMPANY_INFO_LIST, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCompanyinfo(res.data.data);
      } catch (error) {
        console.log("Failed to fetch company info", error);
      }
    };

    const fetchCompanyContact = async () => {
      try {
        const res = await axios.get(ENDPOINT.CONTACT_LIST, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setContact(res.data.data);
      } catch (error) {
        console.log("Failed to fetch company contact", error);
      }
    };

    fetchCompany();
    fetchCompanyContact();
  }, [token]);

  return (
    <div className="min-h-screen bg-white text-gray-800 pb-12">
      {/* Header Logo */}
      <div className="flex items-center justify-center py-6">
        <img
          src={logo}
          alt="STG Cement Distribution Logo"
          className="w-[150px] h-auto object-contain"
        />
      </div>

      {/* Swiper Section */}
      <div className="relative w-full">
        <Swiper
          modules={[Pagination, Autoplay]}
          loop={true}
          spaceBetween={20}
          slidesPerView={1}
          autoplay={{ delay: 5000 }}
          speed={1000}
          pagination={{
            clickable: true,
            el: ".custom-pagination",
          }}
          className="w-full h-64 md:h-96"
        >
          {slide.map((img, index) => (
            <SwiperSlide key={index}>
              <img
                src={`${Image_URL}${img.image}`}
                alt={img.title}
                className="w-full h-full object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="custom-pagination flex justify-center mt-3"></div>
      </div>

      {/* Company Info */}
      {companyinfo.map((item, index) => (
        <div key={index}>
          <div className="max-w-3xl mx-auto px-6 py-9 text-center">
            <h1 className="text-2xl font-bold mb-2">{item.company_name}</h1>
            <p className="italic font-medium mb-6">{item.tagline}</p>

            <p className="text-justify leading-5 mb-6">{item.about}</p>

            <h2 className="text-lg font-semibold leading-5 mb-2">
              {item.vision}
            </h2>
            <p className="mb-6 text-justify">{item.vision_data}</p>

            <h2 className="text-lg leading-5 font-semibold mb-2">
              {item.mission}
            </h2>
            <p className="mb-10 text-justify">{item.mission_data}</p>
          </div>

          {/* Google Map */}
          <div className="pt-4">
            <iframe
              src={item.google_map_link}
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Map"
            ></iframe>
          </div>
        </div>
      ))}

      {/* Contact Section */}
      <div className="max-w-3xl mx-auto px-6 text-center mt-10 mb-10">
        <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
        {contact.map((item, index) => (
          <div key={index}>
            <p className="mb-1">
              <strong>Sale: </strong>
              <span className="text-[15px]">{item.sales_phones}</span>
            </p>
            <p className="mb-1">
              <strong>Office: </strong>
              <span className="text-[15px]">{item.office_phones}</span>
            </p>
            <p className="mt-4">
              <strong>Address: </strong>
              <span className="text-[15px]">{item.address}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;
