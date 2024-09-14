import React from 'react'
import Layout from '../../Components/LayOut/Layout.jsx'
import CarouselEffect from '../../Components/Carousel/CarouselEffect.jsx'
import Category from '../../Components/Category/Category'
import Product from '../../Components/Product/Product.jsx'
function Landing() {
  return (
<Layout>
   <CarouselEffect/>
   <Category/>
   <Product/>
</Layout>
  )
}

export default Landing
