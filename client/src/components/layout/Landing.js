import { Link } from "react-router-dom";

function Landing() {
  return (
    <section className='landing'>
      <div className='dark-overlay'>
        <div className='landing-inner'>
          <h1 className='x-large'>Deep in Sales</h1>
          <p className='lead'>Monitore anúncios do Mercado Livre.</p>
          <div class='buttons-container'>
            <Link to='/registrar' className='btn btn-primary'>
              Registrar
            </Link>
            <Link to='/login' className='btn btn-light'>
              Login
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
export default Landing;
