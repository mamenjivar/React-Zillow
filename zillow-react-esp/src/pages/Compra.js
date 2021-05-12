// components
import Map from '../components/Map';

const Compra = (props) => {
    return (
        <section>
            <h1>hello from Compra</h1>
            <Map propertyListings={props.listProperties}/>
        </section>
    );
};

export default Compra;