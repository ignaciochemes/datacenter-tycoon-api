export default class EmailConstants {
    public static REGEX_VALID_EMAIL =
        /(?=.*[a-zA-Z])(?=^.{1,64}$)^[a-zA-Z\d](?:(\.|[-_]+)?[a-zA-Z\d])*(?:(\+)[a-zA-Z\d]+)?(?:(\.)[a-zA-Z\d]+)*[\da-zA-Z-_]*@(?:[a-zA-Z\d](?:[a-zA-Z\d]+)?\.)+[a-zA-Z\d](?:[a-zA-Z\d]+){1,}?$/;
}