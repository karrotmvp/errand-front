const envs = {
  API_BASE_URL: process.env.REACT_APP_API_BASE_URL || "",
  MINI_PRESET_URL: process.env.REACT_APP_MINI_PRESET_URL || "",
  APP_ID: process.env.REACT_APP_APP_ID || "",
  MIXPANEL_TOKEN: process.env.REACT_APP_MIXPANEL_TOKEN || "",
};

export default envs;
