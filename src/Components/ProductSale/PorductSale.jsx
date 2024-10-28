import Aos from 'aos';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';

export default function ProductSale() {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const selectedTime = new Date("Apr 30, 2024").getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = selectedTime - now;

      if (difference < 0) {
        clearInterval(interval);
      } else {
        setDays(Math.floor(difference / (1000 * 60 * 60 * 24)));
        setHours(Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
        setMinutes(Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)));
        setSeconds(Math.floor((difference % (1000 * 60)) / 1000));
      }
    };

    const interval = setInterval(updateCountdown, 1000);
    updateCountdown();

    return () => clearInterval(interval);
  }, []);

  /* ================== Get Products ======================= */
  async function getTrandingProducts() {
    try {
      let { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/products");
      return data.data;
    } catch (error) {
      console.log(error);
    }
  }

  const { data } = useQuery("trandingProducts", getTrandingProducts);

  useEffect(() => {
    Aos.init({
      offset: 100,
      easing: 'ease-in-sine',
      delay: 0,
    });
  }, []);

  return (
    <section className="product-sale">
      <div className="container">
        <div className="row shadow">
          {/* Img */}
          <div className="col-md-6">
            <div className="image py-5">
              <img src={require('../../Assets/images/Sale/laptop.png')} alt="dell" data-aos="fade-right" data-aos-duration="1000" />
            </div>
          </div>

          <div className="col-md-6 shadow">
            <div className="info py-5">
              {/* Sale */}
              <div className="sale">
                <p data-aos="fade-down" data-aos-duration="1000">Up to 50% Off</p>
              </div>

              {/* Title */}
              <div className="product-data">
                {data?.slice(39, 40).map((product) => (
                  <div key={product.id}>
                    <h2 data-aos="fade-right" data-aos-duration="1000">
                      {product.title.split(' ').splice(0, 2).join(' ')}
                    </h2>
                    <div className="price">
                      <p className="old-price" data-aos="fade-right" data-aos-duration="1000">EGY {product.price * 2}</p>
                      <p className="new-price" data-aos="fade-right" data-aos-duration="1000">EGY {product.price}</p>
                    </div>
                  </div>
                ))}
                <h4 data-aos="fade-up" data-aos-duration="1000">Limited Time Offer</h4>
              </div>

              {/* Date */}
              <div className="date shadow">
                <div>
                  <span>{days}</span>
                  <span data-aos="fade-up" data-aos-duration="1000">Days</span>
                </div>
                <span className="dot">:</span>
                <div>
                  <span>{hours}</span>
                  <span data-aos="fade-down" data-aos-duration="1000">Hours</span>
                </div>
                <span className="dot">:</span>
                <div>
                  <span>{minutes}</span>
                  <span data-aos="fade-up" data-aos-duration="1000">Minutes</span>
                </div>
                <span className="dot">:</span>
                <div>
                  <span>{seconds}</span>
                  <span data-aos="fade-down" data-aos-duration="1000">Seconds</span>
                </div>
              </div>

              {/* Btn */}
              <div className="btns">
                <Link to={`/productdetails/6408da1c6406cd15828e8f0a`}>
                  <button>Show Now</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
