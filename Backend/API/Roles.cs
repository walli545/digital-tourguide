namespace API
{
    /// <summary>
    /// Roles defined for the application.
    /// </summary>
    public static class Roles
    {
        public const string ClaimType = "role";

        /*
        I think we do not need those
        public const string Editor = "default-roles-tourguide"
        public const string Editor = "uma_authorization"
        public const string Editor = "offline_access"*/
        public const string User = "user";
        public const string Moderator = "moderator";
        public const string Creator = "content-creator";
        public const string Promoter = "promoter";
        public const string Admin = "admin";
    }
}
