import { Fragment, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { queryProducts } from "../../actions/product";
import Product from "./Product";
import AddProductForm from "./AddProductForm";

function ProductList({ queryProducts, products, productsInView }) {
  const [datepicker, setDatepicker] = useState(false);
  const [isAddProduct, setIsAddProduct] = useState(false);
  const [queryParams, setQueryParams] = useState([
    {
      dateIni: "",
      dateEnd: "",
      productName: "",
    },
  ]);

  const { dateIni, dateEnd, productName } = queryParams;

  const toggleDatepicker = () => {
    setDatepicker(!datepicker);
  };

  const toggleAddProductForm = () => {
    setIsAddProduct(!isAddProduct);
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

  const productList = productsInView.map((product) => (
    <Product key={product._id} product={product} />
  ));
  const datepickerWindow = (
    <Fragment>
      <form id='filter-date' onSubmit={(e) => applyDateFilter(e)}></form>
      <div
        className='datepicker-container'
        onSubmit={(e) => applyDateFilter(e)}
      >
        <p>Início</p>
        <input
          type='date'
          form='filter-date'
          name='dateIni'
          value={dateIni}
          onChange={(e) => onChange(e)}
        />
        <p>Fim</p>
        <input
          type='date'
          form='filter-date'
          name='dateEnd'
          value={dateEnd}
          onChange={(e) => onChange(e)}
        />
        <input
          type='submit'
          className='btn btn-success'
          value='Aplicar'
          form='filter-date'
        />
      </div>
    </Fragment>
  );

  return (
    <Fragment>
      <section className='container-products'>
        <div className='products-header'>
          <form id='search-product' onSubmit={(e) => searchProduct(e)}></form>
          <div className='form-products'>
            <i className='fas fa-filter icon icon-btn icon-15x'></i>
            <i
              className='fas fa-calendar-alt icon icon-btn icon-15x datepicker-btn'
              onClick={() => toggleDatepicker()}
            ></i>
            <div className='dummy'>{datepicker && datepickerWindow}</div>
            <i className='fas fa-layer-group icon icon-btn icon-15x'></i>
            <input
              type='text'
              placeholder='Pesquise produtos...'
              form='search-product'
              name='productName'
              value={productName}
              onChange={(e) => onChange(e)}
            />
            <i
              className='fas fa-plus-square btn-add-product icon-btn icon-2x addProduct-btn'
              onClick={() => toggleAddProductForm()}
            ></i>
            <div className='dummy'>{isAddProduct && <AddProductForm />}</div>
          </div>
        </div>
        <div className='products-body'>
          <ul>{productList}</ul>
        </div>
      </section>
    </Fragment>
  );
}

ProductList.propTypes = {
  queryProducts: PropTypes.func.isRequired,
};

export default connect(null, { queryProducts })(ProductList);
