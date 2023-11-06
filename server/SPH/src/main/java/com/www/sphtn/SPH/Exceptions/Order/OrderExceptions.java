package com.www.sphtn.SPH.Exceptions.Order;

public class OrderExceptions extends RuntimeException {
    public OrderExceptions() {
        super();
    }


    public static class OrderNotFound extends RuntimeException {
        public OrderNotFound() {
            super();
        }
    }
    public static class InvalidOrderQuantity extends RuntimeException {
        public InvalidOrderQuantity() {
            super();
        }
    }
    public static class AlreadyPaused extends RuntimeException {
        public AlreadyPaused() {
            super();
        }
    }
    public static class AlreadyResumed extends RuntimeException {
        public AlreadyResumed() {
            super();
        }
    }
    public static class AlreadyCancelled extends RuntimeException {
        public AlreadyCancelled() {
            super();
        }
    }
    public static class AlreadyPaid extends RuntimeException {
        public AlreadyPaid() {
            super();
        }
    }
    public static class AlreadyReady extends RuntimeException {
        public AlreadyReady() {
            super();
        }
    }
    public static class AlreadyDelivered extends RuntimeException {
        public AlreadyDelivered() {
            super();
        }
    }
}
