export default class Result {
    public successful = false;
    public errors: string[] = [];

    public static SuccessResult(): Result {
        const res = new Result();
        res.successful = true;
        return res;
    }
}
