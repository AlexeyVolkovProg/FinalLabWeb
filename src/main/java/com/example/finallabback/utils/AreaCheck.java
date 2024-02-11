package com.example.finallabback.utils;

import com.example.finallabback.dto.Coordinates;

public class AreaCheck {

    public static boolean isHit(Coordinates coordinates){
        return coordinates != null && isHitInArea(coordinates.getX(), coordinates.getY(), coordinates.getR());
    }

    public static boolean isHitInArea(double x, double y, double r){
        return isTriangleHit(x, y, r) || isRectangleHit(x, y, r) || isCircleHit(x, y, r);
    }

    //todo дописать проверку
    private static boolean isTriangleHit(double x, double y, double r){
        return true;
    }

    //todo дописать проверку
    private static boolean isRectangleHit(double x, double y, double r){
        return true;
    }

    //todo дописать проверку
    private static boolean isCircleHit(double x, double y, double r){
        return true;
    }

}
