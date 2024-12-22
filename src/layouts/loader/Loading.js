import React from 'react';
import {Spinner} from 'reactstrap';

const Loading = ({
  isFullLoading,type,
  isDataTable,
  dataTableDitail,
  isShowProfile,
  isDataList,
  isSpinner,
  isText,
  isMassageList,
}) => {
  const imageBox = {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    marginLeft: '1rem',
  };
  const list = {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  };
  const fullLoading = {
    background: '#f5f6f7',
    width: '100%',
    height: ' 100%',
    position: 'absolute',
    zIndex: '11',
    opacity: '0.5',
    borderRadius: '3px',
    top: 0,
    right: '0',
  };

  return (
    <>
      {isMassageList && (
        <div className=" w-100 h-100" aria-hidden="true">
          <div style={list} className="px-2 card-body">
            {type !== 'alert' && <h5 className="card-title placeholder-glow">
              <span style={imageBox} className="placeholder col-6"></span>
            </h5>}
            <p className="card-text placeholder-glow w-100">
              <span className="placeholder col-4"></span>
              <span className="placeholder col-6"></span>
              <span className="placeholder col-7"></span>
              <span className="placeholder col-4"></span>
            </p>
          </div>
          <hr />
          <div style={list} className="px-2 card-body">
            {type !== 'alert' && <h5 className="card-title placeholder-glow">
              <span style={imageBox} className="placeholder col-6"></span>
            </h5>}
            <p className="card-text placeholder-glow w-100">
              <span className="placeholder col-4"></span>
              <span className="placeholder col-6"></span>
              <span className="placeholder col-7"></span>
              <span className="placeholder col-4"></span>
            </p>
          </div>
          <hr />
          <div style={list} className="px-2 card-body">
            {type !== 'alert' && <h5 className="card-title placeholder-glow">
              <span style={imageBox} className="placeholder col-6"></span>
            </h5>}
            <p className="card-text placeholder-glow w-100">
              <span className="placeholder col-4"></span>
              <span className="placeholder col-6"></span>
              <span className="placeholder col-7"></span>
              <span className="placeholder col-4"></span>
            </p>
          </div>
          <hr />
          <div style={list} className="px-2 card-body">
            {type !== 'alert' && <h5 className="card-title placeholder-glow">
              <span style={imageBox} className="placeholder col-6"></span>
            </h5>}
            <p className="card-text placeholder-glow w-100">
              <span className="placeholder col-4"></span>
              <span className="placeholder col-6"></span>
              <span className="placeholder col-7"></span>
              <span className="placeholder col-4"></span>
            </p>
          </div>
        </div>
      )}
      {isDataList && (
        <div className=" w-100 h-100" aria-hidden="true">
          <div style={list} className="card-body">
            <h5 className="card-title placeholder-glow">
              <span style={imageBox} className="placeholder col-6"></span>
            </h5>
            <p className="card-text placeholder-glow w-100">
              <span className="placeholder col-4"></span>
              <span className="placeholder col-6"></span>
              <span className="placeholder col-7"></span>
              <span className="placeholder col-4"></span>
            </p>
          </div>
          <div style={list} className="card-body">
            <h5 className="card-title placeholder-glow">
              <span style={imageBox} className="placeholder col-6"></span>
            </h5>
            <p className="card-text placeholder-glow w-100">
              <span className="placeholder col-4"></span>
              <span className="placeholder col-6"></span>
              <span className="placeholder col-7"></span>
              <span className="placeholder col-4"></span>
            </p>
          </div>
          <div style={list} className="card-body">
            <h5 className="card-title placeholder-glow">
              <span style={imageBox} className="placeholder col-6"></span>
            </h5>
            <p className="card-text placeholder-glow w-100">
              <span className="placeholder col-4"></span>
              <span className="placeholder col-6"></span>
              <span className="placeholder col-7"></span>
              <span className="placeholder col-4"></span>
            </p>
          </div>
          <div style={list} className="card-body">
            <h5 className="card-title placeholder-glow">
              <span style={imageBox} className="placeholder col-6"></span>
            </h5>
            <p className="card-text placeholder-glow w-100">
              <span className="placeholder col-4"></span>
              <span className="placeholder col-6"></span>
              <span className="placeholder col-7"></span>
              <span className="placeholder col-4"></span>
            </p>
          </div>
          <div style={list} className="card-body">
            <h5 className="card-title placeholder-glow">
              <span style={imageBox} className="placeholder col-6"></span>
            </h5>
            <p className="card-text placeholder-glow w-100">
              <span className="placeholder col-4"></span>
              <span className="placeholder col-6"></span>
              <span className="placeholder col-7"></span>
              <span className="placeholder col-4"></span>
            </p>
          </div>
          <div style={list} className="card-body">
            <h5 className="card-title placeholder-glow">
              <span style={imageBox} className="placeholder col-6"></span>
            </h5>
            <p className="card-text placeholder-glow w-100">
              <span className="placeholder col-4"></span>
              <span className="placeholder col-6"></span>
              <span className="placeholder col-7"></span>
              <span className="placeholder col-4"></span>
            </p>
          </div>
          <div style={list} className="card-body">
            <h5 className="card-title placeholder-glow">
              <span style={imageBox} className="placeholder col-6"></span>
            </h5>
            <p className="card-text placeholder-glow w-100">
              <span className="placeholder col-4"></span>
              <span className="placeholder col-6"></span>
              <span className="placeholder col-7"></span>
              <span className="placeholder col-4"></span>
            </p>
          </div>
          <div style={list} className="card-body">
            <h5 className="card-title placeholder-glow">
              <span style={imageBox} className="placeholder col-6"></span>
            </h5>
            <p className="card-text placeholder-glow w-100">
              <span className="placeholder col-4"></span>
              <span className="placeholder col-6"></span>
              <span className="placeholder col-7"></span>
              <span className="placeholder col-4"></span>
            </p>
          </div>
        </div>
      )}
      {/* {isProductList && (
        <div className=" w-100 h-100" aria-hidden="true">
          <div style={list} className="card-body">
            <h5 className="card-title placeholder-glow">
              <span style={imageBox} className="placeholder col-6"></span>
            </h5>
            <p className="card-text placeholder-glow w-100">
              <span className="placeholder col-4"></span>
              <span className="placeholder col-6"></span>
              <span className="placeholder col-7"></span>
              <span className="placeholder col-4"></span>
            </p>
          </div>
        </div>
      )}
      {isCategoryList && (
        <div className=" w-100 h-100" aria-hidden="true">
          <div style={list} className="card-body">
            <p className="card-text placeholder-glow w-100">
              <span className="placeholder col-4"></span>
              <span className="placeholder col-6"></span>
              <span className="placeholder col-7"></span>
              <span className="placeholder col-4"></span>
            </p>
          </div>
        </div>
      )} */}
      {/* {isRoleList && (
        <div className=" w-100 h-100" aria-hidden="true">
          <div style={list} className="card-body">
            <p className="card-text placeholder-glow w-100">
              <span className="placeholder col-12"></span>
            </p>
          </div>
        </div>
      )} */}

      {isShowProfile && (
        <div className=" w-100 h-100" aria-hidden="true">
          <div style={list} className="card-body">
            <h5
              className=" position-absolute card-title placeholder-glow"
              style={{ left: 0, top: '30px' }}
            >
              <span style={imageBox} className="placeholder col-6"></span>
            </h5>
            <p className="card-text placeholder-glow w-100">
              <span className="placeholder col-4"></span>
              <span className="placeholder col-6"></span>
              <span className="placeholder col-7"></span>
              <span className="placeholder col-4"></span>
              <span className="placeholder col-4"></span>
              <span className="placeholder col-6"></span>
              <span className="placeholder col-7"></span>
              <span className="placeholder col-4"></span>
              <span className="placeholder col-4"></span>
              <span className="placeholder col-6"></span>
              <span className="placeholder col-7"></span>
              <span className="placeholder col-4"></span>
            </p>
          </div>
        </div>
      )}
      {/* {ispermissionList && (
        <div className=" w-100 h-100" aria-hidden="true">
          <div style={list} className="card-body">
            <p className="card-text flex-column d-flex placeholder-glow w-100">
              <span className="placeholder col-5 mb-2"></span>
              <span className="placeholder col-5 mb-2 ms-4"></span>
              <span className="placeholder col-5 mb-2 ms-4"></span>
              <span className="placeholder col-5 mb-2 ms-4"></span>
              <span className="placeholder col-5 mb-2 ms-4"></span>
              <span className="placeholder col-5 mb-5 ms-4"></span>
              <span className="placeholder col-5 mb-2"></span>
              <span className="placeholder col-5 mb-2 ms-4"></span>
              <span className="placeholder col-5 mb-2 ms-4"></span>
              <span className="placeholder col-5 mb-2 ms-4"></span>
              <span className="placeholder col-5 mb-2 ms-4"></span>
              <span className="placeholder col-5 mb-2 ms-4"></span>
            </p>
          </div>
        </div>
      )} */}
      {isSpinner && (
        <div className="text-center mt-3" aria-hidden="true">
          <Spinner color="primary" />
        </div>
      )}
      {isFullLoading && <div style={fullLoading}></div>}
      {isText && (
        <div className="w-100 h-100" aria-hidden="true">
          <div style={list} className="card-body">
            <p className="card-text placeholder-glow w-100">
              <span className="placeholder col-8"></span>
              <span className="placeholder col-6"></span>
              <span className="placeholder col-7"></span>
            </p>
          </div>
        </div>
      )}
      {isDataTable && (
        <div className="w-100 h-100 pt-5" aria-hidden="true">
          <div className="border-bottom pb-4 mb-4">
            <p className="card-text placeholder-glow w-100 d-flex align-items-center justify-content-between ">
              <span className="placeholder col-2" style={{ height: '30px' }}></span>
              <span className="placeholder col-2" style={{ height: '30px' }}></span>
              <span className="placeholder col-2" style={{ height: '30px' }}></span>
              <span className="placeholder col-2" style={{ height: '30px' }}></span>
              <span className="placeholder col-2" style={{ height: '30px' }}></span>
            </p>
          </div>
          <div className="border-bottom pb-4 mb-4">
            <p className="card-text placeholder-glow w-100 d-flex align-items-center justify-content-between ">
              <span className="placeholder col-2" style={{ height: '30px' }}></span>
              <span className="placeholder col-2" style={{ height: '30px' }}></span>
              <span className="placeholder col-2" style={{ height: '30px' }}></span>
              <span className="placeholder col-2" style={{ height: '30px' }}></span>
              <span className="placeholder col-2" style={{ height: '30px' }}></span>
            </p>
          </div>
          <div className="border-bottom pb-4 mb-4">
            <p className="card-text placeholder-glow w-100 d-flex align-items-center justify-content-between ">
              <span className="placeholder col-2" style={{ height: '30px' }}></span>
              <span className="placeholder col-2" style={{ height: '30px' }}></span>
              <span className="placeholder col-2" style={{ height: '30px' }}></span>
              <span className="placeholder col-2" style={{ height: '30px' }}></span>
              <span className="placeholder col-2" style={{ height: '30px' }}></span>
            </p>
          </div>
          <div className="border-bottom pb-4 mb-4">
            <p className="card-text placeholder-glow w-100 d-flex align-items-center justify-content-between ">
              <span className="placeholder col-2" style={{ height: '30px' }}></span>
              <span className="placeholder col-2" style={{ height: '30px' }}></span>
              <span className="placeholder col-2" style={{ height: '30px' }}></span>
              <span className="placeholder col-2" style={{ height: '30px' }}></span>
              <span className="placeholder col-2" style={{ height: '30px' }}></span>
            </p>
          </div>
          <div className="">
            <p className="card-text placeholder-glow w-100 d-flex align-items-center justify-content-between ">
              <span className="placeholder col-12" style={{ height: '30px' }}></span>
            </p>
          </div>
        </div>
      )}
      {dataTableDitail && (
        <div className="w-100 h-100" aria-hidden="true">
          <div style={list} className="card-body">
            <p className="card-text placeholder-glow w-100">
              <span className="placeholder col-8"></span>
              <span className="placeholder col-6"></span>
              <span className="placeholder col-7"></span>
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Loading;
