import PropTypes from "prop-types";
import { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { loadProducts } from "../../actions/product";
// Components
import ProductList from "./ProductList";
import Plot from "./Plot";

const Dashboard = ({ auth, product, loadProducts }) => {
  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <Fragment>
      <section className='workarea'>
        <ProductList
          products={product.products}
          productsInView={product.productsInView}
        />
        <Plot />
      </section>
    </Fragment>
  );
};

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  product: PropTypes.object.isRequired,
  loadProducts: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  product: state.product,
});

export default connect(mapStateToProps, { loadProducts })(Dashboard);
