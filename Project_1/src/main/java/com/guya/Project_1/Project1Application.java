package com.guya.Project_1;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;

@SpringBootApplication
@EntityScan("com.guya.models") // Tells spring to look in the model package for DB entities
public class Project1Application {

	public static void main(String[] args) {

		SpringApplication.run(Project1Application.class, args);
	}

}
