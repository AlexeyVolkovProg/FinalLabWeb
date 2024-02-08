package com.example.finallabback.dto;


import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class HitResult {
    private double x;
    private double y;
    private double r;
    private String creationTime;
    private boolean result;

    public HitResult(Coordinates coordinates, String creationTime, boolean result){
        this(coordinates.getX(), coordinates.getY(), coordinates.getR(), creationTime, result);
    }


}
