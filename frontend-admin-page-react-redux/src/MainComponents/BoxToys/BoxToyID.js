import './BoxToyID.css';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBoxToyDataID } from '../BoxToys/reducerBoxToyID';

export default function BoxToyID(){
    
    const {id} = useParams();
    const dispatch = useDispatch();
    const boxToyDataID = useSelector((state) => state.boxToyID.data);
  
    useEffect(() => {
      dispatch(fetchBoxToyDataID(id));
    }, [dispatch, id]);
    console.log(boxToyDataID);

    return(
        <div key={boxToyDataID.id} className='boxToyID'>
            <div className='boxToyIDColumns'>
                <div className='boxToyIDColumn1'>
                    <img src={boxToyDataID.image}/>
                </div>
                <div className='boxToyIDColumn2'>   
                    <h4>{boxToyDataID.name}</h4>
                    <h3>Description</h3>
                    <hr/>
                    <p>{boxToyDataID.description}</p>
                    <p className = "price">$ {boxToyDataID.price} USD</p>
                </div>
            </div>   
        </div>
    )
    
}