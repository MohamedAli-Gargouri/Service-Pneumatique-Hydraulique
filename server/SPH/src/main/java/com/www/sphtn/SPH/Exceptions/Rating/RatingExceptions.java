package com.www.sphtn.SPH.Exceptions.Rating;

public class RatingExceptions {
    public static class RatingNotFound extends RuntimeException {
        public RatingNotFound() {
            super();
        }
    }
    public static class InvalidRatingValue extends RuntimeException {
        public InvalidRatingValue() {
            super();
        }
    }
}
