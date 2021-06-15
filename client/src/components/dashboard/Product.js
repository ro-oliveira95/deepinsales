import { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import { addPlotItem } from "../../actions/plot";

import "./product.css";

const Product = ({ product, addPlotItem, plot }) => {
  const [isHintShown, setIsHintShown] = useState(false);
  const [isPloted, setisPloted] = useState(["t1", "t2"]);

  useEffect(() => {
    console.log(plot.plotItems);
    addPlotItem(plot.plotItems, product.name);
  }, [addPlotItem]);

  const categoriesList = product.category.map((category, index) => (
    <div
      className='categories-tag'
      style={{
        border: `1px solid ${category.borderColor}`,
        backgroundColor: `${category.bgColor}`,
      }}
      key={index}
    >
      {category.name}
    </div>
  ));
  const showHint = (
    <div className='info-hint'>
      <p>teste</p>
    </div>
  );
  const listView = (
    <div className='item-container'>
      <img src={product.image_url} alt='produto' />
      <div className='item-outer'>
        <div className='item-header'>
          <i
            className='fas fa-info-circle hint-hover'
            onMouseEnter={() => setIsHintShown(true)}
            onMouseLeave={() => setIsHintShown(false)}
          >
            {isHintShown && (
              <div className='info-hint'>
                {/* <i className='fas fa-dollar-sign icon'>{product.price}</i> */}
                <p className='dp'>
                  <span className='text-strong'>Preço</span> R${product.price}
                </p>
                <p className='text-s dp'>{product.seller}</p>
              </div>
            )}
          </i>
          <p className='item-title'>{product.name}</p>
          <i className='fas fa-angle-double-right icon icon-btn'></i>
        </div>
        <div className='categories-box'>{categoriesList}</div>

        <div className='item-inner'>
          <div className='infobox'>
            <div>
              <i className='fas fa-eye icon icon-light'>
                <p className='info-icon-text'>400</p>
              </i>
            </div>
            <div>
              <i className='fas fa-shopping-cart icon icon-light'>
                <p className='info-icon-text'>100</p>
              </i>
            </div>
            <div>
              <i className='fas fa-sync-alt icon icon-light'>
                <p className='info-icon-text'>0.3</p>
              </i>
            </div>
          </div>
          <div className='actions'>
            <i className='fas fa-cog icon icon-btn icon-15x'></i>
            <i className='fas fa-chart-bar icon icon-btn icon-15x'></i>
          </div>
        </div>
        {/* </div> */}
      </div>
    </div>
  );
  return <Fragment>{listView}</Fragment>;
};

const mapStateToProps = (state) => ({
  plot: state.plot,
});

export default connect(mapStateToProps, { addPlotItem })(Product);
