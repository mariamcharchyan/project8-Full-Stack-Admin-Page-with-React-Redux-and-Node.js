import './BoxToys.css';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBoxToysData } from '../BoxToys/reducerBoxToys';

export default function BoxToys(){

    const dispatch = useDispatch();
    const boxToysData = useSelector((state) => state.boxToys.data);
  
    useEffect(() => {
      dispatch(fetchBoxToysData());
    }, [dispatch]);
  
    return(
        <div className='boxToys'>
        {boxToysData.map((toyData) => (
            <div className='boxToy' key={toyData.id} >
                <Link to = {`/product/${toyData.id}`}>
                    <img src={toyData.image}/>
                </Link>
                <h4>{toyData.name}</h4>
                <p>$ {toyData.price} USD</p>
                <div className="boxToyAdd">
                    <button>Add to Cart</button>
                </div>
            </div>
        ))}
        </div>
    )
}