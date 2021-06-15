import { useState } from "react";
import { connect } from "react-redux";
import { addProduct } from "../../actions/product";
import PropTypes from "prop-types";
import InputCategories from "./InputCategories";
import Alert from "../layout/Alert";

function AddProductForm({ addProduct }) {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [categories, setCategories] = useState([]);

  const onKeyPressed = (e) => {
    if (e.key !== "Tab") {
      return;
    }

    const categoryInput = document.getElementById("categoryInput");
    const focused = document.activeElement;

    if (categoryInput === focused) {
      e.preventDefault();
      return;
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();

    console.log(categories);

    addProduct({ name, url, categories });

    setName("");
    setUrl("");
    setCategories([]);
  };

  return (
    <div className='addProduct-container'>
      <h1>Adicione um produto</h1>
      <Alert />
      <form className='add-form' onSubmit={onSubmit} onKeyDown={onKeyPressed}>
        <div className='form-control text-light'>
          <label>Nome (opcional)</label>
          <input
            type='text'
            placeholder='Nome do produto'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className='form-control text-light'>
          <label>URL (obrigatório)</label>
          <input
            type='text'
            placeholder='URL do anúncio'
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
        </div>

        <div className='form-control text-light'>
          <label>Categoria(s)</label>
          <InputCategories tags={categories} setTags={setCategories} />
        </div>

        <input
          type='submit'
          value='Salvar anúncio'
          className='btn btn-success btn-block'
        />
      </form>
    </div>
  );
}

AddProductForm.propTypes = {
  addProduct: PropTypes.func.isRequired,
};

export default connect(null, { addProduct })(AddProductForm);
