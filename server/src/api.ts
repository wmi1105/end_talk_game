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
    // type2: ["native", "chinese"],
    type3: ["general"],
    pos: [1],
  },
};

const dictionary = async (str: string) => {
  let response: any[] = [];
  await axios({
    ...apiConfig,
    params: {
      ...apiConfig.params,
      q: str,
    },
  })
    .then((res: any) => {
      // console.log("=========== response then ", res.data.channel);
      response = res.data.channel.item ? res.data.channel.item : [];
    })
    .catch((err: any) => {
      // console.log("=========== response err ", err);
    });

  return response;
};

let lastWord = "";

const wordVerification = async (str: string): Promise<boolean> => {
  if (str.length < 2) {
    /* fail : 빈값이거나 한글자 단어 */
    return false;
  }
  if (str.split(" ").length > 1) {
    /* fail : 2음절 이상의 단어*/
    return false;
  }

  const dic = await dictionary(str);
  // console.log("=========== response res ", dic);
  const filter = dic.filter((item) => item.word === str);

  console.log("verification --------------> ", str, filter);
  const check = !!(filter.length > 0);

  if (check) {
    const strLength = str.length;
    lastWord = str[strLength - 1];

    console.log("===========> last word", lastWord);
  }

  return check;
};

module.exports = {
  dictionary,
  wordVerification,
};
