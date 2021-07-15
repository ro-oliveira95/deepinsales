import PropTypes from "prop-types";
import { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { loadProducts } from "../../actions/product";
import { loadRecords } from "../../actions/record";
// Components
import ProductList from "./ProductList";
import Plot from "./Plot";

const Dashboard = ({ product, records, loadProducts, loadRecords }) => {
  useEffect(() => {
    loadProducts();
    loadRecords();
  }, [loadProducts, loadRecords]);

  return (
    <Fragment>
      <div className='workarea'>
        <ProductList
          products={product.products}
          productsInView={product.productsInView}
          loading={product.loading}
        />
        {/* {!records.loading && <Plot records={records.records} redraw={true} />} */}
        {/* <Plot records={records.records} redraw={true} /> */}
        <Plot redraw={true} />
      </div>
    </Fragment>
  );
};

Dashboard.propTypes = {
  product: PropTypes.object.isRequired,
  records: PropTypes.object.isRequired,
  loadProducts: PropTypes.func.isRequired,
  loadRecords: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  product: state.product,
  records: state.records,
});

export default connect(mapStateToProps, {
  loadProducts,
  loadRecords,
})(Dashboard);
