package com.example.finallabback.controllers;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
public class SampleController {
    @GetMapping("/")
    public String index() {
        return "index.html";
    }

    @GetMapping("/error")
    public String errorPage() {
        return "<h1>404 Page not found</h1>";
    }
}

