import { Link, useParams, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import './Error.scss';
// eslint-disable-next-line import/no-duplicates
 import errorBg from '../../assets/images/background/error-bg.jpg';

const Error = () => {
  const statusCode = useSelector((state) => state.loadingReducer.statusCode);
  const navigate = useNavigate();
  const {status} = useParams();

  return (
    <>
      <div
        className="loginBox"
        style={{
          background: `url(${errorBg}) no-repeat bottom center #fff`,
          // position: 'absolute',
          // top: 0,
          width: '100%',
          // right: '0',
        }}
      >
        <div className="d-flex align-items-center justify-content-center h-100 ">
          <div className="text-center w-100">
            <h1 className="error-title">{statusCode || status || '404'}</h1>
            <div className="">

              {Number(status) === 502 ?

                     <div>
                      <h4>یک خطای فنی رخ داده است.</h4>
                      <p>به دلیل مشکل فنی این صفحه بارگذاری نشد. لطفا مجددا تلاش کنید</p>
                    </div>

                  :statusCode === 500 ? (
                <h4>
                  مشکلی برای سرور پیش آمده و یا از خاموش بودن فیلترشکن خود اطمینان حاصل نمائید !
                </h4>
              ) : (
                <h4>صفحه مورد نظر پیدا نشد !</h4>
              )}
            </div>

            <div className="d-flex   mt-4 w-50 justify-content-center m-auto">
              <div className="w-50  mx-1 ">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="w-100  btn btn-warning "
                >
                  بازگشت به صفحه قبلی
                </button>
              </div>
              <div className="w-50  mx-1  ">
                <Link to="/" className="w-100 btn btn-danger  ">
                  بازگشت به خانه
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Error;
