import { API_BASE_URL } from "@/services/constants";
import { createDefaultHeaders } from "./headers";
import { tokenService } from "../token-service";

interface ApiReturnType<T> {
  message: string;
  data: T;
  status: number;
}

interface Headers {
  [key: string]: string;
}

type HttpMethods = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

/**
 * @class Creates an httpClient 🥷🏽
 * @since Jne 25 2024 | 23:04 hr
 *
 * @author RashJrEdmund https://github.com/RashJrEdmud
 *
 */
export default class HTTPCLIENT {
  private _headers;
  private _base_url;
  private _base_path; // e.g /auth
  private tokenService = tokenService;

  /**
   * @constructor creates an instance of HTTPCLIENT 👷🏾‍♂️ 🛠️ 🚧
   * @param {string} base_url optional url to act as origin for all requests of an HTTPCLIENT instance
   * @param {string} base_headers optionally set"s default headers
   */
  constructor(base_path: string = "", base_headers: HeadersInit = {}) {
    if (!["undefined", "string"].includes(typeof base_path))
      throw new Error("Invalid Base Path Specified"); // meaning something of type type "object" or "function" or something else was passed

    if (base_path.trim()) {
      if (!base_path.startsWith("/") || base_path.endsWith("/"))
        throw new Error(
          'Base Path Must Start With A Slash "/" And End With No Slash "/" '
        );

      this._base_path = base_path;
    } else this._base_path = "";

    this._base_url = API_BASE_URL?.endsWith("/")
      ? API_BASE_URL.slice(0, -1)
      : API_BASE_URL; // ensuring it doesn't end with a slash

    this._headers = { ...createDefaultHeaders(), ...base_headers };
  }

  private mergeUrl(_url: string | undefined | null) {
    if (!this._base_url && !_url?.trim()) {
      // if no base url was specified and no url is specified too, throws error
      throw new Error("REQUEST URL NOT SPECIFIED");
    }

    if (_url?.trim() && this._base_path && !_url?.startsWith("/")) {
      throw new Error(`"${_url}" Must begin with a slash "/"`);
    }

    return this._base_url + this._base_path + _url?.trim(); // if no base url is provided, then only the url passed by the user will be used.
  }

  private async requestWithoutBody<T>(
    _url: string,
    method: HttpMethods = "GET",
    _headers: Headers = {}
  ): Promise<ApiReturnType<T>> {
    const url = this.mergeUrl(_url);

    try {
      const res = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${this.tokenService.getToken()}`,
          ...this._headers,
          ..._headers,
        },
      });

      if (!res.ok) {
        throw new Error(res.statusText);
      }

      return {
        status: res.status,
        ...(await res.json()),
      };
    } catch (error) {
      // console.warn({ error })
      throw new Error(
        (error as { message?: string })?.message || "Something went wrong"
      );
    }
  }

  private async requestWithBody<T>(
    _url: string,
    _body: object,
    method: HttpMethods = "POST",
    _headers: Headers = {}
  ): Promise<ApiReturnType<T>> {
    const url = this.mergeUrl(_url);

    const res = await fetch(url, {
      method,
      headers: {
        Authorization: `Bearer ${this.tokenService.getToken()}`,
        ...this._headers,
        ..._headers,
      },
      body: JSON.stringify(_body),
    });

    if (!res.ok) {
      throw new Error(res.statusText);
    }

    return {
      status: res.status,
      ...(await res.json()),
    };
  }

  // GETTERS AND SETTERS

  /**
   * getter method to access base url. It is accessed as though it is a property ✅
   *
   * @example console.log(new HTTPCLIENT().getBaseUrl) // logs _base_url {string} url
   */
  get getBaseUrl() {
    return this._base_url;
  }

  /**
   * getter method to access base path. It is accessed as though it is a property ✅
   *
   * @example console.log(new HTTPCLIENT().getBasePath() // logs _base_path {string} url
   */
  get getBasePath() {
    return this._base_path;
  }

  /**
   * setter method to reassign base url (origin). It is accessed as though it is a property ✅
   *
   * @example new HTTPCLIENT().setBaseUrl = "https://example.com" // updates the _base_url (origin)
   */
  set setBaseUrl(new_base_url: string) {
    const url = new URL(new_base_url);

    if (!url.protocol) throw new Error("Will Not Assign An Invalid URL");

    this._base_url = url.toString().slice(0, -1);
  }

  // EXPOSED HANDLERS 🪖 👷🏾‍♂️

  /**
   * 🪖 👷🏾‍♂️ handles all GET queries to specified url
   *
   * @param {string} url optional, but required if no base url was provided
   * @param {Headers} headers optional
   */
  public async GET<T>(
    url: string = "",
    headers?: Headers
  ): Promise<ApiReturnType<T>> {
    return this.requestWithoutBody<T>(url, "GET", headers);
  }

  /**
   * 🪖👷🏾‍♂️ handles all POST mutations to specified url
   *
   * @param {string} url optional, but required if no base url was specified at initialization
   * @param {BodyInit} body required. Use "{}" as placeholder to bypass any error telling you to specify a body for mutations that do not need a body object
   * @param {Headers} headers optional
   */
  public async POST<T>(
    url: string = "",
    body: object,
    headers?: Headers
  ): Promise<ApiReturnType<T>> {
    return this.requestWithBody(url, body, "POST", headers);
  }

  /**
   * 🪖 👷🏾‍♂️ handles all PUT mutations to specified url
   *
   * @param {string} url optional, but required if no base url was specified at initialization
   * @param {BodyInit} body required. Use "{}" as placeholder to bypass any error telling you to specify a body for mutations that do not need a body object
   * @param {Headers} headers optional
   */
  public async PUT<T>(
    url: string = "",
    body: object,
    headers?: Headers
  ): Promise<ApiReturnType<T>> {
    return this.requestWithBody(url, body, "PUT", headers);
  }

  /**
   * 🪖 👷🏾‍♂️ handles all PATCH mutations to specified url
   *
   * @param {string} url optional, but required if no base url was specified at initialization
   * @param {BodyInit} body required. Use "{}" as placeholder to bypass any error telling you to specify a body for mutations that do not need a body object
   * @param {Headers} headers optional
   */
  public async PATCH<T>(
    url: string = "",
    body: object,
    headers?: Headers
  ): Promise<ApiReturnType<T>> {
    return this.requestWithBody(url, body, "PATCH", headers);
  }

  /**
   * 🪖 👷🏾‍♂️ handles all DELETE queries to specified url
   *
   * @param {string} url optional, but required if no base url was provided
   * @param {Headers} headers optional
   */
  public async DELETE<T>(
    url: string = "",
    headers?: Headers
  ): Promise<ApiReturnType<T>> {
    return this.requestWithoutBody(url, "DELETE", headers);
  }
}
