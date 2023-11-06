package com.www.sphtn.SPH.Exceptions.Users;

public class UserExceptions {

    public static class UserNotFound extends RuntimeException {
        public UserNotFound() {
            super();
        }
    }
    public static class WrongConfirmPassword extends RuntimeException {
        public WrongConfirmPassword() {
            super();
        }
    }
    public static class UsernameExist extends RuntimeException {
        public UsernameExist() {
            super();
        }
    }
    public static class PhoneNumberExists extends RuntimeException {
        public PhoneNumberExists() {
            super();
        }
    }
    public static class EmailExists extends RuntimeException {
        public EmailExists() {
            super();
        }
    }
}
