import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  products: Product[] = [
  {
    id: 1,
    title: 'calculadora',
    price: 300,
    stock: 4,
  },
  {
    id: 2,
    title: 'lapicera',
    price: 50,
    stock: 7, 
  },
];

create(createProductDto: CreateProductDto) {
  const newProduct: Product = {
    id: this.products.length + 1, // generar un nuevo ID
    title: createProductDto.title,
    price: createProductDto.price,
    stock: createProductDto.stock,
  };
  this.products.push(newProduct);
  return newProduct;
}

  findAll(): Product[] {
    return this.products;
  }

  findOne(id: number) {
    const products = this.products.find((Product) => Product.id === id);
    if (products){
      return {message: 'Product found', products: products}
    }
    else {
      return {message: 'error', products: 'Product not found'}
    }
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    const productIndex = this.products.findIndex((product) => product.id === id);
  
    if (productIndex === -1) {
      return {message: 'error', products: `Product with ID ${id} not found`};
    }
  
    const updatedProduct = {
      ...this.products[productIndex],
      ...updateProductDto,
      id,
    };
  
    this.products[productIndex] = updatedProduct;
  
    return updatedProduct;
  }
  
  remove(id: number) {
    const productIndex = this.products.findIndex((product) => product.id === id);
  
    if (productIndex === -1) {
      return {message: 'error', products: `Product with ID ${id} not found`};
    }
  
    const [removedProduct] = this.products.splice(productIndex, 1);
  
    return removedProduct;
  }
}
