package com.jspiders.roxilertask1.contoller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.jspiders.roxilertask1.entity.Product;
import com.jspiders.roxilertask1.repo.ProductRepo;

@RestController
public class ProductController {
	@Autowired
	private ProductRepo productrepo;
	@GetMapping(path = "/products-a")
	public List<Product> addProducts(){
		RestTemplate restTemplate=new RestTemplate();
		Product[] arr=restTemplate.getForObject("https://s3.amazonaws.com/roxiler.com/product_transaction.json", Product[].class);
		List<Product> products=new ArrayList<>();
		for (int i = 0; i < arr.length; i++) {
			products.add(arr[i]);
		}
		return productrepo.saveAll(products);
	}
	
	
	@GetMapping(path = "/products/{search}")
	public List<Product> findProducts(@PathVariable String search){
		try {
			double price=Double.parseDouble(search);
			return productrepo.findProductsByPrice(price);
		} catch (Exception e) {
			return productrepo.findProductsByTitleOrDescription(search);
	}
	}
	@GetMapping(path = "/statistics")
	public double[] fetchStatistics(@RequestParam(name="month") String month) {
		double totalSaleAmount=0;
		int soldItems=0;
		int unsoldItems=0;
		List<Product> products =productrepo.findAll();
		for (Product product : products) {
			if (product.getDateOfSale().contains("-"+ month + "-")) {
				if (product.isSold()) {
					soldItems++;
					totalSaleAmount +=product.getPrice();
					
				}
				else {
					unsoldItems++;
				}
				
			}
			
		}
		double[] arr= {totalSaleAmount, soldItems, unsoldItems};
		return arr;
	}
	@GetMapping(path = "/bar-chart")
	public Map<String, Integer> fetchBarChart(@RequestParam(name= "month") String month){
		int[] arr=new int[10];
		List<Product> products=productrepo.findAll();
		for (Product product : products) {
			if (product.getDateOfSale().contains("-" + month + "-")) {
				double price =product.getPrice();
				if (price>=0 && price <=100) {
					++arr[0];
				}else if (price>=101 && price <=200) {
					++arr[1];
					
				}else if (price>=201 && price <=300) {
					++arr[2];
					
				}else if (price>=301 && price <=400) {
					++arr[3];
					
				}else if (price>=401 && price <=500) {
					++arr[4];
					
				}else if (price>=501 && price <=600) {
					++arr[5];
					
				}else if (price>=601 && price <=700) {
					++arr[6];
					
				}else if (price>=701 && price <=800) {
					++arr[7];
					
				}else if (price>=801 && price <=900) {
					++arr[8];
					
				}
				else if (price>=901) {
					++arr[9];
					
				}
				
			}
			
		}
		Map<String, Integer> map=new HashMap<>();
		map.put("0 - 100", arr[0]);
		map.put("102 - 200", arr[1]);
		map.put("201 - 300", arr[2]);
		map.put("301 - 400", arr[3]);
		map.put("401 - 500", arr[4]);
		map.put("501 - 600", arr[5]);
		map.put("601 - 700", arr[6]);
		map.put("701 - 800", arr[7]);
		map.put("801 - 900", arr[8]);
		map.put("901 and above", arr[9]);
		
		return map;
		
	}
	@GetMapping(path = "/pie-chart")
	public Map<String, Integer> fetchPieChart(@RequestParam(name= "month") String month){
		int[] arr=new int[10];
		List<Product> products=productrepo.findAll();
		Map<String, Integer> map=new HashMap<>();
		for (Product product : products) {
			String category = product.getCategory();
			if(map.get(category) != null) {
				map.put(category,map.get(category)+1);
			}
			else {
				map.put(category,1);
			}
		}
		return map;
	}
	@GetMapping(path = "/combined-data")
    public Map<String, Object> fetchCombinedData(@RequestParam(name = "month") String month) {
        Map<String, Object> combinedData = new HashMap<>();

        double[] statistics = fetchStatistics(month);
        Map<String, Integer> barChart = fetchBarChart(month);
        Map<String, Integer> pieChart = fetchPieChart(month);

        combinedData.put("statistics", statistics);
        combinedData.put("barChart", barChart);
        combinedData.put("pieChart", pieChart);

        return combinedData;
    }
}
		
