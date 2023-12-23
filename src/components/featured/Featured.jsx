import './featured.css';
import imgDN from '../../data/image/DN.jpg';
import imgHN from '../../data/image/HN.jpg';
import imgHCM from '../../data/image/HCM.jpg';
import { Fragment, useEffect, useState } from 'react';
import Global from '../../global';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Featured = () => {
  const [overviewData, setOverviewData] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    axios.get(`${Global.BASE_BACKEND_API}/overview`).then((res) => {
      setOverviewData(res.data);
    });

    // fetch(`${Global.BASE_BACKEND_API}/overview`, {
    //   mode: 'cors',
    // })
    //   .then((res) => {
    //     if (!res.ok) {
    //       throw new Error(res.statusText);
    //     }
    //     return res.json();
    //   })
    //   .then((result) => setOverviewData(result))
    //   .catch((err) => console.log(err));
  }, [setOverviewData]);
  return (
    <Fragment>
      {overviewData && (
        <div className="featured">
          <div
            className="featuredItem"
            onClick={() =>
              navigate('/hotels', { state: { destination: 'Da Nang' } })
            }
          >
            <img src={imgDN} alt="" className="featuredImg" />
            <div className="featuredTitles">
              <h1>Da Nang</h1>
              <h2>{overviewData.numberOfHotelInDN} properties</h2>
            </div>
          </div>

          <div
            className="featuredItem"
            onClick={() =>
              navigate('/hotels', { state: { destination: 'Ho Chi Minh' } })
            }
          >
            <img src={imgHCM} alt="" className="featuredImg" />
            <div className="featuredTitles">
              <h1>Ho Chi Minh</h1>
              <h2>{overviewData.numberOfHotelInHCM} properties</h2>
            </div>
          </div>
          <div
            className="featuredItem"
            onClick={() =>
              navigate('/hotels', { state: { destination: 'Ha Noi' } })
            }
          >
            <img src={imgHN} alt="" className="featuredImg" />
            <div className="featuredTitles">
              <h1>Ha Noi</h1>
              <h2>{overviewData.numberOfHotelInHN} properties</h2>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Featured;
