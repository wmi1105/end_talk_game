const axios = require("axios");
require("dotenv").config();
const https = require("https");

const apiConfig = {
  url: "https://opendict.korean.go.kr/api/search",
  method: "GET",
  httpsAgent: new https.Agent({
    rejectUnauthorized: false, //허가되지 않은 인증을 reject하지 않겠다!
  }),
  params: {
    key: process.env.OPEN_DICT_KEY,
    req_type: "json",
    target: 1,
    part: "word",
    method: "exact",
    type1: ["word"],
    type2: ["native", "chinese"],
    type3: ["general"],
    pos: [1],
  },
};

const dictionary = async (str) => {
  let response = [];
  await axios({
    ...apiConfig,
    params: {
      ...apiConfig.params,
      q: str,
    },
  })
    .then((res) => {
      response = res.data.channel.item;
    })
    .catch((err) => {});

  return response;
};

module.exports = {
  dictionary,
};
