import { Fragment, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { queryProducts } from "../../actions/product";
import { togglePlotVisualization } from "../../actions/plot";
import Product from "./Product";
import AddProductForm from "./AddProductForm";
import Alert from "../layout/Alert";

import { CommonLoading } from "react-loadingg";
import Switch from "react-switch";
import { BiTime } from "react-icons/bi";
import { BsArrowUpShort } from "react-icons/bs";

function ProductList({
  queryProducts,
  products,
  productsInView,
  loading,
  togglePlotVisualization,
}) {
  const [plotConfig, setPlotConfig] = useState(false);
  const [isAddProduct, setIsAddProduct] = useState(false);
  const [queryParams, setQueryParams] = useState([
    {
      dateIni: "",
      dateEnd: "",
      productName: "",
    },
  ]);
  const [listOrder, setListOrder] = useState("sells");
  const [isDailyPlotChecked, setIsDailyPlotChecked] = useState(false);

  const { dateIni, dateEnd, productName } = queryParams;

  const toggleVisualizationInPlot = (checked) => {
    setIsDailyPlotChecked(checked);
    togglePlotVisualization(checked);
  };

  const togglePlotConfig = () => {
    setPlotConfig(!plotConfig);
  };

  const toggleAddProductForm = () => {
    setIsAddProduct(!isAddProduct);
  };

  const onAddProduct = () => {
    setIsAddProduct(false);
  };

  const applyDateFilter = (e) => {
    e.preventDefault();
  };

  const searchProduct = (search) => {
    queryProducts(products, search);
  };

  const onChange = (e) => {
    setQueryParams({ ...queryParams, [e.target.name]: e.target.value });
    if (e.target.name === "productName") {
      // queryProducts(queryParams)
      searchProduct(e.target.value);
    }
  };

  const productList = productsInView
    // sorting in order of insertion (most recent first)
    .sort(function (a, b) {
      let dateA;
      let dateB;
      switch (listOrder) {
        case "createdAt":
          dateA = a.createdAt;
          dateB = b.createdAt;
          break;
        case "meanSells":
          dateA = a.mean_sells;
          dateB = b.mean_sells;
          break;
        case "sells":
          dateA = a.curr_total_sells;
          dateB = b.curr_total_sells;
          break;
        case "visits":
          dateA = a.curr_total_visits;
          dateB = b.curr_total_visits;
          break;
        case "conversionRate":
          dateA = a.conversion_rate;
          dateB = b.conversion_rate;
          break;
      }

      if (dateA > dateB) {
        return -1;
      } else if (dateA < dateB) {
        return 1;
      }
      return 0;
    })
    // creating product cards
    .map((product) => <Product key={product.id} product={product} />);

  const plotConfigWindow = (
    <Fragment>
      <div className='plotConfig-container noselect'>
        <h2>Ajustes do gráfico</h2>
        <div className='expand-width'>
          <p>Modo de visualização</p>
          <div className='plotConfig-bx'>
            <span>Acumulado</span>
            <Switch
              onChange={toggleVisualizationInPlot}
              checked={isDailyPlotChecked}
              onColor='#ddd'
              offColor='#ddd'
              onHandleColor='#2693e6'
              offHandleColor='#2693e6'
              handleDiameter={30}
              uncheckedIcon={false}
              checkedIcon={false}
              boxShadow='0px 1px 5px rgba(0, 0, 0, 0.6)'
              activeBoxShadow='0px 0px 1px 10px rgba(0, 0, 0, 0.2)'
              height={15}
              handleDiameter={22}
              width={48}
              className='react-switch'
              id='material-switch'
            />
            <span>Hora em hora</span>
          </div>
        </div>
      </div>
    </Fragment>
  );

  return (
    <Fragment>
      <section className='container-products'>
        <div className='products-header'>
          <form id='search-product' onSubmit={(e) => searchProduct(e)}></form>
          <div className='form-products'>
            {/* <i className='fas fa-filter icon icon-btn icon-15x'></i> */}

            <i
              className='fas fa-chart-pie icon icon-btn icon-15x pop-window-btn'
              onClick={() => togglePlotConfig()}
            ></i>
            <div class='dropdown'>
              <button class='dropbtn'>
                <BsArrowUpShort />
                {/* <BiTime className='icon-15x' /> */}
                {/* <i className='fas fa-clock'></i> */}
                {/* <BiTime className='icon-15x' /> */}
                {/* <i className='fas fa-shopping-cart'></i> */}
                {/* <i className='fas fa-eye'></i> */}
                {/* <i className='fas fa-sync-alt'></i> */}
                {listOrder == "createdAt" ? (
                  <i className='fas fa-clock'></i>
                ) : listOrder == "meanSells" ? (
                  <i className='fas fa-exchange-alt'></i>
                ) : listOrder == "sells" ? (
                  <i className='fas fa-shopping-cart'></i>
                ) : listOrder == "visits" ? (
                  <i className='fas fa-eye'></i>
                ) : (
                  <i className='fas fa-sync-alt'></i>
                )}
              </button>
              <div class='dropdown-content'>
                <div
                  className=' icon-dropdown icon-btn'
                  onClick={() => setListOrder("createdAt")}
                >
                  <i className='fas fa-clock'></i>
                  <span>Data de inserção</span>
                </div>
                <div
                  className='icon-dropdown icon-btn'
                  onClick={() => setListOrder("sells")}
                >
                  <i className='fas fa-shopping-cart'></i>
                  <span>Vendas</span>
                </div>
                <div
                  className='icon-dropdown icon-btn'
                  onClick={() => setListOrder("visits")}
                >
                  <i className='fas fa-eye'></i>
                  <span>Visitas</span>
                </div>
                <div
                  className='icon-dropdown icon-btn'
                  onClick={() => setListOrder("meanSells")}
                >
                  <i className='fas fa-exchange-alt'></i>
                  <span>Média de vendas/hora</span>
                </div>
                <div
                  className='icon-dropdown icon-btn'
                  onClick={() => setListOrder("conversionRate")}
                >
                  <i className='fas fa-sync-alt'></i>
                  <span>Taxa de conversão</span>
                </div>
              </div>
            </div>
            <div className='dummy'>{plotConfig && plotConfigWindow}</div>
            {/* <i className='fas fa-layer-group icon icon-btn icon-15x'></i> */}
            <input
              type='text'
              placeholder='Pesquise produtos ou categorias...'
              form='search-product'
              name='productName'
              value={productName}
              onChange={(e) => onChange(e)}
            />

            <i
              className='fas fa-plus-square icon-btn icon-2x add-product-btn'
              onClick={() => toggleAddProductForm()}
            ></i>
            <div className='dummy'>
              {isAddProduct && <AddProductForm onAddProduct={onAddProduct} />}
            </div>
          </div>
        </div>
        {/* <div
          style={{
            width: "100%",
            height: "20px",
            borderBottom: "1px solid white",
            marginBottom: "6px",
          }}
        ></div> */}
        <div className='products-body' style={{ overflowY: "auto" }}>
          {/* <ul>{productList}</ul> */}
          {loading && (
            <Fragment>
              <CommonLoading />
            </Fragment>
          )}
          <Alert />
          {productList}
        </div>
      </section>
    </Fragment>
  );
}

ProductList.propTypes = {
  queryProducts: PropTypes.func.isRequired,
};

export default connect(null, { queryProducts, togglePlotVisualization })(
  ProductList
);
