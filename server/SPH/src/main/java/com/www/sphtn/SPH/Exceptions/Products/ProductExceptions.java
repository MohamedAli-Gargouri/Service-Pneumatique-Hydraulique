package com.www.sphtn.SPH.Exceptions.Products;

public class ProductExceptions {
    public static class ProductCodeExist extends RuntimeException {
        public ProductCodeExist() {
            super();
        }
    }

    public static class WrongProductID extends RuntimeException {
        public WrongProductID() {
            super();
        }
    }
    public static class LimitedProductQuantity extends RuntimeException {
        public LimitedProductQuantity() {
            super();
        }
    }
    public static class WrongProductCategory_CategoryValues extends RuntimeException {
        public WrongProductCategory_CategoryValues() {
            super();
        }
    }
}
