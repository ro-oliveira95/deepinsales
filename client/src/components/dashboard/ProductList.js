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
      let dateA = a.createdAt;
      let dateB = b.createdAt;
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
      <div className='plotConfig-container'>
        <h2>Ajustes do gráfico</h2>
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
          <span>Diário</span>
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
