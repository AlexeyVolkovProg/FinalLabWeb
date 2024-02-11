package com.example.finallabback.controllers;


import com.example.finallabback.dto.Coordinates;
import com.example.finallabback.dto.HitResult;
import com.example.finallabback.security.jwt.AuthTokenFilter;
import com.example.finallabback.security.service.AuthUserDetails;
import com.example.finallabback.services.HitService;
import com.example.finallabback.utils.CoordinatesValidation;
import com.example.finallabback.utils.OutOfCoordinatesBoundsException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/api/hits")
public class HitController {
    private final HitService hitService;

    private final AuthTokenFilter authTokenFilter;


    @Autowired
    public HitController(HitService hitService, AuthTokenFilter authTokenFilter) {
        this.hitService = hitService;
        this.authTokenFilter = authTokenFilter;
    }

    @PostMapping()
    public ResponseEntity<?> addHit(@RequestBody Coordinates pointRequest, HttpServletRequest request) {
        try {
            CoordinatesValidation.validate(pointRequest);

            HitResult hitResult = hitService.save(pointRequest, getUserIdFromRequest(request));

            return new ResponseEntity<>(hitResult, HttpStatus.CREATED);
        } catch (OutOfCoordinatesBoundsException exception) {
            return ResponseEntity.badRequest().body(exception.getMessage());
        }
    }

    @GetMapping()
    public ResponseEntity<List<HitResult>> getHits(HttpServletRequest request){
        List<HitResult> hits = hitService.findAllByOwnerId(getUserIdFromRequest(request));
        return new ResponseEntity<>(hits, HttpStatus.OK);
    }

    @DeleteMapping()
    public void deleteAll(HttpServletRequest request) {
        hitService.deleteAll(getUserIdFromRequest(request));
    }


    private Long getUserIdFromRequest(HttpServletRequest request) {
        AuthUserDetails userDetails = (AuthUserDetails) authTokenFilter.getUserDetails(request);
        return userDetails.getId();
    }


}
