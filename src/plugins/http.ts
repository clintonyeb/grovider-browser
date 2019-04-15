import router from "@/router";
import store from "@/store";

class Http {
  getURL(path: string) {
    return `${process.env.VUE_APP_RAILS_URL}/${path}`;
  }

  get(link: string, token:string) {
    const self = this;
    const url = this.getURL(link);
    return new Promise((resolve, reject) => {
      const http = new XMLHttpRequest();
      http.open("GET", url, true);
      http.setRequestHeader("content-type", "application/json");
      http.setRequestHeader("accept", "application/json");
      http.setRequestHeader('Access-Control-Allow-Origin', '*')
      if (token) http.setRequestHeader("Authorization", token);
      http.onreadystatechange = () =>
        self._handleResponse(http, resolve, reject);
      http.send();
    });
  }

  getRaw(link: string, token:string) {
    const self = this;
    const url = this.getURL(link);
    return new Promise((resolve, reject) => {
      const http = new XMLHttpRequest();
      http.open("GET", url, true);
      http.setRequestHeader("content-type", "application/json");
      // http.setRequestHeader("accept", "application/json");
      http.setRequestHeader('Access-Control-Allow-Origin', '*')
      if (token) http.setRequestHeader("Authorization", token);
      http.onreadystatechange = () =>
        self._handleResponseRaw(http, resolve, reject);
      http.send();
    });
  }

  put(link: string, data: object, token?: string) {
    const self = this;
    const url = this.getURL(link);
    return new Promise((resolve, reject) => {
      const http = new XMLHttpRequest();
      http.open("PUT", url, true);
      http.setRequestHeader("content-type", "application/json");
      http.setRequestHeader("accept", "application/json");
      http.setRequestHeader('Access-Control-Allow-Origin', '*')
      if (token) {
        http.setRequestHeader("Authorization", token);
      }
      http.onreadystatechange = () =>
        self._handleResponse(http, resolve, reject);
      http.send(JSON.stringify(data));
    });
  }

  post(link: string, data: object, token?: string) {
    const self = this;
    const url = this.getURL(link);
    return new Promise((resolve, reject) => {
      const http = new XMLHttpRequest();
      http.open("POST", url, true);
      http.setRequestHeader("content-type", "application/json");
      http.setRequestHeader("accept", "application/json");
      http.setRequestHeader('Access-Control-Allow-Origin', '*')
      if (token) http.setRequestHeader("Authorization", token);
      http.onreadystatechange = () =>
        self._handleResponse(http, resolve, reject);
      http.send(JSON.stringify(data));
    });
  }

  create(link: string, data: object, token: string) {
    const self = this;
    const url = this.getURL(link);
    return new Promise((resolve, reject) => {
      const http = new XMLHttpRequest();
      http.open("POST", url, true);
      http.setRequestHeader("content-type", "application/json");
      http.setRequestHeader("accept", "application/json");
      http.setRequestHeader('Access-Control-Allow-Origin', '*')
      http.setRequestHeader("Authorization", token);
      http.onreadystatechange = () =>
        self._handleResponse(http, resolve, reject);
      http.send(JSON.stringify(data));
    });
  }

  delete(link: string, token: string) {
    const self = this;
    const url = this.getURL(link);
    return new Promise((resolve, reject) => {
      const http = new XMLHttpRequest();
      http.open("DELETE", url, true);
      http.setRequestHeader("content-type", "application/json");
      http.setRequestHeader("accept", "application/json");
      http.setRequestHeader('Access-Control-Allow-Origin', '*')
      http.setRequestHeader("Authorization", token);

      http.onreadystatechange = () =>
        self._handleResponse(http, resolve, reject);
      http.send();
    });
  }

  login(link: string, data: object) {
    // const self = this
    const url = this.getURL(link);
    return new Promise((resolve, reject) => {
      const http = new XMLHttpRequest();
      http.open("POST", url, true);
      http.setRequestHeader("content-type", "application/json");
      http.setRequestHeader("accept", "application/json");
      http.setRequestHeader('Access-Control-Allow-Origin', '*')
      http.onreadystatechange = () => {
        if (http.readyState === 4) {
          if (http.status === 200) {
            if (http.responseText) {
              return resolve(JSON.parse(http.responseText));
            } else {
              return reject(http);
            }
          } else {
            return reject(http);
          }
        }
      };
      http.send(JSON.stringify(data));
    });
  }

  // uploadFile(file: File) {
  //   return new Promise(async (resolve, reject) => {
  //     try {
  //       const data = await this.getSignedURL(file.name, file.type);

  //       const request = new XMLHttpRequest();
  //       request.open("PUT", data.signed_url, true);
  //       request.setRequestHeader("Content-Type", file.type);
  //       request.setRequestHeader("Access-Control-Allow-Origin", "*");
  //       request.setRequestHeader("Accept", "application/json");

  //       request.onload = () => {
  //         if (request.status >= 200 && request.status < 300) {
  //           resolve(this.getFileURL(data.file_name));
  //         } else {
  //           reject(new Error("Error uploading file"));
  //         }
  //       };

  //       request.send(file);
  //     } catch (error) {
  //       reject(error);
  //     }
  //   });
  // }

  // getSignedURL(fileName: string, contentType: string) {
  //   return new Promise(async (resolve, reject) => {
  //     const path = "sign_url_for_upload";

  //     try {
  //       const response = await this.post(
  //         path,
  //         {
  //           file_name: fileName,
  //           content_type: contentType
  //         },
  //         store.state.user.authToken
  //       );
  //       resolve(response);
  //     } catch (err) {
  //       reject(err);
  //     }
  //   });
  // }

  // getFileURL(name: string) {
  //   return `https://s3.ap-south-1.amazonaws.com/murch-app/${name}`;
  // }

  _handleResponse(http: any, resolve: Function, reject: Function) {
    const self = this;
    if (http.readyState === 4) {
      if (self._handleHTTPError(http)) {
        if (http.responseText) {
          return resolve(JSON.parse(http.responseText));
        } else {
          return resolve(true);
        }
      } else {
        return reject(http);
      }
    }
  }

  _handleResponseRaw(http: any, resolve: Function, reject: Function) {
    const self = this;
    if (http.readyState === 4) {
      if (self._handleHTTPError(http)) {
        if (http.responseText) {
          return resolve(http.responseText);
        } else {
          return resolve(true);
        }
      } else {
        return reject(http);
      }
    }
  }

  _handleHTTPError(http: any) {
    // clear previous errors
    // if (store.state.layout.alert.state) store.commit("CLEAR_ALERT");

    if (http.status >= 200 && http.status <= 300) return true;
    else if (http.status === 401) {
      store.commit("SET_LOGIN_DATA", {
        message: "You have been logged out. Please login to continue.",
        // type: MESSAGE_TYPES.error,
        route: router.currentRoute.name
      });
      return router.replace({
        name: "login"
      });
    }

    // scroll to top here
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;

    return false;
  }

  getErrorMessage(res: any) {
    const defaultMess = "There was an error processing your request.";
    if (!res) return defaultMess;
    return res.response ? JSON.parse(res.response).message : defaultMess;
  }
}

export default {
  install(Vue: any, options: object) {
    Vue.prototype.$http = new Http();
  }
};
