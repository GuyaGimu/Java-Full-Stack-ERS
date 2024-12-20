package com.guya.Project_1;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EntityScan("com.guya.models") // Tells spring to look in the model package for DB entities
@ComponentScan("com.guya")// tells spring to look for beans in com.guya
@EnableJpaRepositories("com.guya.DAOs")
public class Project1Application {

	public static void main(String[] args) {

		SpringApplication.run(Project1Application.class, args);
	}

}
