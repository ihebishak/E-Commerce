import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../common/product';
import { map } from 'rxjs/operators';
import { Category } from '../common/category';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl = 'http://localhost:8080/api/products';
  private categoryUrl = 'http://localhost:8080/api/category';

  constructor(private httpClient: HttpClient) {}

  getProduct(theProductId: number): Observable<Product> {
    const productUrl = this.baseUrl + '/' + theProductId;
    return this.httpClient.get<Product>(productUrl);
  }

  getProductListPaginate(
    thePage: number,
    thePageSize: number,
    categoryId: number
  ): Observable<GetResponseProducts> {
    const searchUrl =
      `${this.baseUrl}/search/findByCategoryId?id=${categoryId}` +
      `&page=${thePage}&size=${thePageSize}`;
    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }

  getProductList(categoryId: number): Observable<Product[]> {
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${categoryId}`;
    return this.httpClient
      .get<GetResponseProducts>(searchUrl)
      .pipe(map((response) => response._embedded.products));
  }

  getCategories(): Observable<Category[]> {
    return this.httpClient
      .get<GetResponseCategory>(this.categoryUrl)
      .pipe(map((response) => response._embedded.category));
  }

  searchProductsPaginate(
    thePage: number,
    thePageSize: number,
    theKeyWord: string
  ): Observable<GetResponseProducts> {
    const searchUrl =
      `${this.baseUrl}/search/findByNameContaining?name=${theKeyWord}` +
      `&page=${thePage}&size=${thePageSize}`;
    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }

  searchProducts(theKeyWord: string): Observable<Product[]> {
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyWord}`;
    return this.httpClient
      .get<GetResponseProducts>(searchUrl)
      .pipe(map((response) => response._embedded.products));
  }
}

interface GetResponseProducts {
  _embedded: {
    products: Product[];
  };
  page: {
    size: number;
    totalElements: number;
    totalPages: number;
    number: number;
  };
}

interface GetResponseCategory {
  _embedded: {
    category: Category[];
  };
}
