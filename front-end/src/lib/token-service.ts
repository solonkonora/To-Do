/**
 * @author RashJrEdmund https://github.com/rashjredmund
 * @class Manages session tokens in localStorage.
 */
class TokenService {
  /**
   * @readonly RTDST // 🥷🏾 Rebase Devs Todo Session Token
   */
  private token_key;

  /**
   * @constructor 👷🏾‍♂️ 🛠️ 🚧
   * An instance of the TokenService class. Manages session tokens in localStorage.
   *
   * Uses "RTDST" as token"s key in localStorage.
   *
   * RTDST for Rebase "Devs Todo Session Token"
   */
  constructor() {
    this.token_key = "RDTST"; // RTDST for Rebase Devs Todo Session Token
  }

  /**
   * 🥷🏾
   */
  public getToken() {
    if (typeof window === "undefined") return "";

    return localStorage.getItem(this.token_key) || "";
  }

  public saveToken(token: string) {
    return localStorage.setItem(this.token_key, token);
  }

  public removeToken() {
    return localStorage.removeItem(this.token_key);
  }
}

const tokenService = new TokenService();

export { tokenService };
