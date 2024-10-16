class OTPSingleton {
  private static instance: OTPSingleton;

  private otpMap: Map<string, string>;

  private constructor() {
    // Initialization logic here
    this.otpMap = new Map<string, string>();
  }

  public static getInstance(): OTPSingleton {
    if (!OTPSingleton.instance) {
      OTPSingleton.instance = new OTPSingleton();
    }
    //print map
    return OTPSingleton.instance;
  }

  public addOTP(otp: string, email: string): void {
    this.otpMap.set(otp, email);
  }

  public getStudent(): Map<string, string> {
    return this.otpMap;
  }

  public getEmail(otp: string): string | undefined {
    console.log(" get Email", this.otpMap.get(otp));
    return this.otpMap.get(otp);
  }

  public removeOTP(otp: string): void {
    this.otpMap.delete(otp);
  }
}

export { OTPSingleton as OTPSingleton };
