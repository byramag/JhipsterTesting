package edu.vcu.tams.security;

/**
 * Constants for Spring Security authorities.
 */
public final class AuthoritiesConstants {

    public static final String ADMIN = "ROLE_ADMIN";

    public static final String USER = "ROLE_USER";

    public static final String ANONYMOUS = "ROLE_ANONYMOUS";

    public static final String FACULTY = "ROLE_FACULTY";

    public static final String TA = "ROLE_TA";

    private AuthoritiesConstants() {
    }
}
