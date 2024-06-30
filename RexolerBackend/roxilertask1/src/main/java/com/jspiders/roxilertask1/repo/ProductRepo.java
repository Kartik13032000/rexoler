package com.jspiders.roxilertask1.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.jspiders.roxilertask1.entity.Product;

public interface ProductRepo extends JpaRepository<Product, Integer> {
	
List<Product> findProductsByPrice(double price);
	
	@Query(value = "SELECT product FROM Product product WHERE product.title LIKE %:search% OR product.description LIKE %:search%")
	List<Product> findProductsByTitleOrDescription(String search);

	

}
