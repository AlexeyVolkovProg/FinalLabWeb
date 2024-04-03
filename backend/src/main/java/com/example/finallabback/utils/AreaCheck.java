package com.example.finallabback.utils;

import com.example.finallabback.dto.Coordinates;

public class AreaCheck {

    public static boolean isHit(Coordinates coordinates){
        return coordinates != null && isHitInArea(coordinates.getX(), coordinates.getY(), coordinates.getR());
    }

    public static boolean isHitInArea(double x, double y, double r){
        return isTriangleHit(x,y,r) || isRectangleHit(x, y, r) || isCircleHit(x,y,r);
    }

    private static boolean isTriangleHit(double x, double y, double r){
        if (x<=0 && y <=0) {
            return -0.5*(x+r) <= y;
        }
        return false;
    }

    private static boolean isRectangleHit(double x, double y, double r){
        if (x<=0 && y >=0) {
            return (x >= (-r)) && (y <= r);
        }
        return false;
    }

    private static boolean isCircleHit(double x, double y, double r){
        if (x>=0 && y >=0) {
            return (x * x) + (y * y) <= (r / 2 * r / 2);
        }
        return false;
    }
}
