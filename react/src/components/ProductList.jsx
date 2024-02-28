import { useEffect, useRef, useState } from "react";
import Loader from "./Loader";
import Product from "./Product";

const productsPerPage = 10;

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef(null);
  
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(
        `https://dummyjson.com/products?limit=${productsPerPage}&skip=${
          page * productsPerPage
        }`
      );
      const data = await response.json();

      if (data.products.length === 0) {
        setHasMore(false);
      } else {
        setProducts((prevProducts) => [...prevProducts, ...data.products]);
        setPage((prevPage) => prevPage + 1);
      }
    };

    const onIntersection = (items) => {
      const loaderItem = items[0];

      if (loaderItem.isIntersecting && hasMore) {
        fetchProducts();
      }
    };

    const observer = new IntersectionObserver(onIntersection);

    if (observer && loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    // cleanup
    return () => {
      if (observer) observer.disconnect();
    };
  }, [hasMore, page]);

  return (
    <div>
      <div>Product List</div>
      <div className="grid grid-cols-2 gap-10 w-11/12 mx-auto items-center">
        {products?.map((product) => (
          <Product
            title={product.title}
            price={product.price}
            thumbnail={product.thumbnail}
            key={product.id}
          />
        ))}
      </div>
      <div className="flex justify-center">
        {hasMore && (
          <div ref={loaderRef}>
            <Loader />
          </div>
        )}
      </div>
    </div>
  );
}
