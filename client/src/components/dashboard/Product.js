import { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import { togglePlotItem } from "../../actions/plot";

import "./product.css";

const Product = ({ product, togglePlotItem, plot }) => {
  const [isConfigOpen, setIsConfigOpen] = useState(false);
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
      {category.name}
      {isConfigOpen && <i className='fas fa-times-circle icon'></i>}
    </div>
  ));
  const itemInfoContent = (
    <Fragment>
      <div>
        <p>R${product.price}</p>
        <p className='text-s dp'>{product.seller}</p>
      </div>
      <div>
        <i className='fas fa-eye icon icon-light'>
          <p className='info-icon-text'>{product.curr_total_visits}</p>
        </i>
      </div>
      <div>
        <i className='fas fa-shopping-cart icon icon-light'>
          <p className='info-icon-text'>{product.curr_total_sells}</p>
        </i>
      </div>
      <div>
        <i className='fas fa-sync-alt icon icon-light'>
          <p className='info-icon-text'>{product.conversion_rate.toFixed(2)}</p>
        </i>
      </div>
    </Fragment>
  );

  const itemConfigContent = (
    <Fragment>
      <div>
        <i className='fas fa-trash-alt icon icon-btn'></i>
        Deletar
      </div>
    </Fragment>
  );

  const listView = (
    <div className={`item-container ${isPloted ? "border-glow" : ""}`}>
      <img src={product.image_url} alt='produto' />
      <div className='item-outer'>
        <div className='item-header'>
          <div className='icons-header-container'>
            <i className='fas fa-angle-double-left icon icon-btn icon-header-product'></i>
            <i
              className={`fas fa-cog icon icon-btn icon-header-product ${
                isConfigOpen ? "btn-icon-glow-green" : ""
              }`}
              onClick={() => toggleConfigPopup(product.name)}
            ></i>
          </div>
          {/* <div className='dummy'>{isConfigOpen && configPopup}</div> */}
          <p className='item-title'>{product.name}</p>
          <i
            className={`fas fa-chart-bar icon icon-btn icon-header-product ${
              isPloted ? "btn-icon-glow" : ""
            }`}
            onClick={() => toggleItemVisibility(product)}
          ></i>
        </div>
        <div className='categories-box'>{categoriesList}</div>

        <div className='item-inner'>
          {isConfigOpen ? itemConfigContent : itemInfoContent}
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

export default connect(mapStateToProps, { togglePlotItem })(Product);
