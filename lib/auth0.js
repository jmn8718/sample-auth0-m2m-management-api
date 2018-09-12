const request = require('request-promise');

const getToken = function() {
  console.log('get token');
  let body = {
    audience: process.env.AUTH0_AUDIENCE,
    grant_type: 'client_credentials',
    client_id: process.env.AUTH0_CLIENT_ID,
    client_secret: process.env.AUTH0_CLIENT_SECRET
  };
  return requestToAuth0('/oauth/token', 'POST', { body });
};

const requestToAuth0 = function(url = '', method = '', options = {}) {
  const { headers = {}, body = {}, ...rest } = options;
  let requestOptions = {
    method,
    url: `https://${process.env.AUTH0_DOMAIN}${url}`,
    headers: {
      'cache-control': 'no-cache',
      'content-type': 'application/json',
      ...headers
    },
    body,
    ...rest,
    json: true
  };
  console.log('request', requestOptions);
  return request(requestOptions).catch((err) => {
    console.error(url, err);
    throw err;
  });
};

class Auth0 {
  constructor() {
    this.token = undefined;
    this.tokenType = undefined;
    this.refreshToken = this.handleTokenData.bind(this);
    this.requestToken = this.requestToken.bind(this);

    this.requestToken();
  }

  handleTokenData(tokenData) {
    const { access_token, token_type, expires_in } = tokenData;
    let requestTokenIn = expires_in * 1000 - 10000;
    this.token = access_token;
    this.tokenType = token_type;
    this.tokenTimeout = setTimeout(() => {
      this.requestToken();
    }, requestTokenIn);
  }

  async requestToken() {
    let tokenData = await getToken();
    this.handleTokenData(tokenData);
  }

  async authorizedRequestToAuth0(url, method = 'GET', options = {}) {
    const { headers = {}, body = {}, ...rest } = options;
    return requestToAuth0(url, method, {
      headers: { ...headers, Authorization: `${this.tokenType} ${this.token}` },
      body,
      ...rest
    });
  }
}

const auth0 = new Auth0();

module.exports = auth0;
