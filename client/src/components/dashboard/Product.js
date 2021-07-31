import { Fragment, useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { togglePlotItem } from "../../actions/plot";
import {
  deleteProduct,
  deleteCategoryFromProduct,
} from "../../actions/product";
import { FaTimes } from "react-icons/fa";
import { BsFillExclamationCircleFill } from "react-icons/bs";
import { DateTime } from "luxon";

import "./product.css";

const Product = ({
  product,
  togglePlotItem,
  deleteProduct,
  deleteCategoryFromProduct,
  plot,
}) => {
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [configParams, setConfigParams] = useState({ name: "" });
  const [isPloted, setisPloted] = useState(false);

  const { name } = configParams;

  useEffect(() => {
    plot.plotItems.includes(product.id)
      ? setisPloted(true)
      : setisPloted(false);
  }, [plot, product]);

  const toggleConfigPopup = () => {
    setIsConfigOpen(!isConfigOpen);
    if (!isConfigOpen && isDetailsOpen) {
      setIsDetailsOpen(false);
    }
  };

  const toggleDetailsPopup = () => {
    setIsDetailsOpen(!isDetailsOpen);
    if (!isDetailsOpen && isConfigOpen) {
      setIsConfigOpen(false);
    }
  };

  const onChange = (e) => {
    setConfigParams({ ...configParams, [e.target.name]: e.target.value });
  };

  const toggleItemVisibility = (product) => {
    setisPloted(!isPloted);
    togglePlotItem(plot.plotItems, product.id, !isPloted);
  };

  const saveConfig = (e) => {
    e.preventDefault();
  };

  const configPopup = (
    <Fragment>
      <form id='config-form' onSubmit={(e) => saveConfig(e)}></form>
      <div className='config-container' onSubmit={(e) => saveConfig(e)}>
        <p>Configurações</p>
        <input
          type='text'
          form='config-form'
          name='name'
          value={name}
          onChange={(e) => onChange(e)}
        />
        <input
          type='submit'
          className='btn btn-success'
          value='Salvar'
          form='config-form'
        />
      </div>
    </Fragment>
  );

  const categoriesList = product.category.map((category, index) => (
    <div
      className='categories-tag'
      style={{
        border: `1px solid ${category.borderColor}`,
        backgroundColor: `${category.bgColor}`,
      }}
      key={index}
    >
      {/* <div className='tag'> */}
      <p>{category.name}</p>
      <FaTimes
        style={{
          marginLeft: "5px",
          display: `${isConfigOpen ? "block" : "none"}`,
        }}
        onClick={() => deleteCategoryFromProduct(product.id, category.name)}
        className='tag-delete'
      />
    </div>
  ));

  const itemInfoContent = (
    <Fragment>
      <div>
        <i className='fas fa-shopping-cart icon icon-colorful'></i>
        <p className='info-icon-text'>{product.curr_total_sells}</p>
      </div>
      <div>
        <i className='fas fa-eye icon icon-colorful'></i>
        <p className='info-icon-text'>{product.curr_total_visits}</p>
      </div>
      <div>
        <i className='fas fa-exchange-alt  icon icon-colorful'></i>
        {/* <i className='fas fa-eye icon icon-colorful'></i> */}
        <p className='info-icon-text'>
          {product.mean_sells !== null && product.mean_sells !== undefined
            ? product.mean_sells.toFixed(2)
            : `x`}
        </p>
      </div>
      <div>
        <i className='fas fa-sync-alt icon icon-colorful'></i>
        <p className='info-icon-text'>
          {product.conversion_rate !== null &&
          product.conversion_rate !== undefined
            ? (100 * product.conversion_rate).toFixed(1)
            : `x`}
          %
        </p>
      </div>
    </Fragment>
  );
  const itemConfigContent = (
    <Fragment>
      <div
        className='icon-btn btn-danger'
        onClick={() => deleteProduct(product.id)}
      >
        <i
          className='fas fa-trash-alt icon-sm'
          style={{ marginRight: "5px" }}
        ></i>
        Deletar
      </div>
    </Fragment>
  );
  const itemDetailsContent = (
    <Fragment>
      <div className='flex-col-space-left'>
        <div className='mg-b-2 flex-row'>
          <i className='fas fa-store mg-r-1 icon icon-colorful'></i>
          <p className='item-info-text'>{product.seller}</p>
        </div>
        <div className='mg-b-2 flex-row'>
          <i className='far fa-clock mg-r-1 icon icon-colorful'></i>
          <p className='item-info-text'>{`${DateTime.fromISO(
            product.createdAt
          ).toFormat("ff")}`}</p>
        </div>
      </div>
      <div className='flex-col-space-left'>
        <div className='mg-b-2 flex-row'>
          <i className='fas fa-money-bill mg-r-1 icon icon-colorful'></i>
          <p className='item-info-text'>R${product.price}</p>
        </div>
        <p
          className='item-info-text'
          style={{ color: !product.is_buy_box && "#555" }}
        >
          {true && "Buybox"}
        </p>
      </div>
    </Fragment>
  );

  const listView = (
    <div
      className={`item-container noselect ${isPloted ? "border-glow" : ""} ${
        product.status != "active" ? "item-paused" : ""
      }`}
    >
      {/* <div className='item-upper'>
        <a href={product.url} target='_blank'>
          <img src={product.image_url} alt='produto' className='image-btn' />
        </a>
        <div className='item-upper-header-categories-container'>
          <div className='item-header'>
            <i
              className={`fas fa-info icon icon-btn icon-header-product ${
                isDetailsOpen ? "btn-icon-glow-green" : ""
              }`}
              style={{ marginRight: "5px" }}
              onClick={() => toggleDetailsPopup(product.name)}
            ></i>
            <i
              className={`fas fa-cog icon icon-btn icon-header-product ${
                isConfigOpen ? "btn-icon-glow-green" : ""
              }`}
              onClick={() => toggleConfigPopup(product.name)}
            ></i>
            <p className='item-title'>
              {product.name.length > 30
                ? product.name.slice(0, 31).concat("...")
                : product.name}
            </p>
            {product.status != "active" && (
              <BsFillExclamationCircleFill className='icon-paused' />
            )}
            <i
              className={`fas fa-chart-bar icon icon-btn icon-header-product ${
                isPloted ? "btn-icon-glow" : ""
              }`}
              onClick={() => toggleItemVisibility(product)}
            ></i>
          </div>
          {!isDetailsOpen && (
            <div className='categories-box'>{categoriesList}</div>
          )}
        </div>
      </div>
      <div
        className={`item-inner ${
          isDetailsOpen && "product-details-expand-h mg-t-1"
        }`}
      >
        {isConfigOpen
          ? itemConfigContent
          : isDetailsOpen
          ? itemDetailsContent
          : itemInfoContent}
      </div> */}
      <a href={product.url} target='_blank'>
        <img src={product.image_url} alt='produto' className='image-btn' />
      </a>
      <div className='item-outer'>
        <div className='item-header'>
          <i
            className={`fas fa-info icon icon-btn icon-header-product ${
              isDetailsOpen ? "btn-icon-glow-green" : ""
            }`}
            style={{ marginRight: "5px" }}
            onClick={() => toggleDetailsPopup(product.name)}
          ></i>
          <i
            className={`fas fa-cog icon icon-btn icon-header-product ${
              isConfigOpen ? "btn-icon-glow-green" : ""
            }`}
            onClick={() => toggleConfigPopup(product.name)}
          ></i>
          <p className='item-title'>
            {product.name.length > 30
              ? product.name.slice(0, 31).concat("...")
              : product.name}
          </p>
          {product.status != "active" && (
            <BsFillExclamationCircleFill className='icon-paused' />
          )}
          <i
            className={`fas fa-chart-bar icon icon-btn icon-header-product ${
              isPloted ? "btn-icon-glow" : ""
            }`}
            onClick={() => toggleItemVisibility(product)}
          ></i>
        </div>
        {!isDetailsOpen && (
          <div className='categories-box'>{categoriesList}</div>
        )}

        <div
          className={`item-inner ${
            isDetailsOpen && "product-details-expand-h mg-t-1"
          }`}
        >
          {isConfigOpen
            ? itemConfigContent
            : isDetailsOpen
            ? itemDetailsContent
            : itemInfoContent}
        </div>
      </div>
    </div>
  );
  return <Fragment>{listView}</Fragment>;
};

const mapStateToProps = (state) => ({
  plot: state.plot,
});

export default connect(mapStateToProps, {
  togglePlotItem,
  deleteProduct,
  deleteCategoryFromProduct,
})(Product);
