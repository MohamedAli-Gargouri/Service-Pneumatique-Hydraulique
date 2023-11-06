package com.www.sphtn.SPH.Exceptions.Category;

public class CategoryExceptions extends RuntimeException {
    public CategoryExceptions() {
        super();
    }


    public static class CategoryNotFound extends RuntimeException {
        public CategoryNotFound() {
            super();
        }
    }
    public static class CategoryNameExist extends RuntimeException {
        public CategoryNameExist() {
            super();
        }
    }

    public static class SubCategoryNotFound extends RuntimeException {
        public SubCategoryNotFound() {
            super();
        }
    }
    public static class SubCategoryNameExist extends RuntimeException {
        public SubCategoryNameExist() {
            super();
        }
    }

    public static class SubCategoryValueNotFound extends RuntimeException {
        public SubCategoryValueNotFound() {
            super();
        }
    }
    public static class SubCategoryValue_ValueExists extends RuntimeException {
        public SubCategoryValue_ValueExists() {
            super();
        }
    }
}
