import React ,{useState,useEffect} from "react";
import Layout from "./layout";
import  Card from './Card';
import {getCategories,getFilteredProducts} from './apiCore';
import Checkbox from './Checkbox';
import RadioBox from './Radiobox';
import {prices} from './fixedPrices';


const Shop = ()=>{
    const [myFilters ,setMyFilters] = useState({
        filters:{category:[],price:[]}
    }) 
    const [categories,setCategories]=useState([]);
    const [error ,setError]=useState(false);
    const [limit ,setLimit]=useState(6);
    const [skip ,setSkip]=useState(0);
    const [size ,setSize]=useState(0);
    const [filteredResults ,setFilteredResults]=useState([]);
    
    const init1 = ()=>{
        
    getCategories().then(data=>{
        console.log('in init1 data',data.error)
        if(data.error){
            setError(data.error)
           
        } else {
            setCategories(data)
             console.log('in fun init1',data)
        }
    })
}
const loadFilteredResults =(newFilters)=>{
        console.log('newFilters',newFilters)
        getFilteredProducts(skip,limit,newFilters).then(data=>{
            if(data.error){
                setError(data.error)
            }else{
                setFilteredResults(data.data)
                setSize(data.size);
                setSkip(0)
            }
        })
    };

const loadMore =()=>{
    let toSkip = skip + limit
        // console.log('newFilters',newFilters)
        getFilteredProducts(toSkip,limit,myFilters.filters).then(data=>{
            if(data.error){
                setError(data.error)
            }else{
                setFilteredResults([...filteredResults, ...data.data])
                setSize(data.size);
                setSkip(toSkip)
            }
        })
    };  
    
const loadMoreButton = ()=>{
    return (
        size > 0 && size >= limit && (
            <button onClick={loadMore} className='btn btn-warning mb-5'>Load more</button>
        )
    )
}

    useEffect(()=>{
        init1()
        loadFilteredResults(skip,limit,myFilters.filters)
    }, [])

    const handelFilters = (filters,filterBy)=>{
        console.log('SHOP',filters,filterBy)
        const newFilters ={...myFilters}
        console.log('filter in handelFilter',myFilters)
        newFilters.filters[filterBy]=filters

        if(filterBy==='price'){
            let priceValues = handelPrice(filters);
            newFilters.filters[filterBy]=priceValues;
        }
        loadFilteredResults(myFilters.filters)
console.log('newfilter',newFilters)
        setMyFilters(newFilters)
    } ;

    const handelPrice =value=>{
        const data = prices
        let array =[];

        for(let key in data){
            if(data[key]._id === parseInt(value)){
                array =data[key].array;
            }
        }
        return array;
    };

    

    return(
      <Layout title='Shop Page' description='Serch and find books of your choice' className='container-fluid'>        
         <div className='row'>
             <div className='col-4'>
                 {console.log('in comp',categories)}
                 
                 <h4>Filter by categories</h4>
                 <ul>
                     <Checkbox  categories={categories} 
                                handelFilters=
                                {filters=> handelFilters(filters,'category')} />
                 </ul>
                 <h4>Filter by Price Range</h4>
                 <div>
                     <RadioBox  
                                prices={prices} 
                                handelFilters={filters=> 
                                handelFilters(filters,'price')} />
                 </div>
             </div>
             <div className='col-8'>
                 {JSON.stringify(filteredResults),
                  console.log('in load com:',filteredResults)
                 }
                 <h2 className='mb-4'>Products</h2>
                 <div className='row'>
                    {filteredResults.map((product,i)=>(
                    <div key={i} className='col-4 mb-3'>
                        <Card product={product}/>
                    </div>
                    ))}
                 </div>
                 <hr />
                 {loadMoreButton()}
             </div>
         </div>
      </Layout>
    )
}
export default Shop;