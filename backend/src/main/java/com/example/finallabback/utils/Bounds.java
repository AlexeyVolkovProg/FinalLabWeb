package com.example.finallabback.utils;

public enum Bounds {
    X_BOUNDS(-2, 2, true),

    Y_BOUNDS(-3, 5, true),

    R_BOUNDS(1, 5, true);

    private final double left;

    private final double right;

    private final boolean inclusive;


    Bounds(double left, double right, boolean inclusive) {
        this.left = left;
        this.right = right;
        this.inclusive = inclusive;
    }

    public double getLeft() {
        return left;
    }

    public double getRight() {
        return right;
    }

    public boolean isInclusive() {
        return inclusive;
    }
}
