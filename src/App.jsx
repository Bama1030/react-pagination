
import React, { useEffect, useState } from 'react'
import './App.css'
import Header from './Header'

const App = () => {
  const [products, setproducts] = useState([])
  const [page, setpage] = useState(1)

  const fetchProducts = async () => {
    const res = await fetch("https://dummyjson.com/products?limit=100")
    const data = await res.json()

    if (data && data.products) {
    setproducts(data.products)
    }
  }

  useEffect(() => {
    fetchProducts();
  },[])

  const selectPageHandeler = (selectedpage) => {
    if (selectedpage >= 1 && selectedpage <= products.length/10 &&
      selectedpage !== page)
    setpage(selectedpage);
  }

  return (
    <div className='container'>
      <Header />
      <div>
      {products.length > 0 && <div className='products'>
        {products.slice(page*10-10, page*10).map((prod) => {
          return <span className='products__single' key={prod.id}>
            <img src={prod.thumbnail} alt={prod.title} />
            <span>{prod.title}</span>
          </span>
        })}
      </div>
      }

      {/* pagination functionality */}
      {
        products.length > 0 && <div className='pagination'>
          <span onClick={() => selectPageHandeler(page - 1)}>◀️</span>
          {
            [...Array(products.length / 10)].map((_,i) => {
              return <span className={page===i+1?"pagination__selected":""}
                onClick={() => selectPageHandeler(i + 1)} key={i}>
                {i + 1}
              </span>
            })
          }
          <span onClick={() => selectPageHandeler(page + 1)}>▶️</span>

        </div>
        }
        </div>
    </div>
  )
}

export default App

