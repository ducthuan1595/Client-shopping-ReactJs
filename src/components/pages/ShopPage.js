//////////////////////////////
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import ProductList from './components/ProductList';
import Category from './components/Category';
import styled from './ShopPage.module.css';

export default function ShopPage() {
  const products = useSelector((state) => state.products.products);
  let filterProducts;
  // use dynamic url filter products follow category
  const params = useParams();
  if(params.item === 'all' || params.item === undefined) {
    filterProducts = products.products;
  }else {
    filterProducts = products?.products?.filter(item=> item.category === params.item)
  }
  
  return (
    <div className={styled.shop}>
    <section className={styled['shop-name']}>
        <h2>SHOW NAME</h2>
        <h4>shop</h4>
      </section>
      <div className={styled.content}>
      <Category />
      <ProductList products={filterProducts} />
      </div>
    </div>
  )
}