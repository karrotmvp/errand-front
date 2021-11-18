import envs from "@config/dotenv";
import mixpanel from "mixpanel-browser";

mixpanel.init(envs.MIXPANEL_TOKEN);

// let env_check = process.env.NODE_ENV === "production";

interface Dict {
  [key: string]: any;
}

const env_check = true;

const MixPanel = {
  identify: (id: string) => {
    mixpanel.identify(id);
  },
  alias: (id: string) => {
    if (env_check) mixpanel.alias(id);
  },
  track: (name: string, props?: Dict) => {
    if (env_check) mixpanel.track(name, props);
  },
  people: {
    set: (props: Dict) => {
      if (env_check) mixpanel.people.set(props);
    },
  },
};

export default MixPanel;
